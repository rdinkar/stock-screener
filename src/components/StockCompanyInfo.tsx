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
  <div className="flex-1 bg-white br-md p-lg flex-col align-stretch">
    <h3 className="m-b-md">Company Info</h3>
    <StockTable
      columns={columns}
      data={infoRows}
      pagination={false}
      size="small"
    />
  </div>
);

export default StockCompanyInfo;
