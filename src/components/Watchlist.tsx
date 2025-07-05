import React, { useState } from "react";
import { Button, Modal, Input, Switch, message, Popconfirm, Tag } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  BellOutlined,
  MenuOutlined,
} from "@ant-design/icons";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import mockData from "../assets/mock-data-json.json";
import "./dashboard-helper.css";
import type { DragEndEvent } from "@dnd-kit/core";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";
import { useNavigate } from "react-router-dom";

const initialWatchlists = mockData.watchlists.map((wl) => ({
  ...wl,
  alerts: false,
  alertNote: "",
}));
const stocksMap = Object.fromEntries(mockData.stocks.map((s) => [s.id, s]));

function DraggableStockItem({
  id,
  stock,
}: {
  id: string;
  stock: (typeof stocksMap)[string];
}) {
  const navigate = useNavigate();
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    boxShadow: isDragging ? "0 4px 16px rgba(24,144,255,0.18)" : undefined,
    background: isDragging ? "#e6f7ff" : "#fff",
    zIndex: isDragging ? 2 : 1,
  };
  return (
    <div
      ref={setNodeRef}
      className={`watchlist-stock-item${isDragging ? " dragging" : ""}`}
      style={style}
      onClick={() => navigate(`/stock/${id}`)}
    >
      <span
        className="watchlist-stock-drag"
        {...(listeners as SyntheticListenerMap)}
        {...attributes}
        onClick={(e) => e.stopPropagation()}
      >
        <MenuOutlined />
      </span>
      <Tag color="blue">{stock.id}</Tag>
      <span className="watchlist-stock-name">{stock.name}</span>
      <span className="watchlist-stock-metric">${stock.currentPrice}</span>
      <span
        className={`watchlist-stock-metric ${
          stock.change >= 0 ? "stock-up" : "stock-down"
        }`}
      >
        {stock.change >= 0 ? "+" : ""}
        {stock.change} ({stock.changePercent}%)
      </span>
      <span className="watchlist-stock-metric">Vol: {stock.volume}</span>
    </div>
  );
}

const Watchlist: React.FC = () => {
  const [watchlists, setWatchlists] = useState(initialWatchlists);
  const [selected, setSelected] = useState<number | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalName, setModalName] = useState("");
  const [modalId, setModalId] = useState<number | null>(null);

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
    if (!modalName.trim()) return message.error("Name required");
    if (modalId === null) {
      // Add
      const newId = Math.max(0, ...watchlists.map((w) => w.id)) + 1;
      const now = new Date().toISOString();
      setWatchlists([
        ...watchlists,
        {
          id: newId,
          name: modalName,
          stocks: [],
          alerts: false,
          alertNote: "",
          createdAt: now,
          updatedAt: now,
        },
      ]);
      setSelected(newId);
    } else {
      // Edit
      setWatchlists(
        watchlists.map((w) =>
          w.id === modalId
            ? { ...w, name: modalName, updatedAt: new Date().toISOString() }
            : w
        )
      );
    }
    setModalOpen(false);
  };
  const handleDelete = (id: number) => {
    setWatchlists(watchlists.filter((w) => w.id !== id));
    if (selected === id) setSelected(null);
  };

  // DnD-kit
  const sensors = useSensors(useSensor(PointerSensor));
  const selectedWl = watchlists.find((w) => w.id === selected) || watchlists[0];
  const stockIds = selectedWl?.stocks || [];
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    const oldIndex = stockIds.indexOf(String(active.id));
    const newIndex = stockIds.indexOf(String(over.id));
    if (oldIndex === -1 || newIndex === -1) return;
    const newStocks = arrayMove(stockIds, oldIndex, newIndex);
    setWatchlists(
      watchlists.map((w) =>
        w.id === selectedWl.id
          ? { ...w, stocks: newStocks, updatedAt: new Date().toISOString() }
          : w
      )
    );
  };

  // Alerts
  const handleAlertToggle = (id: number, checked: boolean) => {
    setWatchlists(
      watchlists.map((w) => (w.id === id ? { ...w, alerts: checked } : w))
    );
  };
  const handleAlertNote = (id: number, note: string) => {
    setWatchlists(
      watchlists.map((w) => (w.id === id ? { ...w, alertNote: note } : w))
    );
  };

  // UI
  return (
    <div className="watchlist-container">
      <div className="watchlist-sidebar">
        <div className="watchlist-header">Watchlists</div>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openAdd}
          block
          style={{ marginBottom: 12 }}
        >
          Add
        </Button>
        <div className="watchlist-list">
          {watchlists.map((wl) => (
            <div
              key={wl.id}
              className={`watchlist-list-item${
                selected === wl.id ? " selected" : ""
              }`}
              onClick={() => setSelected(wl.id)}
            >
              <span>{wl.name}</span>
              <div className="flex gap-sm align-center">
                <Button
                  size="small"
                  icon={<EditOutlined />}
                  onClick={(e) => {
                    e.stopPropagation();
                    openEdit(wl.id, wl.name);
                  }}
                />
                <Popconfirm
                  title="Delete this watchlist?"
                  onConfirm={(e) => {
                    e?.stopPropagation();
                    handleDelete(wl.id);
                  }}
                >
                  <Button size="small" icon={<DeleteOutlined />} danger />
                </Popconfirm>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="watchlist-main">
        <div className="watchlist-main-header">
          <span className="watchlist-main-title">{selectedWl?.name}</span>
          <span style={{ marginLeft: 16 }}>
            <BellOutlined /> Alerts
            <Switch
              checked={selectedWl?.alerts}
              onChange={(checked) => handleAlertToggle(selectedWl.id, checked)}
              style={{ marginLeft: 8 }}
            />
          </span>
          {selectedWl?.alerts && (
            <Input
              placeholder="Alert note (e.g. price > 200)"
              value={selectedWl.alertNote}
              onChange={(e) => handleAlertNote(selectedWl.id, e.target.value)}
              style={{ width: 220, marginLeft: 16 }}
              size="small"
            />
          )}
        </div>
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={stockIds}
            strategy={verticalListSortingStrategy}
          >
            <div className="watchlist-stock-list">
              {stockIds.map((id: string) => (
                <DraggableStockItem key={id} id={id} stock={stocksMap[id]} />
              ))}
            </div>
          </SortableContext>
        </DndContext>
      </div>
      <Modal
        open={modalOpen}
        title={modalId === null ? "Add Watchlist" : "Edit Watchlist"}
        onOk={handleModalOk}
        onCancel={() => setModalOpen(false)}
        okText="Save"
      >
        <Input
          value={modalName}
          onChange={(e) => setModalName(e.target.value)}
          placeholder="Watchlist name"
        />
      </Modal>
    </div>
  );
};

export default Watchlist;
