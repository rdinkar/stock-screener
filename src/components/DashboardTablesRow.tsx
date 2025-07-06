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
  <div className="dashboard-tables-row">
    <div className="dashboard-table">
      <div className="dashboard-table-title">Top Gainers</div>
      <StockTable
        columns={columns}
        data={topGainers}
        pagination={false}
        size="small"
      />
    </div>
    <div className="dashboard-table">
      <div className="dashboard-table-title">Top Losers</div>
      <StockTable
        columns={columns}
        data={topLosers}
        pagination={false}
        size="small"
      />
    </div>
    <div className="dashboard-table">
      <div className="dashboard-table-title">Most Active</div>
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
