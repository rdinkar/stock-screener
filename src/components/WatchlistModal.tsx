import React from "react";
import { Modal, Input } from "antd";

/**
 * WatchlistModal renders the add/edit watchlist modal.
 */
interface WatchlistModalProps {
  open: boolean;
  name: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOk: () => void;
  onCancel: () => void;
  isEdit: boolean;
}

const WatchlistModal: React.FC<WatchlistModalProps> = ({
  open,
  name,
  onChange,
  onOk,
  onCancel,
  isEdit,
}) => (
  <Modal
    open={open}
    title={isEdit ? "Edit Watchlist" : "Add Watchlist"}
    onOk={onOk}
    onCancel={onCancel}
    okText="Save"
  >
    <Input value={name} onChange={onChange} placeholder="Watchlist name" />
  </Modal>
);

export default WatchlistModal;
