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
import { CustomInput } from "./CustomInput.jsx";
import { Field } from "../../ui/field.jsx";
import { HStack, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import React, { useState } from "react";
import { DeleteDialog } from "../commonCode/DeleteDialog.jsx";

export function DepartmentViewAndUpdateDialog({
  isOpen,
  setIsOpen,
  department,
  setDepartmentData,
  isEditing,
  setIsEditing,
  toggleEditing,
  setAddCheck,
  addCheck,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

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
        departmentFax: department.departmentFax,
        departmentNot: department.departmentNote,
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
        setIsEditing(false);
        setIsOpen(false);
      })
      .catch((e) => {
        const message = e.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  function handleDeleteClick() {
    axios
      .put("/api/department/delete", {
        departmentKey: department.departmentKey,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setIsOpen(false);
        setIsEditing(false);
        setIsOpenDelete(false);
        setAddCheck(!addCheck);
      });
  }

  if (!department) {
    return;
  }

  return (
    <DialogRoot size={"lg"} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>부서 상세 정보</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
            <Checkbox
              size={"lg"}
              defaultChecked={department.departmentActive}
              readOnly
            >
              부서 사용여부
            </Checkbox>
            <HStack>
              <Field label={"부서코드"}>
                <CustomInput
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
            </HStack>

            <Field label={"부서명"}>
              <CustomInput
                value={department.departmentName || ""}
                onChange={(e) =>
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentName: e.target.value,
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>

            <HStack>
              <Field label={"대표전화"}>
                <CustomInput
                  value={department.departmentTel || ""}
                  onChange={(e) =>
                    setDepartmentData((prev) => ({
                      ...prev,
                      departmentTel: e.target.value,
                    }))
                  }
                  readOnly={!isEditing}
                />
              </Field>
              <Field label={"팩스"}>
                <CustomInput
                  value={department.departmentFax || ""}
                  onChange={(e) =>
                    setDepartmentData((prev) => ({
                      ...prev,
                      departmentFax: e.target.value,
                    }))
                  }
                  readOnly={!isEditing}
                />
              </Field>
            </HStack>
            <Field label={"비고"}>
              <Textarea
                resize={"none"}
                value={department.departmentNote || ""}
                onChange={(e) => {
                  setDepartmentData((prev) => ({
                    ...prev,
                    departmentNote: e.target.value,
                  }));
                }}
                readOnly={!isEditing}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          {isEditing && department.departmentActive && (
            <>
              {
                <>
                  <DeleteDialog
                    isOpenDelete={isOpenDelete}
                    setIsOpenDelete={setIsOpenDelete}
                    handleDeleteClick={handleDeleteClick}
                  />
                  <Button disabled={disable} onClick={handleUpdate}>
                    저장
                  </Button>
                </>
              }
            </>
          )}
          {!isEditing && department.departmentActive && (
            <Button onClick={toggleEditing}>수정</Button>
          )}
        </DialogFooter>
        <DialogCloseTrigger
          onClick={() => {
            setIsOpen(false);
            setIsEditing(false);
          }}
        />
      </DialogContent>
    </DialogRoot>
  );
}
