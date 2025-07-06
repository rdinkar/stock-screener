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
  <div className="stock-detail-header">
    <div className="stock-detail-title">
      {name} <Tag color="blue">{id}</Tag>
    </div>
    <div className="stock-detail-price">
      <Statistic
        title="Current Price"
        value={currentPrice}
        prefix="$"
        precision={2}
      />
      <span className={change >= 0 ? "stock-up" : "stock-down"}>
        {change >= 0 ? "+" : ""}
        {change} ({changePercent}%)
      </span>
    </div>
  </div>
);

export default StockDetailHeader;
