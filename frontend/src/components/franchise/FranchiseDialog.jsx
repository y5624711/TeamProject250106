import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog.jsx";
import React, { useEffect } from "react";
import { FranchiseView } from "./FranchiseView.jsx";

export function FranchiseDialog({ isOpen, onClose, franchiseKey }) {
  useEffect(() => {
    if (franchiseKey) {
    }
  }, [franchiseKey]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>가맹점 상세 정보</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {franchiseKey ? (
            <FranchiseView franchiseKey={franchiseKey} />
          ) : (
            "선택된 가맹점이 없습니다."
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
