import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import { Button } from "@chakra-ui/react";
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

  // root에 화면을 띄우는 거구나
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
