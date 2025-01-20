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

export function EmployeeAddDialog({
  isModalOpen,
  viewKey,
  onChange,
  onSelect,
  modalChange,
}) {
  const changeModalAdd = () => {
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
            viewKey={-1}
            onChange={changeModalAdd}
            onSelect={onSelect}
          />
        </DialogBody>
        <DialogFooter></DialogFooter>
        <DialogCloseTrigger onClick={() => modalChange()} />
      </DialogContent>
    </DialogRoot>
  );
}
