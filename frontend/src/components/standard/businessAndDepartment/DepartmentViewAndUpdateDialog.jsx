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
import { Checkbox } from "../../ui/checkbox.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import React from "react";
import { Tooltip } from "../../ui/tooltip.jsx";

export function DepartmentViewAndUpdateDialog({
  isOpen,
  onCancel,
  department,
  setDepartmentData,
  setAddCheck,
  addCheck,
  isAdmin,
}) {
  let disable = false;
  if (department !== null) {
    disable = !(
      department.departmentName.trim().length > 0 &&
      department.departmentName.trim().length > 0 &&
      department.departmentTel.trim().length > 0
    );
  }

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

  const handleUpdate = () => {
    axios
      .put("/api/department/update", {
        departmentKey: department.departmentKey,
        departmentCode: department.departmentCode,
        departmentName: department.departmentName,
        departmentTel: department.departmentTel,
        departmentActive: department.departmentActive,
        departmentFax: department.departmentFax,
        departmentNote: department.departmentNote,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        // 리스트 새로고침
        setAddCheck(!addCheck);

        // 다이얼로그를 닫지 않음 (onCancel 호출 안 함)
      })
      .catch((e) => {
        const message = e.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  if (!department) {
    return;
  }

  return (
    <DialogRoot
      size={"lg"}
      open={isOpen}
      onOpenChange={() => {
        onCancel();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>부서 상세 정보</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={5}>
            <Field label={"부서명"} orientation="horizontal">
              <Input
                value={department.departmentName || ""}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentName: e.target.value,
                  }))
                }
              />
            </Field>

            <Field label={"부서코드"} orientation="horizontal">
              <Input
                value={department.departmentCode || ""}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentCode: e.target.value,
                  }))
                }
                readOnly
              />
            </Field>

            <Field label={"대표전화"} orientation="horizontal">
              <Input
                value={department.departmentTel || ""}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentTel: formatPhoneNumber(e.target.value),
                  }))
                }
              />
            </Field>
            <Field label={"팩스"} orientation="horizontal">
              <Input
                value={department.departmentFax || ""}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentFax: e.target.value,
                  }))
                }
              />
            </Field>
            <Field label={"비고"} orientation="horizontal">
              <Textarea
                placeholder={"최대 50자"}
                style={{ maxHeight: "100px", overflowY: "auto" }}
                maxLength={50}
                value={department.departmentNote || ""}
                onChange={(e) => {
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentNote: e.target.value,
                  }));
                }}
              />
            </Field>

            <Field label={"사용여부"} orientation="horizontal">
              <Checkbox
                size={"lg"}
                style={{ marginRight: "550px" }}
                defaultChecked={department.departmentActive}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentActive: e.target.checked,
                  }))
                }
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          <Button variant="outline" onClick={() => onCancel()}>
            취소
          </Button>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={500}
            closeDelay={100}
            disabled={!disable}
          >
            {isAdmin && (
              <Button disabled={disable} onClick={handleUpdate}>
                확인
              </Button>
            )}
          </Tooltip>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
