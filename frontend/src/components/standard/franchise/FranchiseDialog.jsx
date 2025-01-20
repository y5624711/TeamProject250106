import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import React, { useEffect } from "react";
import { FranchiseView } from "./FranchiseView.jsx";
import { FranchiseAdd } from "./FranchiseAdd.jsx";

export function FranchiseDialog({
  isOpen,
  onClose,
  franchiseKey,
  isAddDialogOpen,
  onSave,
  onDelete,
}) {
  useEffect(() => {
    if (franchiseKey) {
    }
  }, [franchiseKey]);

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {isAddDialogOpen ? "가맹점 추가" : "가맹점 상세 정보"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          {isAddDialogOpen ? (
            <FranchiseAdd onClose={onClose} onSave={onSave} />
          ) : franchiseKey ? (
            <FranchiseView
              franchiseKey={franchiseKey}
              onClose={onClose}
              onSave={onSave}
              onDelete={onDelete}
            />
          ) : (
            "선택된 가맹점이 없습니다."
          )}
        </DialogBody>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
