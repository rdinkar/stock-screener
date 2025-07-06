import React from "react";
import { Tabs } from "antd";
import ReactECharts from "echarts-for-react";
import type { useStockDetail } from "../features/useStockDetail";

/**
 * StockFinancialTrends displays quarterly and annual financial trends charts.
 */

type StockFinancialTrendsProps = Pick<
  ReturnType<typeof useStockDetail>,
  "trendOption" | "quarterly" | "annual"
>;

const { TabPane } = Tabs;

const StockFinancialTrends: React.FC<StockFinancialTrendsProps> = ({
  trendOption,
  quarterly,
  annual,
}) => (
  <div className="flex-2 bg-white br-md p-lg">
    <Tabs defaultActiveKey="quarterly" className="m-b-md">
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
