import React from "react";
import StockTable from "../components/StockTable";
import ScreenerPresetsRow from "../components/ScreenerPresetsRow";
import ScreenerFilters from "../components/ScreenerFilters";
import ScreenerSaveModal from "../components/ScreenerSaveModal";
import ScreenerTableHeaderRow from "../components/ScreenerTableHeaderRow";
import { getScreenerColumns } from "../utils/screenerColumns";
import { useScreenerHandlers } from "../features/useScreenerHandlers";

const columns = getScreenerColumns();

const ScreenerPage: React.FC = () => {
  const {
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
    saveModalOpen,
    saveModalName,
    setSaveModalName,
    handleSaveModalOk,
    setSaveModalOpen,
    navigate,
  } = useScreenerHandlers();

  const handleExport = () => {
    const csv = [
      columns.map((c) => c.title).join(","),
      ...filteredData.map((row) =>
        columns.map((c) => row[c.dataIndex as keyof typeof row]).join(",")
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "screener-results.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-col gap-xl p-xl bg-gray flex-1 h-100 over-auto">
      <div className="bg-white br-md p-lg flex-col gap-md">
        <ScreenerPresetsRow
          presets={presets}
          selectedPreset={selectedPreset}
          onPreset={handlePreset}
          savedConfigs={savedConfigs}
          selectedSavedConfig={selectedSavedConfig}
          onLoad={handleLoad}
          onSave={handleSave}
        />
        <ScreenerFilters
          filters={filters}
          metrics={metrics}
          operators={operators}
          onUpdate={updateFilter}
          onAdd={addFilterHandler}
          onRemove={removeFilterHandler}
        />
      </div>
      <div className="bg-white br-md p-md">
        <ScreenerTableHeaderRow onExport={handleExport} />
        <StockTable
          columns={columns}
          data={filteredData}
          rowKey="id"
          size="middle"
          pageSize={10}
          pagination={true}
          onRowClick={(record) => navigate(`/stock/${record.id}`)}
        />
        <ScreenerSaveModal
          open={saveModalOpen}
          value={saveModalName}
          onChange={(e) => setSaveModalName(e.target.value)}
          onOk={handleSaveModalOk}
          onCancel={() => setSaveModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default ScreenerPage;
