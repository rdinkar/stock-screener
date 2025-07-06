import React from "react";
import { Empty } from "antd";
import "../styles/helper.css";
import { useStockDetail } from "../features/useStockDetail";
import StockDetailHeader from "../components/StockDetailHeader";
import StockPriceChart from "../components/StockPriceChart";
import StockKeyRatios from "../components/StockKeyRatios";
import StockFinancialTrends from "../components/StockFinancialTrends";
import StockCompanyInfo from "../components/StockCompanyInfo";

/**
 * StockDetailPage displays detailed information about a stock, including price chart, key ratios, financial trends, and company info.
 */
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
    <div className="stock-detail-container">
      <StockDetailHeader
        name={stock.name}
        id={stock.id}
        currentPrice={stock.currentPrice}
        change={stock.change}
        changePercent={stock.changePercent}
      />
      <div className="stock-detail-main">
        <StockPriceChart
          period={period}
          setPeriod={setPeriod}
          timePeriods={timePeriods}
          priceOption={priceOption}
        />
        <StockKeyRatios ratios={ratios} />
      </div>
      <div className="stock-detail-financials">
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
