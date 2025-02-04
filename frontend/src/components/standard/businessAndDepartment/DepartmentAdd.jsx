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
import { Input, Stack, Textarea } from "@chakra-ui/react";
import React, { useState } from "react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function DepartmentAdd({ saved, isOpen, setIsOpen, onCancel }) {
  const [departmentName, setDepartmentName] = useState("");
  const [departmentTel, setDepartmentTel] = useState("");
  const [departmentFax, setDepartmentFax] = useState("");
  const [departmentNote, setDepartmentNote] = useState("");

  let disable =
    departmentName.trim().length > 0 && departmentTel.trim().length > 0;

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

  function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ""); // 숫자만 남기기

    // 02 지역번호 (서울)
    if (value.startsWith("02")) {
      return value.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 12);
    }
    // 휴대폰 및 일반 지역번호 (3자리 지역번호 포함)
    return value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 13);
  }

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
        saved();
        resetValue();
      })
      .catch((e) => {
        console.log("호출됨");
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
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
          <DialogTitle>부서 등록</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={5}>
            <Field label={"부서명"} orientation="horizontal" required>
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                maxlength={10}
              />
            </Field>
            <Field label={"전화번호"} orientation="horizontal" required>
              <Input
                value={departmentTel}
                onChange={(e) =>
                  setDepartmentTel(formatPhoneNumber(e.target.value))
                }
                maxlength={13}
              />
            </Field>
            <Field label={"팩스"} orientation="horizontal">
              <Input
                value={departmentFax}
                onChange={(e) =>
                  setDepartmentFax(formatPhoneNumber(e.target.value))
                }
                maxlength={15}
              />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Textarea
                value={departmentNote}
                onChange={(e) => setDepartmentNote(e.target.value)}
                placeholder={"최대 50자"}
                maxlength={50}
                style={{ maxHeight: "100px", overflowY: "auto" }}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={handleCloseButton}>
            취소
          </Button>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={500}
            closeDelay={100}
            disabled={disable}
          >
            <Button onClick={handleSaveDepartment} disabled={!disable}>
              등록
            </Button>
          </Tooltip>
        </DialogFooter>
        <DialogCloseTrigger onClick={handleCloseButton} />
      </DialogContent>
    </DialogRoot>
  );
}
