import React from "react";
import MetricCard from "./MetricCard";

/**
 * DashboardMetricsRow displays the key market metrics as MetricCards.
 */
interface DashboardMetricsRowProps {
  totalMarketCap: number;
  avgPE: string;
  avgDividendYield: string;
}

const DashboardMetricsRow: React.FC<DashboardMetricsRowProps> = ({
  totalMarketCap,
  avgPE,
  avgDividendYield,
}) => (
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
);

export default DashboardMetricsRow;
