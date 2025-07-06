import React from "react";
import StockTable from "./StockTable";
import type { TableProps } from "antd";
import type { Stock } from "../pages/DashboardPage";

/**
 * DashboardTablesRow displays tables for top gainers, losers, and most active stocks.
 */
interface DashboardTablesRowProps {
  columns: TableProps<Stock>["columns"];
  topGainers: Stock[];
  topLosers: Stock[];
  mostActive: Stock[];
}

const DashboardTablesRow: React.FC<DashboardTablesRowProps> = ({
  columns,
  topGainers,
  topLosers,
  mostActive,
}) => (
  <div className="flex gap-xl">
    <div className="bg-white br-md p-lg flex-1 flex-col">
      <h3>Top Gainers</h3>
      <StockTable
        columns={columns}
        data={topGainers}
        pagination={false}
        size="small"
      />
    </div>
    <div className="bg-white br-md p-lg flex-1 flex-col">
      <h3>Top Losers</h3>
      <StockTable
        columns={columns}
        data={topLosers}
        pagination={false}
        size="small"
      />
    </div>
    <div className="bg-white br-md p-lg flex-1 flex-col">
      <h3>Most Active</h3>
      <StockTable
        columns={columns}
        data={mostActive}
        pagination={false}
        size="small"
      />
    </div>
  </div>
);

export default DashboardTablesRow;
