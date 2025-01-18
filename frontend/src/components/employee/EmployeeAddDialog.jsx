import {
  DialogActionTrigger,
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
import React, { useEffect } from "react";

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

  // root에 화면을 띄우는 거구나
  return (
    <DialogRoot open={isModalOpen}>
      <DialogTrigger asChild>
        <Button variant={"outline"}> Open</Button>
      </DialogTrigger>
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
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
