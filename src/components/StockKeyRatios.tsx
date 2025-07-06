import React from "react";
import MetricCard from "./MetricCard";

/**
 * StockKeyRatios displays key financial ratios as MetricCards.
 */
interface StockKeyRatiosProps {
  ratios: { label: string; value: number | string }[];
}

const StockKeyRatios: React.FC<StockKeyRatiosProps> = ({ ratios }) => (
  <div className="flex-1 bg-white br-md p-lg flex-col align-stretch">
    <h3 className="m-b-md">Key Ratios</h3>
    <div className="grid-2-col gap-md">
      {ratios.map((r) => (
        <MetricCard key={r.label} title={r.label} value={r.value} />
      ))}
    </div>
  </div>
);

export default StockKeyRatios;
