import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog.jsx";
import { HStack, Stack, Text, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import { Field } from "../ui/field.jsx";
import { CustomInput } from "../businessAndDepartment/CustomInput.jsx";
import { Button } from "../ui/button.jsx";
import React, { useState } from "react";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";

function SysCommonCodeDelete({
  isOpenDelete,
  setIsOpenDelete,
  handleDeleteClick,
}) {
  return (
    <DialogRoot open={isOpenDelete}>
      <DialogTrigger asChild>
        <Button colorPalette={"red"} onClick={() => setIsOpenDelete(true)}>
          삭제
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>삭제 요청</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Text>이 코드를 삭제 하시겠습니까?</Text>
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={() => setIsOpenDelete(false)}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button colorPalette={"red"} onClick={handleDeleteClick}>
            삭제
          </Button>
        </DialogFooter>
        <DialogCloseTrigger onClick={() => setIsOpenDelete(false)} />
      </DialogContent>
    </DialogRoot>
  );
}

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
        setIsOpenDelete(false);
        setAddCheck(!addCheck);
      });
  }

  function handleReUseButton() {
    axios
      .put("/api/commonCode/system/reUseSys", {
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
          {sysCommonCode.commonCodeActive ? (
            <SysCommonCodeDelete
              sysCommonCode={sysCommonCode}
              isOpenDelete={isOpenDelete}
              setIsOpenDelete={setIsOpenDelete}
              handleDeleteClick={handleDeleteClick}
            />
          ) : (
            <Button colorPalette={"green"} onClick={handleReUseButton}>
              재사용
            </Button>
          )}

          {isEditing && (
            <Button
              disabled={disable}
              colorPalette={"blue"}
              onClick={handleUpdate}
            >
              저장
            </Button>
          )}
          {!isEditing && <Button onClick={toggleEditing}>정보수정</Button>}
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
