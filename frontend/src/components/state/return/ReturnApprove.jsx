import React from "react";
import {
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";

function ReturnApprove({ isOpen, onClose }) {
  return (
    <DialogRoot open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>반품 요청</DialogTitle>
        </DialogHeader>
        <DialogBody></DialogBody>
        <DialogFooter>
          <Button onClick={onClose}>취소</Button>
          <Button>승인</Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnApprove;
