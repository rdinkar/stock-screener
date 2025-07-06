import React from "react";
import { useNavigate } from "react-router-dom";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { MenuOutlined } from "@ant-design/icons";
import { Tag } from "antd";
import type { SyntheticListenerMap } from "@dnd-kit/core/dist/hooks/utilities";

/**
 * DraggableStockItem renders a draggable stock row for the watchlist.
 */
interface DraggableStockItemProps {
  id: string;
  stock: {
    id: string;
    name: string;
    currentPrice: number;
    change: number;
    changePercent: number;
    volume: number;
  };
}

const DraggableStockItem: React.FC<DraggableStockItemProps> = ({
  id,
  stock,
}) => {
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
};

export default DraggableStockItem;
