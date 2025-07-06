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
  <div
    className="flex-col gap-md bg-white br-md p-lg"
    style={{ minWidth: 250 }}
  >
    <h3 className="m-b-md">Watchlists</h3>
    <Button
      type="primary"
      icon={<PlusOutlined />}
      onClick={onAdd}
      block
      style={{ marginBottom: 12 }}
    >
      Add
    </Button>
    <div className="flex-col gap-sm over-auto flex-1">
      {watchlists.map((wl) => (
        <div
          key={wl.id}
          className={`flex align-center space-bw bg-gray br-sm p-md cursor-pointer${
            selected === wl.id ? " bg-blue" : ""
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
