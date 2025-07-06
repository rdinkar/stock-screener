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
  <div className="flex gap-xl m-b-xl">
    <MetricCard
      title="Total Market Cap"
      value={totalMarketCap}
      prefix="$"
      precision={0}
      className="flex-1"
    />
    <MetricCard title="Avg. P/E Ratio" value={avgPE} className="flex-1" />
    <MetricCard
      title="Avg. Dividend Yield (%)"
      value={avgDividendYield}
      className="flex-1"
    />
  </div>
);

export default DashboardMetricsRow;
