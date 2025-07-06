import React from "react";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

/**
 * ScreenerTableHeaderRow displays the results title and export button.
 */
interface ScreenerTableHeaderRowProps {
  onExport: () => void;
}

const ScreenerTableHeaderRow: React.FC<ScreenerTableHeaderRowProps> = ({
  onExport,
}) => (
  <div className="screener-table-header-row">
    <span className="screener-table-title">Results</span>
    <Button icon={<DownloadOutlined />} onClick={onExport} size="small">
      Export
    </Button>
  </div>
);

export default ScreenerTableHeaderRow;
