import React from "react";
import { Empty } from "antd";
import { useStockDetail } from "../features/useStockDetail";
import StockDetailHeader from "../components/StockDetailHeader";
import StockPriceChart from "../components/StockPriceChart";
import StockKeyRatios from "../components/StockKeyRatios";
import StockFinancialTrends from "../components/StockFinancialTrends";
import StockCompanyInfo from "../components/StockCompanyInfo";

const StockDetailPage: React.FC = () => {
  const {
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
  } = useStockDetail();

  if (!stock) return <Empty description="Stock not found" />;

  return (
    <div className="bg-gray p-xl flex-1 h-100 over-auto">
      <StockDetailHeader
        name={stock.name}
        id={stock.id}
        currentPrice={stock.currentPrice}
        change={stock.change}
        changePercent={stock.changePercent}
      />
      <div className="flex gap-xl m-b-xl flex-wrap">
        {priceOption && (
          <StockPriceChart
            period={period}
            setPeriod={setPeriod}
            timePeriods={timePeriods}
            priceOption={priceOption}
          />
        )}
        <StockKeyRatios ratios={ratios} />
      </div>
      <div className="flex gap-xl flex-wrap">
        <StockFinancialTrends
          trendOption={trendOption}
          quarterly={quarterly}
          annual={annual}
        />
        <StockCompanyInfo infoRows={infoRows} />
      </div>
    </div>
  );
};

export default StockDetailPage;
