import { Table } from "antd";
import type { TableProps } from "antd";

/**
 * StockTable is a reusable table for displaying stock lists.
 *
 * @template T - The type of data in each row.
 * @param {Array} columns - Table columns (AntD format).
 * @param {Array} data - Data source for the table.
 * @param {function} [onRowClick] - Optional row click handler (receives record).
 * @param {string} [rowKey] - Row key field (default: 'id').
 * @param {number} [pageSize] - Number of rows per page (default: 10).
 * @param {string} [size] - Table size (default: 'middle').
 * @param {boolean} [pagination] - Enable/disable pagination (default: true).
 */
interface StockTableProps<T> {
  columns: TableProps<T>["columns"];
  data: T[];
  onRowClick?: (record: T) => void;
  rowKey?: string;
  pageSize?: number;
  size?: "small" | "middle" | "large";
  pagination?: boolean;
}

function StockTable<T extends object = Record<string, unknown>>({
  columns,
  data,
  onRowClick,
  rowKey = "id",
  pageSize = 10,
  size = "middle",
  pagination = true,
}: StockTableProps<T>) {
  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey={rowKey}
      size={size}
      pagination={pagination ? { pageSize } : false}
      onRow={
        onRowClick
          ? (record) => ({
              onClick: () => onRowClick(record),
              style: { cursor: "pointer" },
            })
          : undefined
      }
    />
  );
}

export default StockTable;
