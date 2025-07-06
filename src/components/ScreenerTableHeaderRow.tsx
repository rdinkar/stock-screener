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
  <div className="flex align-center space-bw m-b-md gap-md">
    <h4 className="m-b-0">Results</h4>
    <Button icon={<DownloadOutlined />} onClick={onExport} size="small">
      Export
    </Button>
  </div>
);

export default ScreenerTableHeaderRow;
