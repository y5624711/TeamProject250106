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

  const formatPhoneNumber = (value) => {
    const regPhone = /^01([0|1|6|7|8|9])([0-9]{3,4})([0-9]{4})$/;
    // 숫자만 남기고, 11자리까지만 허용
    const onlyNums = value.replace(/\D/g, "").slice(0, 11);

    // 정규식에 맞춰 하이픈 추가
    if (onlyNums.length === 11) {
      return onlyNums.replace(regPhone, "01$1-$2-$3");
    } else if (onlyNums.length > 7) {
      return onlyNums.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
    } else if (onlyNums.length > 3) {
      return onlyNums.replace(/(\d{3})(\d{0,4})/, "$1-$2");
    }

    return onlyNums;
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
            <Field label={"부서명"} orientation="horizontal">
              <Input
                value={departmentName}
                onChange={(e) => setDepartmentName(e.target.value)}
                maxlength={10}
              />
            </Field>
            <Field label={"전화번호"} orientation="horizontal">
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
                onChange={(e) => setDepartmentFax(e.target.value)}
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
