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
import React from "react";

export function EmployeeAddDialog({ isModalOpen }) {
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
            viewKey={selectedEmployeeNo}
            onChange={handleAddCheck}
            onSelect={handleSelectedNo}
          />
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button> 취소</Button>
          </DialogActionTrigger>
          <Button>save</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
