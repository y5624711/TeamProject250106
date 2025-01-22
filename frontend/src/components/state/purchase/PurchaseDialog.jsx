import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import React, { useEffect } from "react";
import { PurchaseRequest } from "./PurchaseRequest.jsx";

export function PurchaseDialog({ isOpen, onClose, onSave }) {
  useEffect(() => {}, [isOpen]);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(open) => {
        if (open && !open.open) {
          onClose();
        }
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>구매 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <PurchaseRequest onClose={onClose} onSave={onSave} />
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
