import React from "react";
import { Tabs } from "antd";
import ReactECharts from "echarts-for-react";

/**
 * StockFinancialTrends displays quarterly and annual financial trends charts.
 */
interface StockFinancialTrendsProps {
  trendOption: (data: any[], type: "quarterly" | "annual") => object;
  quarterly: any[];
  annual: any[];
}

const { TabPane } = Tabs;

const StockFinancialTrends: React.FC<StockFinancialTrendsProps> = ({
  trendOption,
  quarterly,
  annual,
}) => (
  <div className="stock-detail-financials-chart">
    <Tabs defaultActiveKey="quarterly" className="stock-detail-tabs">
      <TabPane tab="Quarterly" key="quarterly">
        <ReactECharts
          option={trendOption(quarterly, "quarterly")}
          style={{ height: 260 }}
        />
      </TabPane>
      <TabPane tab="Annual" key="annual">
        <ReactECharts
          option={trendOption(annual, "annual")}
          style={{ height: 260 }}
        />
      </TabPane>
    </Tabs>
  </div>
);

export default StockFinancialTrends;
