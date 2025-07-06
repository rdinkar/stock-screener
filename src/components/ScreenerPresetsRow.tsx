import React from "react";
import { Button, Select } from "antd";

/**
 * ScreenerPresetsRow displays preset filter buttons, saved config select, and save button.
 */
interface ScreenerPresetsRowProps {
  presets: { id: number; name: string }[];
  selectedPreset: number | undefined;
  onPreset: (id: number) => void;
  savedConfigs: { name: string }[];
  selectedSavedConfig: string | undefined;
  onLoad: (name: string | number | undefined) => void;
  onSave: () => void;
}

const ScreenerPresetsRow: React.FC<ScreenerPresetsRowProps> = ({
  presets,
  selectedPreset,
  onPreset,
  savedConfigs,
  selectedSavedConfig,
  onLoad,
  onSave,
}) => (
  <div className="flex align-center gap-md m-b-md flex-wrap">
    <h4 className="m-b-0">Presets:</h4>
    <div className="flex gap-md">
      {presets.map((p) => (
        <Button
          key={p.id}
          type={selectedPreset === p.id ? "primary" : "default"}
          size="small"
          onClick={() => onPreset(p.id)}
        >
          {p.name}
        </Button>
      ))}
    </div>
    <div className="flex-1" />
    <Select
      style={{ width: 180, marginRight: 10 }}
      placeholder="Load Saved"
      value={selectedSavedConfig}
      onChange={onLoad}
      allowClear
      size="small"
    >
      {savedConfigs.map((c) => (
        <Select.Option key={c.name} value={String(c.name)}>
          {c.name}
        </Select.Option>
      ))}
    </Select>
    <Button onClick={onSave} size="small">
      Save
    </Button>
  </div>
);

export default ScreenerPresetsRow;
