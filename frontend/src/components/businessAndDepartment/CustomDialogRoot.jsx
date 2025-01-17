import {
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../ui/dialog.jsx";
import { Button } from "../ui/button.jsx";
import { CustomInput } from "./CustomInput.jsx";
import { Field } from "../ui/field.jsx";
import { HStack, Stack, Textarea } from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";

export function CustomDialogRoot({
  isOpen,
  setIsOpen,
  department,
  setDepartmentData,
  isEditing,
  setIsEditing,
  toggleEditing,
  handleUpdateClick,
}) {
  const isValid = () => {
    console.log(department);
    return (
      department.businessCode?.trim() &&
      department.businessName?.trim() &&
      department.businessTel?.trim()
    );
  };

  const handleUpdate = () => {
    console.log(department);
    handleUpdateClick();
  };

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
              onChange={(e) =>
                setDepartmentData((prev) => ({
                  ...prev,
                  departmentActive: e.target.checked, // e.target.checked로 상태 읽기
                }))
              }
              readOnly={!isEditing}
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
                  readOnly={true}
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
          <Button onClick={handleUpdate}>저장</Button>
          <Button onClick={toggleEditing}>수정</Button>
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
