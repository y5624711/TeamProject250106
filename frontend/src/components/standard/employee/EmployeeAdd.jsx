import {
  Box,
  createListCollection, Flex,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Button } from "../../ui/button.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import * as PropTypes from "prop-types";
import { SelectViewComp } from "./SelectViewComp.jsx";
import {Checkbox} from "../../ui/checkbox.jsx";

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
    employeeActive:false,
  });

  const frameworks = createListCollection({
    items: [
      { label: "협력업체", value: "CUS" },
      { label: "직원", value: "EMP" },
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
          employeeActive:res.data.employeeActive || false,
        });
      });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
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
        employeeActive:formData.employeeActive,
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

  const handleCancel = () => {
    setIsEditMode(false);
    fetchEmployeeData(); // 원래 데이터로 복원
  };

  const isCommonCodeSelectedCheck =
    viewKey === -1 && typeof formData.selectedCommonCode === "object";


    const isValid = formData.name.trim() > 0 && formData.name.length < 6 &&formData.selectedCommonCode&&formData.workPlace;




  
  return (
    <Box>
      <Stack spacing={15}>
        <Field orientation="horizontal" label={"소속 구분"}>
          <SelectRoot
            collection={frameworks}
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
              <SelectValueText placeholder={"소속을 선택 해주세요."} />
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
          <Field label={"소속 코드"}  orientation="horizontal">
            <Input
              name="workPlace"
              placeholder={"소속 코드 / 소속 명"}
              value={formData.workPlace}
              onChange={handleInputChange}
              readOnly={viewKey !== -1}
            />
          </Field>
        )}
        <Field label={"직원"}  orientation="horizontal">
          <Input
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            readOnly={viewKey !== -1 }
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
          <Input
            name="tel"
            placeholder={"전화번호"}
            value={formData.tel}
            onChange={handleInputChange}

          />
        </Field>
        <Field label={"비고"} orientation="horizontal">
          <Input
            name="note"
            placeholder={"최대 50 글자"}
            value={formData.note}
            onChange={handleInputChange}

          />
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
      </Stack>



      <Box display="flex" mt={4} justifyContent="flex-end" width="100%">
        {viewKey !== -1 &&  (
          <Button onClick={handleCancel} mr={2} variant="outline">
            취소
          </Button>
        )}

        <Button onClick={handleSubmit} disabled={isValid}>
          {viewKey === -1 ? "회원 등록" : "저장" }
        </Button>


        {/*{viewKey !== -1 && (*/}
        {/*  <Button onClick={handleDelete} ml={2}>*/}
        {/*    회원 삭제*/}
        {/*  </Button>*/}
        {/*)}*/}
      </Box>
    </Box>
  );
}
