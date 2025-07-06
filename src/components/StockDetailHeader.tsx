import React from "react";
import { Statistic, Tag } from "antd";

/**
 * StockDetailHeader displays the stock name, symbol, current price, and price change.
 */
interface StockDetailHeaderProps {
  name: string;
  id: string;
  currentPrice: number;
  change: number;
  changePercent: number;
}

const StockDetailHeader: React.FC<StockDetailHeaderProps> = ({
  name,
  id,
  currentPrice,
  change,
  changePercent,
}) => (
  <div className="flex align-center justify-between m-b-xl space-bw gap-xl">
    <h2 className="flex align-center gap-sm">
      {name} <Tag color="blue">{id}</Tag>
    </h2>
    <div className="flex align-end gap-md">
      <Statistic
        title="Current Price"
        value={currentPrice}
        prefix="$"
        precision={2}
      />
      <h3
        className={`m-b-sm ${
          change >= 0 ? "color-positive" : "color-negative"
        }`}
      >
        {change >= 0 ? "+" : ""}
        {change} ({changePercent}%)
      </h3>
    </div>
  </div>
);

export default StockDetailHeader;
