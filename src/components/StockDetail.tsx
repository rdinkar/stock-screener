import React, { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, Statistic, Table, Tag, Empty } from "antd";
import ReactECharts from "echarts-for-react";
import mockData from "../assets/mock-data-json.json";
import "./dashboard-helper.css";

const { TabPane } = Tabs;

const timePeriods = [
  { key: "1D", label: "1D", dataKey: "daily", points: 1 },
  { key: "1W", label: "1W", dataKey: "daily", points: 5 },
  { key: "1M", label: "1M", dataKey: "weekly", points: 4 },
  { key: "1Y", label: "1Y", dataKey: "monthly", points: 12 },
  { key: "5Y", label: "5Y", dataKey: "yearly", points: 5 },
];

type HistoricalData = {
  daily: {
    date: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
  }[];
  weekly: { date: string; close: number }[];
  monthly: { date: string; close: number }[];
  yearly: { date: string; close: number }[];
};
type Financials = {
  quarterly: {
    date: string;
    revenue: number;
    netIncome: number;
    eps: number;
    operatingCashFlow: number;
    freeCashFlow: number;
  }[];
  annual: {
    year: number;
    revenue: number;
    netIncome: number;
    eps: number;
    operatingCashFlow: number;
    freeCashFlow: number;
    totalAssets: number;
    totalLiabilities: number;
    totalEquity: number;
    debtToEquity: number;
    returnOnEquity: number;
    returnOnAssets: number;
  }[];
};

const StockDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const stock = mockData.stocks.find((s) => s.id === id);
  const historical: HistoricalData | undefined =
    id && Object.prototype.hasOwnProperty.call(mockData.historical_data, id)
      ? (mockData.historical_data as Record<string, HistoricalData>)[id]
      : undefined;
  const financials: Financials | undefined =
    id && Object.prototype.hasOwnProperty.call(mockData.financials, id)
      ? (mockData.financials as Record<string, Financials>)[id]
      : undefined;

  const [period, setPeriod] = useState("1M");

  const priceData = useMemo(() => {
    if (!historical) return [];
    const periodObj = timePeriods.find((p) => p.key === period);
    if (!periodObj) return [];
    if (periodObj.dataKey === "daily") {
      return (historical.daily as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "weekly") {
      return (historical.weekly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "monthly") {
      return (historical.monthly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "yearly") {
      return (historical.yearly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    }
    return [];
  }, [historical, period]);

  if (!stock) return <Empty description="Stock not found" />;

  // Price chart option
  const priceOption = {
    title: { text: `${stock.name} Price`, left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: priceData.map((d) => d.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: priceData.map((d) => d.close),
        type: "line",
        smooth: true,
        areaStyle: {},
        color: "#1890ff",
      },
    ],
  };

  // Key ratios (mocked for now)
  const ratios = [
    { label: "P/E", value: stock.pe },
    { label: "P/B", value: (stock.pe / 2).toFixed(2) }, // mock
    {
      label: "ROCE",
      value: ((stock.eps / stock.currentPrice) * 100).toFixed(2),
    }, // mock
    { label: "Dividend Yield", value: stock.dividendYield },
    { label: "Beta", value: stock.beta },
  ];

  // Financial trends
  const quarterly = financials?.quarterly || [];
  const annual = financials?.annual || [];

  const trendOption = (
    data: typeof quarterly | typeof annual,
    type: "quarterly" | "annual"
  ) => ({
    title: {
      text: `${type === "quarterly" ? "Quarterly" : "Annual"} Financials`,
      left: "center",
    },
    tooltip: { trigger: "axis" },
    legend: { data: ["Revenue", "Net Income", "EPS"], top: 24 },
    xAxis: {
      type: "category",
      data:
        type === "quarterly"
          ? (data as Financials["quarterly"]).map((d) => d.date)
          : (data as Financials["annual"]).map((d) => d.year),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Revenue",
        type: "bar",
        data: data.map((d) => d.revenue),
        color: "#1890ff",
      },
      {
        name: "Net Income",
        type: "bar",
        data: data.map((d) => d.netIncome),
        color: "#52c41a",
      },
      {
        name: "EPS",
        type: "line",
        data: data.map((d) => d.eps),
        color: "#faad14",
      },
    ],
  });

  // Company info
  const infoRows = [
    { label: "Name", value: stock.name },
    { label: "Sector", value: stock.sector },
    { label: "Industry", value: stock.industry },
    { label: "Market Cap", value: `$${stock.marketCap.toLocaleString()}` },
    { label: "Dividend", value: stock.dividend },
    { label: "52W High", value: stock.yearHigh },
    { label: "52W Low", value: stock.yearLow },
  ];

  return (
    <div className="stock-detail-container">
      <div className="stock-detail-header">
        <div className="stock-detail-title">
          {stock.name} <Tag color="blue">{stock.id}</Tag>
        </div>
        <div className="stock-detail-price">
          <Statistic
            title="Current Price"
            value={stock.currentPrice}
            prefix="$"
            precision={2}
          />
          <span className={stock.change >= 0 ? "stock-up" : "stock-down"}>
            {stock.change >= 0 ? "+" : ""}
            {stock.change} ({stock.changePercent}%)
          </span>
        </div>
      </div>
      <div className="stock-detail-main">
        <div className="stock-detail-chart-section">
          <Tabs
            activeKey={period}
            onChange={setPeriod}
            className="stock-detail-tabs"
          >
            {timePeriods.map((p) => (
              <TabPane tab={p.label} key={p.key} />
            ))}
          </Tabs>
          <ReactECharts option={priceOption} style={{ height: 280 }} />
        </div>
        <div className="stock-detail-ratios">
          <div className="stock-detail-ratios-title">Key Ratios</div>
          <div className="stock-detail-ratios-list">
            {ratios.map((r) => (
              <div className="stock-detail-ratio" key={r.label}>
                <Statistic title={r.label} value={r.value} />
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="stock-detail-financials">
        <div className="stock-detail-financials-chart">
          <Tabs defaultActiveKey="quarterly" className="stock-detail-tabs">
            <TabPane tab="Quarterly" key="quarterly">
              <ReactECharts
                option={trendOption(quarterly, "quarterly")}
                style={{ height: 260 }}
              />
            </TabPane>
            <TabPane tab="Annual" key="annual">
              <ReactECharts
                option={trendOption(annual, "annual")}
                style={{ height: 260 }}
              />
            </TabPane>
          </Tabs>
        </div>
        <div className="stock-detail-info">
          <div className="stock-detail-info-title">Company Info</div>
          <Table
            columns={[
              { title: "Field", dataIndex: "label", key: "label" },
              { title: "Value", dataIndex: "value", key: "value" },
            ]}
            dataSource={infoRows}
            size="small"
            pagination={false}
            rowKey="label"
            showHeader={false}
            className="stock-detail-info-table"
          />
        </div>
      </div>
    </div>
  );
};

export default StockDetail;
