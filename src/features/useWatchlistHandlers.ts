import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { RootState } from "../store";
import {
  addWatchlist,
  editWatchlist,
  deleteWatchlist,
  selectWatchlist,
  reorderStocks,
  setAlerts,
  setAlertNote,
} from "./watchlistSlice";
import mockData from "../assets/mock-data-json.json";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

export function useWatchlistHandlers() {
  const dispatch = useDispatch();
  const watchlists = useSelector(
    (state: RootState) => state.watchlist.watchlists
  );
  const selected = useSelector(
    (state: RootState) => state.watchlist.selectedId
  );
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalId, setModalId] = useState<number | null>(null);
  const navigate = useNavigate();

  const stocksMap = Object.fromEntries(mockData.stocks.map((s) => [s.id, s]));
  const sensors = useSensors(useSensor(PointerSensor));
  const selectedWl = watchlists.find((w) => w.id === selected) || watchlists[0];
  const stockIds = selectedWl?.stocks || [];

  // CRUD
  const openAdd = () => {
    setModalName("");
    setModalId(null);
    setModalOpen(true);
  };
  const openEdit = (id: number, name: string) => {
    setModalName(name);
    setModalId(id);
    setModalOpen(true);
  };
  const handleModalOk = () => {
    if (!modalName.trim()) return;
    if (modalId === null) {
      dispatch(addWatchlist({ name: modalName }));
    } else {
      dispatch(editWatchlist({ id: modalId, name: modalName }));
    }
    setModalOpen(false);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteWatchlist(id));
  };
  const handleSelect = (id: number) => {
    dispatch(selectWatchlist(id));
  };

  // DnD
  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = stockIds.indexOf(String(active.id));
    const newIndex = stockIds.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const newStocks = arrayMove(stockIds, oldIndex, newIndex);
    dispatch(reorderStocks({ id: selectedWl.id, stocks: newStocks }));
  };

  // Alerts
  const handleAlertToggle = (id: number, checked: boolean) => {
    dispatch(setAlerts({ id, alerts: checked }));
  };
  const handleAlertNote = (id: number, note: string) => {
    dispatch(setAlertNote({ id, note }));
  };

  return {
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
    navigate,
  };
}
