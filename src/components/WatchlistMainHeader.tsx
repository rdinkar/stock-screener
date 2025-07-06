import React from "react";
import { Switch, Input } from "antd";
import { BellOutlined } from "@ant-design/icons";

/**
 * WatchlistMainHeader displays the watchlist title, alerts toggle, and alert note input.
 */
interface WatchlistMainHeaderProps {
  name: string;
  alerts: boolean;
  alertNote: string;
  onAlertToggle: (checked: boolean) => void;
  onAlertNoteChange: (note: string) => void;
}

const WatchlistMainHeader: React.FC<WatchlistMainHeaderProps> = ({
  name,
  alerts,
  alertNote,
  onAlertToggle,
  onAlertNoteChange,
}) => (
  <div className="flex align-center gap-md m-b-lg flex-wrap">
    <h3 className="m-b-0">{name}</h3>
    <span style={{ marginLeft: 15 }}>
      <BellOutlined /> Alerts
      <Switch
        checked={alerts}
        onChange={onAlertToggle}
        style={{ marginLeft: 8 }}
      />
    </span>
    {alerts && (
      <Input
        placeholder="Alert note (e.g. price > 200)"
        value={alertNote}
        onChange={(e) => onAlertNoteChange(e.target.value)}
        style={{ width: 220, marginLeft: 16 }}
        size="small"
      />
    )}
  </div>
);

export default WatchlistMainHeader;
