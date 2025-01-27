import { Box, Input } from "@chakra-ui/react";
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
  DialogTrigger,
} from "../../components/ui/dialog.jsx";
import { Button } from "../../components/ui/button.jsx";

export function OpenPasswordChangeDialog({ employee, setEmployee }) {
  return (
    <Box>
      <DialogRoot>
        <DialogTrigger asChild>
          <Button variant="outline">비밀번호 변경</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>비밀번호 변경</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Input />
          </DialogBody>
          <DialogFooter>
            <DialogActionTrigger asChild>
              <Button variant="outline">Cancel</Button>
            </DialogActionTrigger>
            <Button>Save</Button>
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
