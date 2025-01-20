import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { EmployeeAdd } from "./EmployeeAdd.jsx";
import React from "react";

export function EmployeeViewDialog({
  isModalOpen,
  viewKey,
  onChange,
  onSelect,
  modalChange,
}) {
  const changeModalView = () => {
    onChange();
    modalChange();
  };

  return (
    <DialogRoot open={isModalOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>제목</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <EmployeeAdd
            viewKey={viewKey}
            onChange={changeModalView}
            onSelect={onSelect}
          />
        </DialogBody>
        <DialogFooter></DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            modalChange();
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}
