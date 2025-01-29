import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import React from "react";
import { PurchaseRequest } from "./PurchaseRequest.jsx";
import { PurchaseApprove } from "./PurchaseApprove.jsx";

export function PurchaseDialog({
  isOpen,
  onClose,
  onSave,
  isAddDialogOpen,
  purchaseRequestKey,
}) {
  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAddDialogOpen
              ? "구매 신청"
              : purchaseRequestKey
                ? "구매 승인 상세"
                : "구매 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {isAddDialogOpen ? (
            <PurchaseRequest onSave={onSave} onClose={onClose} />
          ) : purchaseRequestKey ? (
            <PurchaseApprove
              purchaseRequestKey={purchaseRequestKey}
              onClose={onClose}
            />
          ) : (
            "구매 신청이 없습니다."
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
