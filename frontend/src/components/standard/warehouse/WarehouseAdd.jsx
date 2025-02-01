import React, { useEffect, useState } from "react";
import {
  DialogActionTrigger,
  DialogBody,
  DialogCloseTrigger,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { Button } from "../../ui/button.jsx";
import { Box, Input } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import Select from "react-select";

export function WarehouseAdd({ isOpen, onConfirm, onClose, title }) {
  const [warehouseName, setWarehouseName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [warehouseAddress, setWarehouseAddress] = useState("");
  const [warehouseAddressDetail, setWarehouseAddressDetail] = useState("");
  const [warehousePost, setWarehousePost] = useState("");
  const [warehouseState, setWarehouseState] = useState("");
  const [warehouseCity, setWarehouseCity] = useState("");
  const [customerEmployeeNo, setCustomerEmployeeNo] = useState("");
  const [warehouseTel, setWarehouseTel] = useState("");
  const [warehouseActive, setWarehouseActive] = useState(true);
  const [warehouseNote, setWarehouseNote] = useState("");
  const [customerList, setCustomerList] = useState([]);
  const [customerName, setCustomerName] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [employeeName, setEmployeeName] = useState("");
  const [employeeList, setEmployeeList] = useState([]);
  const initialWarehouseAdd = {
    warehouseName: "",
    customerEmployeeNo: "",
    customerName: "",
    customerCode: "",
    employeeName: "",
    warehouseTel: "",
    warehousePost: "",
    warehouseAddress: "",
    warehouseAddressDetail: "",
    warehouseNote: "",
  };
  const [warehouseAdd, setWarehouseAdd] = useState(initialWarehouseAdd);

  // 요청 창 닫히면 초기화
  const handleClose = () => {
    setWarehouseAdd(initialWarehouseAdd);
    onClose();
  };

  // 협력 업체 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/customer`).then((res) => {
      const customerOptions = res.data.map((customer) => ({
        value: customer.customerCode,
        label: customer.customerName,
      }));
      setCustomerList(customerOptions);
    });
  }, []);

  // 관리자 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/employee/${customerCode}`).then((res) => {
      const employeeOptions = res.data.map((employee) => ({
        value: employee.customerEmployeeNo,
        label: employee.employeeName,
      }));
      setEmployeeList(employeeOptions);
    });
  }, [customerCode]);

  const resetState = () => {
    setWarehouseName("");
    setCustomerCode("");
    setWarehouseAddress("");
    setWarehouseAddressDetail("");
    setWarehousePost("");
    setWarehouseState("");
    setWarehouseCity("");
    setCustomerEmployeeNo("");
    setWarehouseTel("");
    setWarehouseNote("");
    setWarehouseActive(true);
  };

  // 담당업체 변경 시 관리자 컬렉션 생성
  const handleCustomerChange = (selectedOption) => {
    setCustomerName(selectedOption.label);
    setCustomerCode(selectedOption.value);
    setSelectedCustomer(selectedOption);

    // 선택 즉시 warehouseAdd 업데이트
    setWarehouseAdd((prev) => ({
      ...prev,
      customerName: selectedOption.label,
      customerCode: selectedOption.value,
    }));
  };

  // 관리자 변경
  const handleEmployeeChange = (selectedOption) => {
    setEmployeeName(selectedOption.label);
    setCustomerEmployeeNo(selectedOption.value);
    setSelectedEmployee(selectedOption);

    // 선택 즉시 warehouseAdd 업데이트
    setWarehouseAdd((prev) => ({
      ...prev,
      employeeName: selectedOption.label,
      customerEmployeeNo: selectedOption.value,
    }));
  };

  // 협력 업체 클릭 시
  const onCustomerClick = () => {
    if (selectedCustomer) {
      setWarehouseAdd((prev) => ({
        ...prev,
        customerName: selectedCustomer.label,
        customerCode: selectedCustomer.value,
      }));
    }
  };

  const handleSaveClick = () => {
    axios
      .post(`/api/warehouse/add`, {
        warehouseName,
        customerCode,
        warehouseAddress,
        warehouseAddressDetail,
        warehousePost,
        warehouseState,
        warehouseCity,
        customerEmployeeNo,
        warehouseTel,
        warehouseActive,
        warehouseNote,
      })
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        handleClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
    resetState();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={onClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Box>
            <Field label="창고 이름" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={warehouseName}
                onChange={(e) => setWarehouseName(e.target.value)}
              />
            </Field>
            <Field label="담당 업체" orientation="horizontal" mb={15}>
              <Select
                options={customerList}
                value={customerList.find(
                  (opt) => opt.value === warehouseAdd.customerName,
                )}
                onChange={handleCustomerChange}
                placeholder="담당 업체 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "470px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "470px",
                  }),
                }}
              />
              <Button onClick={onCustomerClick}>조회</Button>
            </Field>
            <Field label="관리자" orientation="horizontal" mb={15}>
              <Select
                options={employeeList}
                value={employeeList.find(
                  (opt) => opt.value === warehouseAdd.employeeName,
                )}
                onChange={handleEmployeeChange}
                placeholder="관리자 선택"
                isSearchable
                styles={{
                  control: (base) => ({
                    ...base,
                    width: "538.5px", // 너비 고정
                    height: "40px",
                  }),
                  menu: (base) => ({
                    ...base,
                    zIndex: 100, // 선택 목록이 다른 요소를 덮도록
                    width: "538.5px",
                  }),
                }}
              />
            </Field>
            <Box display="flex" gap={4}>
              <Field label="전화번호" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={warehouseTel}
                  onChange={(e) => setWarehouseTel(e.target.value)}
                />
              </Field>
              <Field label="우편 번호" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={warehousePost}
                  onChange={(e) => setWarehousePost(e.target.value)}
                />
              </Field>
            </Box>
            <Box display="flex" gap={4}>
              <Field label="광역 시도" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={warehouseState}
                  onChange={(e) => setWarehouseState(e.target.value)}
                />
              </Field>
              <Field label="시군" orientation="horizontal" mb={15}>
                <Input
                  type={"text"}
                  value={warehouseCity}
                  onChange={(e) => setWarehouseCity(e.target.value)}
                />
              </Field>
            </Box>
            <Field label="주소" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={warehouseAddress}
                onChange={(e) => setWarehouseAddress(e.target.value)}
              />
            </Field>
            <Field label="상세 주소" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={warehouseAddressDetail}
                onChange={(e) => setWarehouseAddressDetail(e.target.value)}
              />
            </Field>
            {/*취급 물품<Input>{warehouseDetail.}</Input>*/}
            <Field label="비고" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={warehouseNote}
                onChange={(e) => setWarehouseNote(e.target.value)}
              />
            </Field>
            <Field label="사용 여부" orientation="horizontal" mb={15}>
              <Input
                type={"text"}
                value={warehouseActive}
                onChange={(e) => setWarehouseActive(e.target.value)}
              />
            </Field>
          </Box>
        </DialogBody>
        <DialogFooter>
          <DialogCloseTrigger onClick={onClose} />
          <DialogActionTrigger asChild>
            <Button variant="outline" onClick={handleClose}>
              취소
            </Button>
          </DialogActionTrigger>
          <Button
            variant="solid"
            onClick={() => {
              handleSaveClick();
              onConfirm();
            }}
          >
            저장
          </Button>
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}
