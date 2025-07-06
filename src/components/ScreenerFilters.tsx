import React from "react";
import { Select, InputNumber, Button } from "antd";
import type { Filter } from "../features/screenerSlice";

/**
 * ScreenerFilters renders the list of filter rows and add filter button.
 */
interface ScreenerFiltersProps {
  filters: Filter[];
  metrics: { id: string; name: string }[];
  operators: { value: string; label: string }[];
  onUpdate: (
    idx: number,
    key: "metric" | "operator" | "value",
    value: string | number | undefined
  ) => void;
  onAdd: () => void;
  onRemove: (idx: number) => void;
}

const ScreenerFilters: React.FC<ScreenerFiltersProps> = ({
  filters,
  metrics,
  operators,
  onUpdate,
  onAdd,
  onRemove,
}) => (
  <>
    {filters.map((f, idx) => (
      <div className="screener-filter-row" key={idx}>
        <Select
          style={{ width: 160, marginRight: 8 }}
          placeholder="Metric"
          value={f.metric}
          onChange={(v) => onUpdate(idx, "metric", v)}
          size="small"
        >
          {metrics.map((m) => (
            <Select.Option key={m.id} value={m.id}>
              {m.name}
            </Select.Option>
          ))}
        </Select>
        <Select
          style={{ width: 80, marginRight: 8 }}
          value={f.operator}
          onChange={(v) => onUpdate(idx, "operator", v)}
          size="small"
        >
          {operators.map((o) => (
            <Select.Option key={o.value} value={o.value}>
              {o.label}
            </Select.Option>
          ))}
        </Select>
        <InputNumber
          style={{ width: 120, marginRight: 8 }}
          value={f.value}
          // @ts-expect-error - antd types issue
          onChange={(v) => onUpdate(idx, "value", v)}
          placeholder="Value"
          size="small"
        />
        <Button
          danger
          onClick={() => onRemove(idx)}
          disabled={filters.length === 1}
          size="small"
        >
          Remove
        </Button>
      </div>
    ))}
    <Button type="dashed" onClick={onAdd} style={{ marginTop: 8 }} size="small">
      Add Filter
    </Button>
  </>
);

export default ScreenerFilters;
