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
import { Button } from "../ui/button.jsx";
import { Text } from "@chakra-ui/react";
import React from "react";

export function DeleteDialog({
  isOpenDelete,
  setIsOpenDelete,
  handleDeleteClick,
}) {
  return (
    <DialogRoot open={isOpenDelete}>
      <DialogTrigger asChild>
        <Button colorPalette={"red"} onClick={() => setIsOpenDelete(true)}>
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>삭제 하시겠습니까?</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpenDelete(false)}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button colorPalette={"red"} onClick={handleDeleteClick}>
            삭제
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={() => setIsOpenDelete(false)} />
      </DialogContent>
    </DialogRoot>
  );
}
