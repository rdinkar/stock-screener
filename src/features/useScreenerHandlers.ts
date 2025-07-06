import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import {
  addFilter,
  updateFilter as updateFilterAction,
  removeFilter as removeFilterAction,
  saveConfig,
  loadConfig,
  loadPreset,
  setSelectedPreset,
} from "./screenerSlice";
import mockData from "../assets/mock-data-json.json";
import { applyFilters } from "../utils/filters";

export function useScreenerHandlers() {
  const dispatch = useDispatch<AppDispatch>();
  const filters = useSelector((state: RootState) => state.screener.filters);
  const savedConfigs = useSelector(
    (state: RootState) => state.screener.savedConfigs
  );
  const selectedPreset = useSelector(
    (state: RootState) => state.screener.selectedPreset
  );

  const [selectedSavedConfig, setSelectedSavedConfig] = useState<
    string | undefined
  >(undefined);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [saveModalName, setSaveModalName] = useState("");

  const navigate = useNavigate();

  const metrics = mockData.screener_presets.availableMetrics;
  const presets = mockData.screener_presets.presets;
  const stocks = mockData.stocks;
  const operators = [
    { value: ">=", label: ">=" },
    { value: "<=", label: "<=" },
    { value: ">", label: ">" },
    { value: "<", label: "<" },
    { value: "=", label: "=" },
  ];

  const filteredData = useMemo(() => applyFilters(stocks, filters), [filters]);

  const handlePreset = (id: number | undefined) => {
    if (id !== undefined) {
      dispatch(loadPreset(id));
      dispatch(setSelectedPreset(id));
      setSelectedSavedConfig(undefined);
    }
  };

  const handleSave = () => {
    setSaveModalName("");
    setSaveModalOpen(true);
  };

  const handleSaveModalOk = () => {
    if (!saveModalName.trim()) return;
    dispatch(saveConfig(saveModalName));
    setSaveModalOpen(false);
  };

  const handleLoad = (name: string | number | undefined) => {
    if (typeof name === "string") {
      setSelectedSavedConfig(name);
      dispatch(loadConfig(name));
      dispatch(setSelectedPreset(undefined));
    } else {
      setSelectedSavedConfig(undefined);
    }
  };

  const handleExport = () => {
    // columns are imported in the page, so we can't access them here
    // Export logic should be handled in the page
  };

  const updateFilter = (
    idx: number,
    key: "metric" | "operator" | "value",
    value: string | number | undefined
  ) => {
    dispatch(updateFilterAction({ idx, key, value }));
  };
  const addFilterHandler = () => dispatch(addFilter());
  const removeFilterHandler = (idx: number) =>
    dispatch(removeFilterAction(idx));

  return {
    presets,
    selectedPreset,
    handlePreset,
    savedConfigs,
    selectedSavedConfig,
    handleLoad,
    handleSave,
    filters,
    metrics,
    operators,
    updateFilter,
    addFilterHandler,
    removeFilterHandler,
    filteredData,
    handleExport,
    saveModalOpen,
    saveModalName,
    setSaveModalName,
    handleSaveModalOk,
    setSaveModalOpen,
    navigate,
  };
}
