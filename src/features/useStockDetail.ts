import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import mockData from "../assets/mock-data-json.json";

const timePeriods = [
  { key: "1D", label: "1D", dataKey: "daily", points: 1 },
  { key: "1W", label: "1W", dataKey: "daily", points: 5 },
  { key: "1M", label: "1M", dataKey: "weekly", points: 4 },
  { key: "1Y", label: "1Y", dataKey: "monthly", points: 12 },
  { key: "5Y", label: "5Y", dataKey: "yearly", points: 5 },
];

export function useStockDetail() {
  const { id } = useParams<{ id: string }>();
  const stock = mockData.stocks.find((s) => s.id === id);
  const historical =
    id && Object.prototype.hasOwnProperty.call(mockData.historical_data, id)
      ? (mockData.historical_data as Record<string, any>)[id]
      : undefined;
  const financials =
    id && Object.prototype.hasOwnProperty.call(mockData.financials, id)
      ? (mockData.financials as Record<string, any>)[id]
      : undefined;

  const [period, setPeriod] = useState("1M");

  const priceData = useMemo(() => {
    if (!historical) return [];
    const periodObj = timePeriods.find((p) => p.key === period);
    if (!periodObj) return [];
    if (periodObj.dataKey === "daily") {
      return (historical.daily as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "weekly") {
      return (historical.weekly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "monthly") {
      return (historical.monthly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    } else if (periodObj.dataKey === "yearly") {
      return (historical.yearly as { date: string; close: number }[]).slice(
        -periodObj.points
      );
    }
    return [];
  }, [historical, period]);

  const priceOption = stock && {
    title: { text: `${stock.name} Price`, left: "center" },
    tooltip: { trigger: "axis" },
    xAxis: {
      type: "category",
      data: priceData.map((d) => d.date),
    },
    yAxis: { type: "value" },
    series: [
      {
        data: priceData.map((d) => d.close),
        type: "line",
        smooth: true,
        areaStyle: {},
        color: "#1890ff",
      },
    ],
  };

  const ratios = stock
    ? [
        { label: "P/E", value: stock.pe },
        { label: "P/B", value: (stock.pe / 2).toFixed(2) },
        {
          label: "ROCE",
          value: ((stock.eps / stock.currentPrice) * 100).toFixed(2),
        },
        { label: "Dividend Yield", value: stock.dividendYield },
        { label: "Beta", value: stock.beta },
      ]
    : [];

  const quarterly = financials?.quarterly || [];
  const annual = financials?.annual || [];

  const trendOption = (
    data: typeof quarterly | typeof annual,
    type: "quarterly" | "annual"
  ) => ({
    title: {
      text: `${type === "quarterly" ? "Quarterly" : "Annual"} Financials`,
      left: "center",
    },
    tooltip: { trigger: "axis" },
    legend: { data: ["Revenue", "Net Income", "EPS"], top: 24 },
    xAxis: {
      type: "category",
      data:
        type === "quarterly"
          ? (data as any[]).map((d) => d.date)
          : (data as any[]).map((d) => d.year),
    },
    yAxis: { type: "value" },
    series: [
      {
        name: "Revenue",
        type: "bar",
        data: data.map((d: any) => d.revenue),
        color: "#1890ff",
      },
      {
        name: "Net Income",
        type: "bar",
        data: data.map((d: any) => d.netIncome),
        color: "#52c41a",
      },
      {
        name: "EPS",
        type: "line",
        data: data.map((d: any) => d.eps),
        color: "#faad14",
      },
    ],
  });

  const infoRows = stock
    ? [
        { label: "Name", value: stock.name },
        { label: "Sector", value: stock.sector },
        { label: "Industry", value: stock.industry },
        { label: "Market Cap", value: `$${stock.marketCap.toLocaleString()}` },
        { label: "Dividend", value: stock.dividend },
        { label: "52W High", value: stock.yearHigh },
        { label: "52W Low", value: stock.yearLow },
      ]
    : [];

  return {
    stock,
    period,
    setPeriod,
    timePeriods,
    priceOption,
    ratios,
    quarterly,
    annual,
    trendOption,
    infoRows,
  };
}
