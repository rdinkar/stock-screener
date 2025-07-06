import React from "react";
import StockTable from "./StockTable";

/**
 * StockCompanyInfo displays company info as a table.
 */
interface StockCompanyInfoProps {
  infoRows: { label: string; value: string | number }[];
}

const columns = [
  { title: "Field", dataIndex: "label", key: "label" },
  { title: "Value", dataIndex: "value", key: "value" },
];

const StockCompanyInfo: React.FC<StockCompanyInfoProps> = ({ infoRows }) => (
  <div className="stock-detail-info">
    <div className="stock-detail-info-title">Company Info</div>
    <StockTable
      columns={columns}
      data={infoRows}
      pagination={false}
      size="small"
    />
  </div>
);

export default StockCompanyInfo;
