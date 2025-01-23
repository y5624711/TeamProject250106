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
import { HStack, Input, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import React, { useState } from "react";

export function DepartmentViewAndUpdateDialog({
  isOpen,
  onCancel,
  department,
  setDepartmentData,
  setAddCheck,
  addCheck,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [saveCheck, setSaveCheck] = useState(false);

  let disable = false;
  if (department !== null) {
    disable = !(
      department.departmentName.trim().length > 0 &&
      department.departmentName.trim().length > 0 &&
      department.departmentTel.trim().length > 0
    );
  }

  const handleUpdate = () => {
    axios
      .put("/api/department/update", {
        departmentKey: department.departmentKey,
        departmentName: department.departmentName,
        departmentTel: department.departmentTel,
        departmentActive: saveCheck,
        departmentFax: department.departmentFax,
        departmentNote: department.departmentNote,
      })
      .then((res) => res.data)
      .then((data) => {
        // console.log(departmentList);
        setAddCheck(!addCheck);
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        onCancel();
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

  console.log(saveCheck);

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
          <Stack gap={2}>
            <Checkbox
              size={"lg"}
              defaultChecked={department.departmentActive}
              onChange={(e) => {
                setSaveCheck(e.target.checked);
              }}
            >
              부서 사용여부
            </Checkbox>

            <Field label={"부서코드"} orientation="horizontal" mb={15}>
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

            <Field label={"부서명"} orientation="horizontal" mb={15}>
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

            <HStack gap={5}>
              <Field label={"대표전화"} orientation="horizontal" mb={15}>
                <Input
                  value={department.departmentTel || ""}
                  onChange={(e) =>
                    setDepartmentData((prev) => ({
                      ...prev,
                      departmentTel: e.target.value,
                    }))
                  }
                />
              </Field>
              <Field label={"팩스"} orientation="horizontal" mb={15}>
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
            </HStack>
            <Field label={"비고"} orientation="horizontal">
              <Textarea
                resize={"none"}
                value={department.departmentNote || ""}
                onChange={(e) => {
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentNote: e.target.value,
                  }));
                }}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          {department.departmentActive && (
            <>
              {
                <>
                  <Button variant="outline">취소</Button>
                  <Button disabled={disable} onClick={handleUpdate}>
                    확인
                  </Button>
                  {/*<DeleteDialog*/}
                  {/*  isOpenDelete={isOpenDelete}*/}
                  {/*  setIsOpenDelete={setIsOpenDelete}*/}
                  {/*  handleDeleteClick={handleDeleteClick}*/}
                  {/*/>*/}
                </>
              }
            </>
          )}
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            onCancel();
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}
