import React, { useState } from "react";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";
import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";
import { Flex, HStack, Input, Stack, Text } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";

export function SysCommonCodeAdd({ setAddCheck, addCheck }) {
  const [isOpen, setIsOpen] = useState(false);
  const [commonCode, setCommonCode] = useState("");
  const [commonCodeName, setCommonCodeName] = useState("");
  const [commonCodeNote, setCommonCodeNote] = useState("");

  function resetValue() {
    setCommonCode("");
    setCommonCodeName("");
    setCommonCodeNote("");
  }

  const handleCloseButton = () => {
    setIsOpen(false);
    resetValue();
  };

  const handleSaveClick = () => {
    if (commonCodeName.trim().length <= 5) {
      axios
        .post("/api/commonCode/system/add", {
          commonCode: commonCode,
          commonCodeName: commonCodeName,
          commonCodeNote: commonCodeNote,
        })
        .then((res) => res.data)
        .then((data) => {
          const message = data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
          setAddCheck(!addCheck);
          handleCloseButton();
        })
        .catch((e) => {
          const message = e.response.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
        });
    } else {
      toaster.create({
        type: "error",
        description: "3글자이상 5글자 이하로 입력해 주세요",
      });
    }
  };

  return (
    <DialogRoot open={isOpen} size={"md"}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>업무 공통코드 추가</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>업무 공통코드 추가</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack>
            <Text as="span" color="red.500">
              * 표시된 부분은 반드시 입력해 주세요
            </Text>
            <HStack>
              <Text>업무 공통코드</Text>
              <Text as="span" color="red.500">
                *
              </Text>
            </HStack>
            <Input
              value={commonCode}
              onChange={(e) => setCommonCode(e.target.value)}
              placeholder={"사용하게될 공통코드를 입력하세요. (최대 5글자)"}
            />
            <Flex gap={3}>
              <Stack w={"100%"}>
                <HStack>
                  <Text>업무 공통코드 이름</Text>
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </HStack>
                <Input
                  value={commonCodeName}
                  onChange={(e) => setCommonCodeName(e.target.value)}
                  placeholder={"필수 입력"}
                />
              </Stack>
            </Flex>
            <Field label={"비고"}>
              <Input
                value={commonCodeNote}
                onChange={(e) => setCommonCodeNote(e.target.value)}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleSaveClick}>저장</Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleCloseButton} />
      </DialogContent>
    </DialogRoot>
  );
}
