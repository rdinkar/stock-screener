import React from "react";
import ReactECharts from "echarts-for-react";

/**
 * DashboardSectorChart renders the sector performance bar chart using ECharts.
 */
interface DashboardSectorChartProps {
  sectorOption: object;
}

const DashboardSectorChart: React.FC<DashboardSectorChartProps> = ({
  sectorOption,
}) => (
  <div className="dashboard-sector-chart">
    <ReactECharts option={sectorOption} className="dashboard-sector-echart" />
  </div>
);

export default DashboardSectorChart;
