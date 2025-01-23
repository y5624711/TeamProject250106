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
    <DialogRoot open={isOpened} onOpenChange={onClosed} size="xl">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Box>{stocktakingKey} 입출 상세</Box>
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          {/* 재고실사 팝업창 내용 */}
          <StockTakingView stocktakingKey={stocktakingKey} />
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClosed} />
          <DialogActionTrigger>
            <Button onClick={onClosed}>확인</Button>
          </DialogActionTrigger>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default StocktakingDetail;
