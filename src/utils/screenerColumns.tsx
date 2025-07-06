import { Link } from "react-router-dom";

// Minimal Stock type for screener columns
export type Stock = {
  id: string;
  name: string;
  currentPrice: number;
  changePercent: number;
  marketCap: number;
  pe: number;
  eps: number;
  dividendYield: number;
  volume: number;
};

/**
 * Returns the columns definition for the screener table.
 */
export function getScreenerColumns() {
  return [
    {
      title: "Symbol",
      dataIndex: "id",
      key: "id",
      sorter: (a: Stock, b: Stock) => a.id.localeCompare(b.id),
      render: (id: string) => <Link to={`/stock/${id}`}>{id}</Link>,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: (a: Stock, b: Stock) => a.name.localeCompare(b.name),
    },
    {
      title: "Price",
      dataIndex: "currentPrice",
      key: "currentPrice",
      render: (v: number) => `$${v}`,
      sorter: (a: Stock, b: Stock) => a.currentPrice - b.currentPrice,
    },
    {
      title: "Change %",
      dataIndex: "changePercent",
      key: "changePercent",
      sorter: (a: Stock, b: Stock) => a.changePercent - b.changePercent,
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      key: "marketCap",
      render: (v: number) => `$${v.toLocaleString()}`,
      sorter: (a: Stock, b: Stock) => a.marketCap - b.marketCap,
    },
    {
      title: "P/E",
      dataIndex: "pe",
      key: "pe",
      sorter: (a: Stock, b: Stock) => a.pe - b.pe,
    },
    {
      title: "EPS",
      dataIndex: "eps",
      key: "eps",
      sorter: (a: Stock, b: Stock) => a.eps - b.eps,
    },
    {
      title: "Dividend Yield",
      dataIndex: "dividendYield",
      key: "dividendYield",
      sorter: (a: Stock, b: Stock) => a.dividendYield - b.dividendYield,
    },
    {
      title: "Volume",
      dataIndex: "volume",
      key: "volume",
      sorter: (a: Stock, b: Stock) => a.volume - b.volume,
    },
  ];
}
