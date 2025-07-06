import React from "react";
import { DndContext, useSensors, type DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import DraggableStockItem, {
  type DraggableStockItemProps,
} from "./DraggableStockItem";

/**
 * WatchlistStockList renders the draggable list of stocks in a watchlist.
 */
interface WatchlistStockListProps {
  stockIds: string[];
  stocksMap: Record<string, DraggableStockItemProps["stock"]>;
  sensors: ReturnType<typeof useSensors>;
  onDragEnd: (event: DragEndEvent) => void;
}

const WatchlistStockList: React.FC<WatchlistStockListProps> = ({
  stockIds,
  stocksMap,
  sensors,
  onDragEnd,
}) => (
  <DndContext sensors={sensors} onDragEnd={onDragEnd}>
    <SortableContext items={stockIds} strategy={verticalListSortingStrategy}>
      <div className="watchlist-stock-list">
        {stockIds.map((id) => (
          <DraggableStockItem key={id} id={id} stock={stocksMap[id]} />
        ))}
      </div>
    </SortableContext>
  </DndContext>
);

export default WatchlistStockList;
