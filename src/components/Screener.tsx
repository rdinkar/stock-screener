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
  filters: Filter[]
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

const defaultFilters = [{ metric: "", operator: ">=", value: undefined }];

type Filter = { metric: string; operator: string; value: number | undefined };
type SavedConfig = { name: string; filters: Filter[] };

const Screener: React.FC = () => {
  const [filters, setFilters] = useState<Filter[]>(defaultFilters);

  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
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
    const preset = presets.find((p) => p.id === id);
    if (preset) {
      setFilters(
        preset.criteria.map((c) => ({
          metric: c.metric,
          operator: c.operator,
          value: c.value,
        }))
      );
    }
  };

  // Save config
  const handleSave = () => {
    setSaveModalName("");
    setSaveModalOpen(true);
  };

  const handleSaveModalOk = () => {
    if (!saveModalName.trim()) return message.error("Name required");
    setSavedConfigs([
      ...savedConfigs,
      { name: saveModalName, filters: JSON.parse(JSON.stringify(filters)) },
    ]);
    setSaveModalOpen(false);
    message.success("Filter saved!");
  };

  // Load config
  const handleLoad = (name: string | undefined) => {
    setSelectedSavedConfig(name);
    if (!name) return;
    const config = savedConfigs.find((c) => c.name === name);
    if (config) setFilters(JSON.parse(JSON.stringify(config.filters)));
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
    key: keyof Filter,
    value: string | number | undefined
  ) => {
    setFilters((f) =>
      f.map((filt, i) => (i === idx ? { ...filt, [key]: value } : filt))
    );
  };
  const addFilter = () =>
    setFilters((f) => [...f, { metric: "", operator: ">=", value: undefined }]);
  const removeFilter = (idx: number) =>
    setFilters((f) => (f.length > 1 ? f.filter((_, i) => i !== idx) : f));

  return (
    <div className="screener-container">
      <div className="screener-filters">
        <div className="screener-presets-row">
          <span className="screener-presets-label">Presets:</span>
          <Space size="small">
            {presets.map((p) => (
              <Button
                key={p.id}
                type={"default"}
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
            value={
              selectedSavedConfig === null ? undefined : selectedSavedConfig
            }
            onChange={(v) => handleLoad(v === null ? undefined : v)}
            allowClear
            size="small"
          >
            {savedConfigs.map((c) => (
              <Select.Option key={c.name} value={c.name}>
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
              // @ts-expect-error - TODO: fix this
              onChange={(v) => updateFilter(idx, "value", v)}
              placeholder="Value"
              size="small"
            />
            <Button
              danger
              onClick={() => removeFilter(idx)}
              disabled={filters.length === 1}
              size="small"
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="dashed"
          onClick={addFilter}
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
