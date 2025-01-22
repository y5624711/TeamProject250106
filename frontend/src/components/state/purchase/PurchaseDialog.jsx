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
import { PurchaseApprove } from "./PurchaseApprove.jsx";

export function PurchaseDialog({
  isOpen,
  onClose,
  isAddDialogOpen,
  purchaseRequestKey,
}) {
  useEffect(() => {
    console.log("PurchaseDialog 열림 상태:", isOpen);
  }, [isOpen]);

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
          <DialogTitle>
            {isAddDialogOpen ? "구매 요청" : "구매 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          {isAddDialogOpen ? (
            <PurchaseRequest onClose={onClose} /> // 구매 요청 컴포넌트 렌더링
          ) : purchaseRequestKey ? (
            <PurchaseApprove
              purchaseRequestKey={purchaseRequestKey}
              onClose={onClose}
            /> // 구매 승인 컴포넌트 렌더링
          ) : (
            "구매 요청이 없습니다."
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
