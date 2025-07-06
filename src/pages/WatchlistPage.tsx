import React from "react";
import WatchlistSidebar from "../components/WatchlistSidebar";
import WatchlistMainHeader from "../components/WatchlistMainHeader";
import WatchlistStockList from "../components/WatchlistStockList";
import WatchlistModal from "../components/WatchlistModal";
import { useWatchlistHandlers } from "../features/useWatchlistHandlers";

const WatchlistPage: React.FC = () => {
  const {
    watchlists,
    selected,
    openAdd,
    openEdit,
    handleModalOk,
    handleDelete,
    handleSelect,
    modalOpen,
    setModalOpen,
    modalName,
    setModalName,
    modalId,
    stocksMap,
    sensors,
    selectedWl,
    stockIds,
    handleDragEnd,
    handleAlertToggle,
    handleAlertNote,
  } = useWatchlistHandlers();

  return (
    <div className="flex flex-1 gap-xl p-xl bg-gray h-100 over-auto">
      <WatchlistSidebar
        watchlists={watchlists}
        selected={selected}
        onSelect={handleSelect}
        onAdd={openAdd}
        onEdit={openEdit}
        onDelete={handleDelete}
      />
      <div className="flex-1 bg-white br-md p-lg flex flex-col min-w-0">
        <WatchlistMainHeader
          name={selectedWl?.name || ""}
          alerts={!!selectedWl?.alerts}
          alertNote={selectedWl?.alertNote || ""}
          onAlertToggle={(checked) => handleAlertToggle(selectedWl.id, checked)}
          onAlertNoteChange={(note) => handleAlertNote(selectedWl.id, note)}
        />
        <WatchlistStockList
          stockIds={stockIds}
          stocksMap={stocksMap}
          sensors={sensors}
          onDragEnd={handleDragEnd}
        />
      </div>
      <WatchlistModal
        open={modalOpen}
        name={modalName}
        onChange={(e) => setModalName(e.target.value)}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        isEdit={modalId !== null}
      />
    </div>
  );
};

export default WatchlistPage;
