import React from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Box } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import StockTakingView from "./StockTakingView.jsx";

function StocktakingDetail({ stocktakingKey, isOpened, onClosed }) {
  return (
    <DialogRoot open={isOpened} onOpenChange={onClosed} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>실사 상세</Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          {/* 재고실사 팝업창 내용 */}
          <StockTakingView stocktakingKey={stocktakingKey} />
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
          <DialogActionTrigger>
            <Button variant="outline" onClick={onClosed}>
              닫기
            </Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default StocktakingDetail;
