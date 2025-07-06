import React from "react";
import mockData from "../assets/mock-data-json.json";
import { Link } from "react-router-dom";
import DashboardMetricsRow from "../components/DashboardMetricsRow";
import DashboardSectorChart from "../components/DashboardSectorChart";
import DashboardTablesRow from "../components/DashboardTablesRow";

const stocks = mockData.stocks;
const sectors = mockData.sectors;

const colors = {
  positive: "#52c41a",
  negative: "#f5222d",
};

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
const topLosers = sortedByChange.slice(-5).reverse();
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
          params.value >= 0 ? colors.positive : colors.negative,
      },
    },
  ],
};

export type Stock = (typeof stocks)[number];
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
    render: (v: number, r: Stock) => {
      const color = v >= 0 ? colors.positive : colors.negative;
      return (
        <>
          {v} <span style={{ color }}>({r.changePercent}%)</span>
        </>
      );
    },
  },
  { title: "Volume", dataIndex: "volume", key: "volume" },
];

const Dashboard: React.FC = () => (
  <div className="bg-gray p-xl flex-1 h-100 over-auto">
    <DashboardMetricsRow
      totalMarketCap={totalMarketCap}
      avgPE={avgPE}
      avgDividendYield={avgDividendYield}
    />
    <DashboardSectorChart sectorOption={sectorOption} />
    <DashboardTablesRow
      columns={columns}
      topGainers={topGainers}
      topLosers={topLosers}
      mostActive={mostActive}
    />
  </div>
);

export default Dashboard;
