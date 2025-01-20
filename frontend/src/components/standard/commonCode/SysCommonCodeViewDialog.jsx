import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { HStack, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import { Field } from "../../ui/field.jsx";
import { CustomInput } from "../businessAndDepartment/CustomInput.jsx";
import { Button } from "../../ui/button.jsx";
import React, { useState } from "react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { DeleteDialog } from "./DeleteDialog.jsx";

export function SysCommonCodeViewDialog({
  isOpen,
  setIsOpen,
  sysCommonCode,
  setSysCommonCode,
  isEditing,
  setIsEditing,
  toggleEditing,
  addCheck,
  setAddCheck,
}) {
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const handleUpdate = () => {
    axios
      .put("/api/commonCode/system/updateSys", {
        commonCodeKey: sysCommonCode.commonCodeKey,
        commonCode: sysCommonCode.commonCode,
        commonCodeName: sysCommonCode.commonCodeName,
        commonCodeNote: sysCommonCode.commonCodeNote,
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(sysCommonCode);
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setAddCheck(!addCheck);
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
      .put("/api/commonCode/system/deleteSys", {
        commonCodeKey: sysCommonCode.commonCodeKey,
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

  let disable = false;
  if (sysCommonCode !== null) {
    disable = !(
      sysCommonCode.commonCode.trim().length > 0 &&
      sysCommonCode.commonCodeName.trim().length > 0
    );
  }

  if (!sysCommonCode) {
    return;
  }

  return (
    <DialogRoot size={"lg"} open={isOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>업무공통코드 상세정보</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={2}>
            <Checkbox
              size={"lg"}
              defaultChecked={sysCommonCode.commonCodeActive}
              readOnly
            >
              코드 사용여부
            </Checkbox>
            <HStack>
              <Field label={"공통코드"}>
                <CustomInput
                  value={sysCommonCode.commonCode || ""}
                  onChange={(e) =>
                    setSysCommonCode((prev) => ({
                      ...prev,
                      commonCode: e.target.value,
                    }))
                  }
                  readOnly={!isEditing}
                />
              </Field>
            </HStack>

            <Field label={"코드명"}>
              <CustomInput
                value={sysCommonCode.commonCodeName || ""}
                onChange={(e) =>
                  setSysCommonCode((prev) => ({
                    ...prev,
                    commonCodeName: e.target.value,
                  }))
                }
                readOnly={!isEditing}
              />
            </Field>

            <Field label={"비고"}>
              <Textarea
                resize={"none"}
                value={sysCommonCode.commonCodeNote || ""}
                onChange={(e) => {
                  setSysCommonCode((prev) => ({
                    ...prev,
                    commonCodeNote: e.target.value,
                  }));
                }}
                readOnly={!isEditing}
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          {isEditing && sysCommonCode.commonCodeActive && (
            <>
              {
                <>
                  <DeleteDialog
                    isOpenDelete={isOpenDelete}
                    setIsOpenDelete={setIsOpenDelete}
                    handleDeleteClick={handleDeleteClick}
                  />
                  <Button
                    disabled={disable}
                    colorPalette={"blue"}
                    onClick={handleUpdate}
                  >
                    저장
                  </Button>
                </>
              }
            </>
          )}
          {!isEditing && sysCommonCode.commonCodeActive && (
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
