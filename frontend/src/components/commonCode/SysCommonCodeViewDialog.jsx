import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog.jsx";
import { HStack, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import { Field } from "../ui/field.jsx";
import { CustomInput } from "../businessAndDepartment/CustomInput.jsx";
import { Button } from "../ui/button.jsx";
import React from "react";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";

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
  const handleUpdate = () => {
    axios
      .put("/api/commonCode/system/updateSys", {
        commonCodeKey: sysCommonCode.commonCodeKey,
        commonCode: sysCommonCode.commonCode,
        commonCodeName: sysCommonCode.commonCodeName,
        commonCodeActive: sysCommonCode.commonCodeActive,
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
              onChange={(e) =>
                setSysCommonCode((prev) => ({
                  ...prev,
                  commonCodeActive: e.target.checked,
                }))
              }
              readOnly={!isEditing}
            >
              코드 사용여부
            </Checkbox>
            <HStack>
              <Field label={"부서코드"}>
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

            <Field label={"부서명"}>
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
          {isEditing && (
            <Button disabled={disable} onClick={handleUpdate}>
              저장
            </Button>
          )}
          {!isEditing && <Button onClick={toggleEditing}>수정</Button>}
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
