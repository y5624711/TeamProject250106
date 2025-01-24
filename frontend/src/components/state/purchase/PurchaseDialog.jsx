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

  useEffect(() => {
    // 구매 신청 상태를 열 때마다 확인
    console.log("다이얼로그 열림 상태가 변경됨:", isOpen);
  }, [isOpen]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size={"lg"}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAddDialogOpen ? "구매 신청" : "구매 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {isAddDialogOpen ? (
            <PurchaseRequest onClose={onClose} />
          ) : purchaseRequestKey ? (
            <PurchaseApprove
              purchaseRequestKey={purchaseRequestKey}
              onClose={onClose}
            /> // 구매 승인 컴포넌트 렌더링
          ) : (
            "구매 신청이 없습니다."
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
