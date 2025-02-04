import {
  Box,
  createListCollection,
  Flex,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import { SelectViewComp } from "./SelectViewComp.jsx";
import { Checkbox } from "../../ui/checkbox.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function EmployeeAdd({ viewKey, onChange, onSelect }) {
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    employeeNo: "",
    password: "",
    selectedCommonCode: "",
    name: "",
    tel: "",
    note: "",
    workPlace: "",
    departMent: "",
    employeeActive: false,
  });

  const frameworks = createListCollection({
    items: [
      { label: "협력업체", value: "CUS" },
      { label: "본사직원", value: "EMP" },
    ],
  });

  // 공통 코드 조회
  useEffect(() => {
    getCommonCode();
  }, []);

  const getCommonCode = () => {
    axios.get("api/commonCode/list").then((res) => {});
  };

  // 상세 정보 조회
  useEffect(() => {
    if (viewKey !== -1) {
      fetchEmployeeData();
      setIsEditMode(false);
    }
  }, [viewKey]);

  const fetchEmployeeData = () => {
    axios
      .get("api/employee/view", {
        params: { viewKey },
      })
      .then((res) => {
        setFormData({
          employeeNo: res.data.employeeNo || "",
          selectedCommonCode: res.data.employeeCommonCode || "",
          password: res.data.employeePassword || "",
          tel: res.data.employeeTel || "",
          workPlace: res.data.employeeWorkPlaceCode || "",
          note: res.data.employeeNote || "",
          name: res.data.employeeName || "",
          employeeActive: res.data.employeeActive || false,
          departMent: res.data.departmentName,
        });
      });
  };

  const handleInputChange = (e) => {
    var { name, value } = e.target;

    if (name === "tel") {
      value = formatPhoneNumber(value);
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      selectedCommonCode: value,
    }));
    console.log("formData", formData);
  };
  const handleWorkPlaceChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      workPlace: value,
    }));
  };

  const formDataClear = () => {
    setFormData({
      employeeNo: "",
      password: "",
      selectedCommonCode: "",
      name: "",
      tel: "",
      note: "",
      workPlace: "",
      department: "",
    });
  };

  const handleSubmit = () => {
    // 수정일 때
    if (viewKey !== -1) {
      if (!isEditMode) {
        setIsEditMode(true);
        return;
      }

      const data = {
        employeeKey: viewKey,
        employeeCommonCode: formData.selectedCommonCode,
        employeeWorkPlaceCode: formData.workPlace,
        employeeNo: formData.employeeNo,
        employeeName: formData.name,
        employeeTel: formData.tel,
        employeeNote: formData.note,
        employeeDepartment: formData.department,
        employeePassword: formData.password,
        employeeActive: formData.employeeActive,
      };

      axios
        .put("/api/employee/update", data)
        .then((res) => {
          toaster.create({
            type: res.data.message.type,
            description: res.data.message.text,
          });
          setIsEditMode(false);
          onChange();
        })
        .catch((error) => {
          console.error("수정 중 오류 발생:", error);
          toaster.create({
            type: error.response.data.message.type,
            description: error.response.data.message.text,
          });
        });
    } else {
      // 등록일 때
      const data = {
        employeeCommonCode: formData.selectedCommonCode.value.join(""),
        employeeWorkPlaceCode: formData.workPlace.value?.[0],
        employeeName: formData.name,
        employeeTel: formData.tel,
        employeeNote: formData.note,
        employeeDepartment: formData.department,
        employeeNo: "",
      };

      axios
        .post("/api/employee/add", data)
        .then((res) => {
          formDataClear();
          toaster.create({
            type: res.data.message.type,
            description: res.data.message.text,
          });
          onChange();
        })
        .catch((error) => {
          console.error("등록 중 오류 발생:", error);
          toaster.create({
            type: error.response.data.message.type,
            description: error.response.data.message.text,
          });
        });
    }
  };

  const handleDelete = () => {
    axios
      .put("api/employee/delete", { employeeKey: viewKey })
      .then((res) => {
        formDataClear();
        toaster.create({
          type: res.data.message.type,
          description: res.data.message.text,
        });
        onChange();
      })
      .catch((error) => {
        console.error("삭제 실패:", error);
        toaster.create({
          type: error.response.data.message.type,
          description: error.response.data.message.text,
        });
      });
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

  const isCommonCodeSelectedCheck =
    viewKey === -1 && typeof formData.selectedCommonCode === "object";

  const isValid =
    formData.name.trim().length > 0 && // 공백만 있는 경우 방지
    formData.name.length < 6 && // 이름 길이 제한
    !!formData.selectedCommonCode && // 존재 여부 확인 (불리언 변환)
    !!formData.workPlace; // 존재 여부 확인 (불리언 변환)

  return (
    <Stack gap={15}>
      <Field
        orientation="horizontal"
        label={"소속 구분"}
        required={viewKey !== -1 ? false : true}
      >
        <SelectRoot
          collection={frameworks}
          variant={viewKey !== -1 ? "subtle" : "outline"}
          value={
            viewKey !== -1
              ? [formData.selectedCommonCode]
              : formData.selectedCommonCode
          }
          onValueChange={handleSelectChange}
          readOnly={viewKey !== -1}
          position="relative"
        >
          <SelectTrigger>
            <SelectValueText placeholder={"소속을 선택해 주세요."} />
          </SelectTrigger>
          <SelectContent
            style={{
              width: "100%",
              top: "40px",
              position: "absolute",
            }}
          >
            {frameworks.items.map((code) => (
              <SelectItem item={code} key={code.value}>
                {code.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>
      {isCommonCodeSelectedCheck && (
        <SelectViewComp
          formData={formData}
          handleSelectChange={handleWorkPlaceChange}
        />
      )}
      {viewKey !== -1 && (
        <HStack>
          {formData.selectedCommonCode === "EMP" && (
            <Field label={"부서"} orientation="horizontal">
              <Input
                name="workPlace"
                placeholder={""}
                value={formData.departMent}
                onChange={handleInputChange}
                readOnly={viewKey !== -1}
              />
            </Field>
          )}

          <Field label={"소속 코드"} orientation="horizontal">
            <Input
              name="workPlace"
              placeholder={""}
              value={formData.workPlace}
              onChange={handleInputChange}
              readOnly={viewKey !== -1}
            />
          </Field>
        </HStack>
      )}
      <Field
        label={"직원"}
        orientation="horizontal"
        required={viewKey !== -1 ? false : true}
      >
        <Input
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          readOnly={viewKey !== -1}
        />
      </Field>
      {viewKey !== -1 && (
        <Field label={"사번"} orientation="horizontal">
          <Input
            name="employeeNo"
            placeholder={"사번"}
            value={formData.employeeNo}
            onChange={handleInputChange}
            readOnly={viewKey !== -1}
          />
        </Field>
      )}
      <Field label={"전화 번호"} orientation="horizontal">
        <Input name="tel" value={formData.tel} onChange={handleInputChange} />
      </Field>

      {viewKey !== -1 && (
        <Field label={"비밀번호"} orientation="horizontal">
          <Input
            name="password"
            placeholder={"비밀번호"}
            value={formData.password}
            onChange={handleInputChange}
          />
        </Field>
      )}
      <Field label={"비고"} orientation="horizontal">
        <Textarea
          name="note"
          style={{ maxHeight: "100px", overflowY: "auto" }}
          placeholder={viewKey === -1 ? "최대 50 글자" : ""}
          value={formData.note}
          onChange={handleInputChange}
        />
      </Field>
      {viewKey !== -1 && (
        <Field label={"사용 여부"} orientation="horizontal">
          <Box ml={"86px"} style={{ position: "absolute" }}>
            <Checkbox
              name="employeeActive"
              checked={formData.employeeActive}
              onCheckedChange={(e) =>
                setFormData((prevItem) => ({
                  ...prevItem,
                  employeeActive: e.checked,
                }))
              }
            />
          </Box>
        </Field>
      )}

      <Box display="flex" mt={4} justifyContent="flex-end" width="100%">
        <Button onClick={onChange} mr={2} variant="outline">
          취소
        </Button>

        <Tooltip
          content="입력을 완료해주세요."
          disabled={isValid}
          openDelay={100}
          closeDelay={100}
        >
          <Button onClick={handleSubmit} disabled={!isValid}>
            {viewKey === -1 ? "회원 등록" : "저장"}
          </Button>
        </Tooltip>
      </Box>
    </Stack>
  );
}
