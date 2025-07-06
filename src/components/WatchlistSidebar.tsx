import React from "react";
import { Button, Popconfirm } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

/**
 * WatchlistSidebar displays the list of watchlists and controls for add/edit/delete/select.
 */
interface WatchlistSidebarProps {
  watchlists: { id: number; name: string }[];
  selected: number | null;
  onSelect: (id: number) => void;
  onAdd: () => void;
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const WatchlistSidebar: React.FC<WatchlistSidebarProps> = ({
  watchlists,
  selected,
  onSelect,
  onAdd,
  onEdit,
  onDelete,
}) => (
  <div className="watchlist-sidebar">
    <div className="watchlist-header">Watchlists</div>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onAdd}
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
          onClick={() => onSelect(wl.id)}
        >
          <span>{wl.name}</span>
          <div className="flex gap-sm align-center">
            <Button
              size="small"
              icon={<EditOutlined />}
              onClick={(e) => {
                e.stopPropagation();
                onEdit(wl.id, wl.name);
              }}
            />
            <Popconfirm
              title="Delete this watchlist?"
              onConfirm={(e) => {
                e?.stopPropagation();
                onDelete(wl.id);
              }}
            >
              <Button size="small" icon={<DeleteOutlined />} danger />
            </Popconfirm>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default WatchlistSidebar;
