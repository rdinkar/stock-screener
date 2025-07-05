import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import mockData from "../assets/mock-data-json.json";

export interface Filter {
  metric: string;
  operator: string;
  value: number | undefined;
}
export interface SavedConfig {
  name: string;
  filters: Filter[];
}

interface ScreenerState {
  filters: Filter[];
  savedConfigs: SavedConfig[];
  selectedPreset: number | undefined;
}

const defaultFilters: Filter[] = [
  { metric: "", operator: ">=", value: undefined },
];

const initialState: ScreenerState = {
  filters: defaultFilters,
  savedConfigs: [],
  selectedPreset: undefined,
};

const screenerSlice = createSlice({
  name: "screener",
  initialState,
  reducers: {
    setFilters(state, action: PayloadAction<Filter[]>) {
      state.filters = action.payload;
    },
    addFilter(state) {
      state.filters.push({ metric: "", operator: ">=", value: undefined });
    },
    updateFilter(
      state,
      action: PayloadAction<{
        idx: number;
        key: keyof Filter;
        value: string | number | undefined;
      }>
    ) {
      const { idx, key, value } = action.payload;
      if (state.filters[idx]) {
        if (key === "metric" && typeof value === "string") {
          state.filters[idx].metric = value;
        } else if (key === "operator" && typeof value === "string") {
          state.filters[idx].operator = value;
        } else if (
          key === "value" &&
          (typeof value === "number" || typeof value === "undefined")
        ) {
          state.filters[idx].value = value;
        }
      }
    },
    removeFilter(state, action: PayloadAction<number>) {
      if (state.filters.length > 1) {
        state.filters.splice(action.payload, 1);
      }
    },
    setSelectedPreset(state, action: PayloadAction<number | undefined>) {
      state.selectedPreset = action.payload;
    },
    saveConfig(state, action: PayloadAction<string>) {
      state.savedConfigs.push({
        name: action.payload,
        filters: JSON.parse(JSON.stringify(state.filters)),
      });
    },
    loadConfig(state, action: PayloadAction<string>) {
      const config = state.savedConfigs.find((c) => c.name === action.payload);
      if (config) state.filters = JSON.parse(JSON.stringify(config.filters));
    },
    loadPreset(state, action: PayloadAction<number>) {
      const preset = mockData.screener_presets.presets.find(
        (p) => p.id === action.payload
      );
      if (preset) {
        state.filters = preset.criteria.map((c) => ({
          metric: c.metric,
          operator: c.operator,
          value: c.value,
        }));
        state.selectedPreset = action.payload;
      }
    },
  },
});

export const {
  setFilters,
  addFilter,
  updateFilter,
  removeFilter,
  setSelectedPreset,
  saveConfig,
  loadConfig,
  loadPreset,
} = screenerSlice.actions;

export default screenerSlice.reducer;
