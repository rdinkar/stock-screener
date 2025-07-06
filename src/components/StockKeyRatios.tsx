import React from "react";
import MetricCard from "./MetricCard";

/**
 * StockKeyRatios displays key financial ratios as MetricCards.
 */
interface StockKeyRatiosProps {
  ratios: { label: string; value: number | string }[];
}

const StockKeyRatios: React.FC<StockKeyRatiosProps> = ({ ratios }) => (
  <div className="stock-detail-ratios">
    <div className="stock-detail-ratios-title">Key Ratios</div>
    <div className="stock-detail-ratios-list">
      {ratios.map((r) => (
        <MetricCard key={r.label} title={r.label} value={r.value} />
      ))}
    </div>
  </div>
);

export default StockKeyRatios;
