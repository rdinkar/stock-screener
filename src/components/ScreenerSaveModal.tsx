import React from "react";
import { Modal, Input } from "antd";

/**
 * ScreenerSaveModal renders the modal for saving a filter preset.
 */
interface ScreenerSaveModalProps {
  open: boolean;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onOk: () => void;
  onCancel: () => void;
}

const ScreenerSaveModal: React.FC<ScreenerSaveModalProps> = ({
  open,
  value,
  onChange,
  onOk,
  onCancel,
}) => (
  <Modal
    open={open}
    title="Save Filter Preset"
    onOk={onOk}
    onCancel={onCancel}
    okText="Save"
  >
    <Input value={value} onChange={onChange} placeholder="Preset name" />
  </Modal>
);

export default ScreenerSaveModal;
