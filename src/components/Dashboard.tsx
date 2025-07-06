import React from "react";
import ReactECharts from "echarts-for-react";
import mockData from "../assets/mock-data-json.json";
import "./dashboard-helper.css";
import { Link } from "react-router-dom";
import MetricCard from "./MetricCard";
import StockTable from "./StockTable";

/**
 * Dashboard displays an overview of the market, including key metrics, sector performance, and top stocks.
 */
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
  {
    title: "Symbol",
    dataIndex: "id",
    key: "id",
    render: (id: string) => <Link to={`/stock/${id}`}>{id}</Link>,
  },
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
      <MetricCard
        title="Total Market Cap"
        value={totalMarketCap}
        prefix="$"
        precision={0}
        style={{ fontSize: 22 }}
      />
      <MetricCard title="Avg. P/E Ratio" value={avgPE} />
      <MetricCard title="Avg. Dividend Yield (%)" value={avgDividendYield} />
    </div>
    <div className="dashboard-sector-chart">
      <ReactECharts option={sectorOption} className="dashboard-sector-echart" />
    </div>
    <div className="dashboard-tables-row">
      <div className="dashboard-table">
        <div className="dashboard-table-title">Top Gainers</div>
        <StockTable
          columns={columns}
          data={topGainers}
          pagination={false}
          size="small"
        />
      </div>
      <div className="dashboard-table">
        <div className="dashboard-table-title">Top Losers</div>
        <StockTable
          columns={columns}
          data={topLosers}
          pagination={false}
          size="small"
        />
      </div>
      <div className="dashboard-table">
        <div className="dashboard-table-title">Most Active</div>
        <StockTable
          columns={columns}
          data={mostActive}
          pagination={false}
          size="small"
        />
      </div>
    </div>
  </div>
);

export default Dashboard;
