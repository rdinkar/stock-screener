import React, { useMemo, useState } from "react";
import {
  Button,
  Select,
  InputNumber,
  message,
  Table,
  Space,
  Modal,
  Input,
} from "antd";
import { DownloadOutlined, SaveOutlined } from "@ant-design/icons";
import mockData from "../assets/mock-data-json.json";
import "./dashboard-helper.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  addFilter,
  updateFilter as updateFilterAction,
  removeFilter as removeFilterAction,
  saveConfig,
  loadConfig,
  loadPreset,
  setSelectedPreset,
} from "../features/screenerSlice";

const metrics = mockData.screener_presets.availableMetrics;
const presets = mockData.screener_presets.presets;
const stocks = mockData.stocks;

const operators = [
  { value: ">=", label: ">=" },
  { value: "<=", label: "<=" },
  { value: ">", label: ">" },
  { value: "<", label: "<" },
  { value: "=", label: "=" },
];

function applyFilters(
  stocks: typeof mockData.stocks,
  filters: { metric: string; operator: string; value: number | undefined }[]
): typeof mockData.stocks {
  return stocks.filter((stock) =>
    filters.every((f) => {
      if (!f.metric || !f.operator || f.value === undefined || f.value === null)
        return true;
      const stockValue = Number(stock[f.metric as keyof typeof stock]);
      const filterValue = Number(f.value);
      switch (f.operator) {
        case ">=":
          return stockValue >= filterValue;
        case "<=":
          return stockValue <= filterValue;
        case ">":
          return stockValue > filterValue;
        case "<":
          return stockValue < filterValue;
        case "=":
          return stockValue === filterValue;
        default:
          return true;
      }
    })
  );
}

const Screener: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.screener.filters);
  const savedConfigs = useSelector(
    (state: RootState) => state.screener.savedConfigs
  );
  const selectedPreset = useSelector(
    (state: RootState) => state.screener.selectedPreset
  );

  const [selectedSavedConfig, setSelectedSavedConfig] = useState<
    string | undefined
  >(undefined);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveModalName, setSaveModalName] = useState("");

  const navigate = useNavigate();

  // Columns for table
  const columns = [
    {
      title: "Symbol",
      dataIndex: "id",
      key: "id",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.id.localeCompare(b.id),
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (v: number) => `$${v}`,
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.currentPrice - b.currentPrice,
    },
    {
      title: "Change %",
      dataIndex: "changePercent",
      key: "changePercent",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.changePercent - b.changePercent,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (v: number) => `$${v.toLocaleString()}`,
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.marketCap - b.marketCap,
    },
    {
      title: "P/E",
      dataIndex: "pe",
      key: "pe",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.pe - b.pe,
    },
    {
      title: "EPS",
      dataIndex: "eps",
      key: "eps",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.eps - b.eps,
    },
    {
      title: "Dividend Yield",
      dataIndex: "dividendYield",
      key: "dividendYield",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.dividendYield - b.dividendYield,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a: (typeof stocks)[number], b: (typeof stocks)[number]) =>
        a.volume - b.volume,
    },
  ];

  // Apply filters
  const filteredData = useMemo(() => applyFilters(stocks, filters), [filters]);

  // Preset load
  const handlePreset = (id: number | undefined) => {
    if (id !== undefined) {
      dispatch(loadPreset(id));
      dispatch(setSelectedPreset(id));
      setSelectedSavedConfig(undefined);
    }
  };

  // Save config
  const handleSave = () => {
    setSaveModalName("");
    setSaveModalOpen(true);
  };

  const handleSaveModalOk = () => {
    if (!saveModalName.trim()) return message.error("Name required");
    dispatch(saveConfig(saveModalName));
    setSaveModalOpen(false);
    message.success("Filter saved!");
  };

  // Load config
  const handleLoad = (name: string | number | undefined) => {
    if (typeof name === "string") {
      setSelectedSavedConfig(name);
      dispatch(loadConfig(name));
      dispatch(setSelectedPreset(undefined));
    } else {
      setSelectedSavedConfig(undefined);
    }
  };

  // Export CSV
  const handleExport = () => {
    const csv = [
      columns.map((c) => c.title).join(","),
      ...filteredData.map((row) =>
        columns.map((c) => row[c.dataIndex as keyof typeof row]).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screener-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  // Filter UI
  const updateFilter = (
    idx: number,
    key: "metric" | "operator" | "value",
    value: string | number | undefined
  ) => {
    dispatch(updateFilterAction({ idx, key, value }));
  };
  const addFilterHandler = () => dispatch(addFilter());
  const removeFilterHandler = (idx: number) =>
    dispatch(removeFilterAction(idx));

  return (
    <div className="screener-container">
      <div className="screener-filters">
        <div className="screener-presets-row">
          <span className="screener-presets-label">Presets:</span>
          <Space size="small">
            {presets.map((p) => (
              <Button
                key={p.id}
                type={selectedPreset === p.id ? "primary" : "default"}
                size="small"
                onClick={() => handlePreset(p.id)}
              >
                {p.name}
              </Button>
            ))}
          </Space>
          <div style={{ flex: 1 }} />
          <Select
            style={{ width: 180, marginRight: 12 }}
            placeholder="Load Saved"
            value={selectedSavedConfig}
            onChange={handleLoad}
            allowClear
            size="small"
          >
            {savedConfigs.map((c) => (
              <Select.Option key={c.name} value={String(c.name)}>
                {c.name}
              </Select.Option>
            ))}
          </Select>
          <Button icon={<SaveOutlined />} onClick={handleSave} size="small">
            Save
          </Button>
        </div>
        {filters.map((f, idx) => (
          <div className="screener-filter-row" key={idx}>
            <Select
              style={{ width: 160, marginRight: 8 }}
              placeholder="Metric"
              value={f.metric}
              onChange={(v) => updateFilter(idx, "metric", v)}
              size="small"
            >
              {metrics.map((m) => (
                <Select.Option key={m.id} value={m.id}>
                  {m.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              style={{ width: 80, marginRight: 8 }}
              value={f.operator}
              onChange={(v) => updateFilter(idx, "operator", v)}
              size="small"
            >
              {operators.map((o) => (
                <Select.Option key={o.value} value={o.value}>
                  {o.label}
                </Select.Option>
              ))}
            </Select>
            <InputNumber
              style={{ width: 120, marginRight: 8 }}
              value={f.value}
              onChange={(v) => updateFilter(idx, "value", v)}
              placeholder="Value"
              size="small"
            />
            <Button
              danger
              onClick={() => removeFilterHandler(idx)}
              disabled={filters.length === 1}
              size="small"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="dashed"
          onClick={addFilterHandler}
          style={{ marginTop: 8 }}
          size="small"
        >
          Add Filter
        </Button>
      </div>
      <div className="screener-table">
        <div className="screener-table-header-row">
          <span className="screener-table-title">Results</span>
          <Button
            icon={<DownloadOutlined />}
            onClick={handleExport}
            size="small"
          >
            Export
          </Button>
        </div>
        <Table
          columns={columns}
          dataSource={filteredData}
          rowKey="id"
          size="middle"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => navigate(`/stock/${record.id}`),
            style: { cursor: "pointer" },
          })}
        />
        <Modal
          open={saveModalOpen}
          title="Save Filter Preset"
          onOk={handleSaveModalOk}
          onCancel={() => setSaveModalOpen(false)}
          okText="Save"
        >
          <Input
            value={saveModalName}
            onChange={(e) => setSaveModalName(e.target.value)}
            placeholder="Preset name"
          />
        </Modal>
      </div>
    </div>
  );
};

export default Screener;
