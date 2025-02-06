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
import { Input, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import React from "react";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

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

  function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ""); // 숫자만 남기기

    // 02 지역번호 (서울)
    if (value.startsWith("02")) {
      return value.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 12);
    }
    // 휴대폰 및 일반 지역번호 (3자리 지역번호 포함)
    return value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 13);
  }

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
          <DialogTitle>부서 정보</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          css={{ "--field-label-width": "85px" }}
        >
          <Field label={<SpacedLabel text="부서" />} orientation="horizontal">
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

          <Field
            label={<SpacedLabel text="부서코드" />}
            orientation="horizontal"
          >
            <Input
              value={department.departmentCode || ""}
              variant={"subtle"}
              onChange={(e) =>
                setDepartmentData((prev) => ({
                  ...prev,
                  departmentCode: e.target.value,
                }))
              }
              readOnly
            />
          </Field>

          <Field
            label={<SpacedLabel text="전화번호" />}
            orientation="horizontal"
          >
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
          <Field label={<SpacedLabel text="팩스" />} orientation="horizontal">
            <Input
              value={department.departmentFax || ""}
              onChange={(e) =>
                setDepartmentData((prev) => ({
                  ...prev,
                  departmentFax: formatPhoneNumber(e.target.value),
                }))
              }
            />
          </Field>
          <Field label={<SpacedLabel text="비고" />} orientation="horizontal">
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

          <Field
            label={<SpacedLabel text="사용여부" />}
            orientation="horizontal"
          >
            <Checkbox
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
