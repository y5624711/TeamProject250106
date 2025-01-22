import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { Field } from "../../ui/field.jsx";
import { Flex, HStack, Input, Stack, Text, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

export function DepartmentAdd({ saved, isOpen, setIsOpen, onCancel }) {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentTel, setDepartmentTel] = useState("");
  const [departmentFax, setDepartmentFax] = useState("");
  const [departmentNote, setDepartmentNote] = useState("");

  function resetValue() {
    setDepartmentName("");
    setDepartmentTel("");
    setDepartmentFax("");
    setDepartmentNote("");
  }

  const handleCloseButton = () => {
    onCancel();
    resetValue();
  };

  function handleSaveDepartment() {
    axios
      .post("/api/department/add", {
        departmentName,
        departmentTel,
        departmentFax,
        departmentNote,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        onCancel();
        resetValue();
      })
      .catch((e) => {
        console.log("호출됨");
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        saved();
      });
  }

  return (
    <DialogRoot
      open={isOpen}
      size={"lg"}
      onOpenChange={() => {
        onCancel();
        resetValue();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>부서 추가</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack>
            <Text as="span" color="red.500">
              * 표시된 부분은 반드시 입력해 주세요
            </Text>
            <HStack>
              <Text>부서명</Text>
              <Text as="span" color="red.500">
                *
              </Text>
            </HStack>
            <Input
              value={departmentName}
              onChange={(e) => setDepartmentName(e.target.value)}
              placeholder={"필수 입력"}
            />
            <Flex gap={3}>
              <Stack w={"100%"}>
                <HStack>
                  <Text>대표전화</Text>
                  <Text as="span" color="red.500">
                    *
                  </Text>
                </HStack>
                <Input
                  value={departmentTel}
                  onChange={(e) => setDepartmentTel(e.target.value)}
                  placeholder={"필수 입력"}
                />
              </Stack>

              <Field label={"팩스"}>
                <Input
                  value={departmentFax}
                  onChange={(e) => setDepartmentFax(e.target.value)}
                />
              </Field>
            </Flex>
            <Field label={"비고"}>
              <Textarea
                value={departmentNote}
                onChange={(e) => setDepartmentNote(e.target.value)}
                resize={"none"}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button onClick={handleSaveDepartment}>저장</Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleCloseButton} />
      </DialogContent>
    </DialogRoot>
  );
}
