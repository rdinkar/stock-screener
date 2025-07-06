import React from "react";
import { Statistic } from "antd";

/**
 * MetricCard displays a key metric with a title and value, using Ant Design's Statistic.
 * Can be used in dashboards, stock detail, or anywhere a metric needs to be highlighted.
 *
 * @param {string} title - The label for the metric.
 * @param {number | string} value - The value to display.
 * @param {string} [prefix] - Optional prefix (e.g., $).
 * @param {string} [suffix] - Optional suffix (e.g., %).
 * @param {number} [precision] - Number of decimal places.
 * @param {React.CSSProperties} [style] - Optional style overrides.
 */
interface MetricCardProps {
  title: string;
  value: number | string;
  prefix?: string;
  suffix?: string;
  precision?: number;
  style?: React.CSSProperties;
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  prefix,
  suffix,
  precision,
  style,
}) => (
  <div
    style={{
      background: "#fff",
      borderRadius: 8,
      padding: 24,
      boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      ...style,
    }}
  >
    <Statistic
      title={title}
      value={value}
      prefix={prefix}
      suffix={suffix}
      precision={precision}
    />
  </div>
);

export default MetricCard;
