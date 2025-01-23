import React, { useContext, useEffect, useState } from "react";
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
import {
  Box,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";

export function InstallApprove({ installKey, isOpen, onClose }) {
  const { id, name } = useContext(AuthenticationContext);
  const initialInstallApprove = {
    installScheduleDate: "",
    customerInstallerNo: "",
    customerInstallerName: "",
    installApproveNote: "",
  };
  const [installApprove, setInstallApprove] = useState(initialInstallApprove);
  const [installRequest, setInstallRequest] = useState({});
  const [customerEmployeeList, setCustomerEmployeeList] = useState([]);

  // 설치 요청에 대한 정보 가져오기
  useEffect(() => {
    if (installKey) {
      axios
        .get(`/api/install/request/${installKey}`)
        .then((res) => {
          setInstallRequest(res.data[0] || []);
        })
        .catch((error) => {
          console.error("설치 요청에 대한 정보 오류 발생: ", error);
        });
    }
  }, [installKey]);

  // 설치기사 정보 가져오기
  useEffect(() => {
    axios
      .get("api/install/customerEmployee")
      .then((res) => setCustomerEmployeeList(res.data))
      .catch((error) => console.log("설치기사 정보 오류:", error));
  }, []);

  const handleApproveClick = () => {
    // const approveData = {
    //   installRequestKey: installKey,
    //   itemCommonCode: installRequest[0]?.itemCommonCode,
    //   installRequestAmount: installRequest[0]?.installRequestAmount,
    //   customerInstallerNo,
    //   customerEmployeeNo: "CUS0000000010", // 협력업체 직원 사번 (로그인된 사용자)
    //   installScheduleDate: new Date(installScheduleDate),
    //   installApproveNote: installRequest[0]?.installRequestNote || "", // 비고
    // };
    axios
      .post("/api/install/approve", installApprove)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onClose();
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  const isValid =
    installApprove.installScheduleDate &&
    installApprove.customerInstallerName &&
    installApprove.customerInstallerNo;

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
      size="lg"
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>설치 승인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <Stack gap={4}>
              <Field label={"가맹점명"} orientation="horizontal">
                <Input value={installRequest.franchiseName} readOnly />
              </Field>
              <Field label={"가맹점 주소"} orientation="horizontal">
                <Input value={installRequest.franchiseAddress} readOnly />
              </Field>
              <HStack>
                <Field label={"품목명"} orientation="horizontal">
                  <Input value={installRequest.itemCommonName} readOnly />
                </Field>
                <Field label={"수량"} orientation="horizontal">
                  <Input value={installRequest.installRequestAmount} readOnly />
                </Field>
              </HStack>
              <HStack spacing={4}>
                <Field label={"신청자 사번"} orientation="horizontal">
                  <Input value={installRequest.businessEmployeeNo} readOnly />
                </Field>
                <Field label={"신청자"} orientation="horizontal">
                  <Input value={installRequest.businessEmployeeName} readOnly />
                </Field>
              </HStack>
              <HStack>
                {/*로그인 한 사용자의 사번, 이름 - customer*/}
                <Field label={"승인자 사번"} orientation="horizontal">
                  <Input value={id} readOnly />
                </Field>
                <Field label={"승인자"} orientation="horizontal">
                  <Input value={name} readOnly />
                </Field>
              </HStack>
              <HStack>
                <Field label={"창고명"} orientation="horizontal">
                  <Input value={installRequest.warehouseName} readOnly />
                </Field>
                <Field label={"창고 위치"} orientation="horizontal">
                  <Input value={installRequest.warehouseAddress} readOnly />
                </Field>
              </HStack>

              <Field label={"설치 예정 날짜"} orientation="horizontal">
                <Input
                  value={installApprove.installScheduleDate}
                  onChange={(e) =>
                    setInstallApprove({
                      ...installApprove,
                      installScheduleDate: e.target.value,
                    })
                  }
                  type={"date"}
                  // placeholder="9999-99-99"
                  // ref={withMask("9999-99-99")}
                />
              </Field>

              <Field label="설치기사" orientation="horizontal">
                <SelectRoot
                  onValueChange={(e) => {
                    const selectedCE = customerEmployeeList.find(
                      (selectedCE) =>
                        selectedCE.customer_installer_no === e.value[0],
                    );
                    console.log(e.value[0]);
                    if (selectedCE) {
                      setInstallApprove((prev) => ({
                        ...prev,
                        customerInstallerNo:
                          selectedCE.customer_installer_no || "",
                        customerInstallerName:
                          selectedCE.customer_installer_name || "",
                      }));
                    }
                    console.log(installApprove);
                  }}
                >
                  <SelectTrigger>
                    <SelectValueText>
                      {installApprove.customerInstallerNo || "설치기사 선택"}
                    </SelectValueText>
                  </SelectTrigger>
                  <SelectContent
                    maxHeight={"100px"}
                    style={{
                      width: "85%",
                      top: "40px",
                      position: "absolute",
                    }}
                  >
                    {customerEmployeeList
                      .filter((customer) => customer.customer_installer_no)
                      .map((customer) => (
                        <SelectItem
                          key={customer.customer_installer_no}
                          item={customer.customer_installer_no}
                        >
                          {customer.customer_installer_no}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </SelectRoot>
              </Field>

              <Field label={"설치 기사 이름"} orientation="horizontal">
                <Input value={installApprove.customerInstallerName} readOnly />
              </Field>
              <Field label={"요청 비고"} orientation="horizontal">
                <Input value={installRequest.installRequestNote} readOnly />
              </Field>
              <Field label={"설치 비고"} orientation="horizontal">
                <Input
                  value={installApprove.installApproveNote}
                  onChange={(e) =>
                    setInstallApprove({
                      ...installApprove,
                      installApproveNote: e.target.value,
                    })
                  }
                />
              </Field>
            </Stack>
          </Box>
        </DialogBody>
        <DialogFooter>
          <HStack>
            <Button onClick={handleApproveClick} disabled={!isValid}>
              설치 승인
            </Button>
            <Button>설치 반려</Button>
          </HStack>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
