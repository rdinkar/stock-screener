import React from "react";
import { Tabs } from "antd";
import ReactECharts from "echarts-for-react";

/**
 * StockPriceChart displays the time period tabs and price chart.
 */
interface StockPriceChartProps {
  period: string;
  setPeriod: (p: string) => void;
  timePeriods: { key: string; label: string }[];
  priceOption: object;
}

const { TabPane } = Tabs;

const StockPriceChart: React.FC<StockPriceChartProps> = ({
  period,
  setPeriod,
  timePeriods,
  priceOption,
}) => (
  <div className="stock-detail-chart-section">
    <Tabs activeKey={period} onChange={setPeriod} className="stock-detail-tabs">
      {timePeriods.map((p) => (
        <TabPane tab={p.label} key={p.key} />
      ))}
    </Tabs>
    <ReactECharts option={priceOption} style={{ height: 280 }} />
  </div>
);

export default StockPriceChart;
