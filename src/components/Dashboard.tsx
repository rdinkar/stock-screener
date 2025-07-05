import React from "react";
import { Table, Statistic } from "antd";
import ReactECharts from "echarts-for-react";
import mockData from "../assets/mock-data-json.json";
import "./dashboard-helper.css";

const stocks = mockData.stocks;
const sectors = mockData.sectors;

// Key market metrics
const totalMarketCap = stocks.reduce((sum, s) => sum + s.marketCap, 0);
const avgPE = (
  stocks.reduce((sum, s) => sum + s.pe, 0) / stocks.length
).toFixed(2);
const avgDividendYield = (
  stocks.reduce((sum, s) => sum + s.dividendYield, 0) / stocks.length
).toFixed(2);

// Top gainers, losers, most active
const sortedByChange = [...stocks].sort(
  (a, b) => b.changePercent - a.changePercent
);
const topGainers = sortedByChange.slice(0, 5);
const topLosers = [...stocks]
  .sort((a, b) => a.changePercent - b.changePercent)
  .slice(0, 5);
const mostActive = [...stocks].sort((a, b) => b.volume - a.volume).slice(0, 5);

// Sector performance for ECharts
const sectorNames = sectors.map((s) => s.name);
const sectorChange = sectors.map((s) => s.changePercent);

const sectorOption = {
  title: { text: "Sector Performance (%)", left: "center" },
  tooltip: {},
  xAxis: { type: "category", data: sectorNames },
  yAxis: { type: "value", axisLabel: { formatter: "{value}%" } },
  series: [
    {
      data: sectorChange,
      type: "bar",
      itemStyle: {
        color: (params: { value: number }) =>
          params.value >= 0 ? "#52c41a" : "#f5222d",
      },
    },
  ],
};

type Stock = (typeof stocks)[number];
const columns = [
  { title: "Symbol", dataIndex: "id", key: "id" },
  { title: "Name", dataIndex: "name", key: "name" },
  {
    title: "Price",
    dataIndex: "currentPrice",
    key: "currentPrice",
    render: (v: number) => `$${v}`,
  },
  {
    title: "Change",
    dataIndex: "change",
    key: "change",
    render: (v: number, r: Stock) => `${v} (${r.changePercent}%)`,
  },
  { title: "Volume", dataIndex: "volume", key: "volume" },
];

const Dashboard: React.FC = () => (
  <div className="dashboard-container">
    <div className="dashboard-metrics-row">
      <div className="dashboard-metric">
        <Statistic
          title="Total Market Cap"
          value={totalMarketCap}
          precision={0}
          prefix="$"
          valueStyle={{ fontSize: 22 }}
        />
      </div>
      <div className="dashboard-metric">
        <Statistic title="Avg. P/E Ratio" value={avgPE} />
      </div>
      <div className="dashboard-metric">
        <Statistic title="Avg. Dividend Yield (%)" value={avgDividendYield} />
      </div>
    </div>
    <div className="dashboard-sector-chart">
      <ReactECharts option={sectorOption} style={{ height: 320 }} />
    </div>
    <div className="dashboard-tables-row">
      <div className="dashboard-table">
        <div className="dashboard-table-title">Top Gainers</div>
        <Table
          columns={columns}
          dataSource={topGainers}
          size="small"
          pagination={false}
          rowKey="id"
        />
      </div>
      <div className="dashboard-table">
        <div className="dashboard-table-title">Top Losers</div>
        <Table
          columns={columns}
          dataSource={topLosers}
          size="small"
          pagination={false}
          rowKey="id"
        />
      </div>
      <div className="dashboard-table">
        <div className="dashboard-table-title">Most Active</div>
        <Table
          columns={columns}
          dataSource={mostActive}
          size="small"
          pagination={false}
          rowKey="id"
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
