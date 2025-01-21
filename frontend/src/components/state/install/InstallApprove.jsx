import React, { useEffect, useState } from "react";
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
import { Box, HStack, Input } from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

export function InstallApprove({ installKey, isOpen, onClose }) {
  const [installRequest, setInstallRequest] = useState();
  const [installScheduleDate, setInstallScheduleDate] = useState(""); // 설치 예정 날짜
  const [customerInstallerNo, setCustomerInstallerNo] = useState(""); // 설치 기사

  useEffect(() => {
    console.log(installKey);
    if (installKey) {
      axios
        .get(`/api/install/request/${installKey}`)
        .then((res) => {
          setInstallRequest(res.data || []);
        })
        .catch((error) => {
          console.error("품목 요청 정보 오류 발생: ", error);
        });
    }
  }, []);

  const handleApproveClick = () => {
    if (!installScheduleDate || !customerInstallerNo) {
      toaster.create({
        description: "모든 필수 입력값을 입력해 주세요.",
        type: "error",
      });
      return;
    }

    const approveData = {
      installKey,
      customerInstallerNo,
      businessEmployeeNo: "CUS0000000010", // 협력업체 직원 사번 (로그인된 사용자)
      installScheduleDate,
      note: installRequest[0]?.installRequestNote || "", // 비고
    };

    axios
      .post("/api/install/approve", approveData)
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

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>출고 승인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            {installRequest?.map((req) => (
              <Box>
                <Field label={"가맹점명"}>
                  <Input value={req.franchiseName} readOnly />
                </Field>
                <Field label={"품목명"}>
                  <Input value={req.itemCommonName} readOnly />
                </Field>
                <Field label={"수량"}>
                  <Input value={req.installRequestAmount} readOnly />
                </Field>
                <Field label={"가맹점 주소"}>
                  <Input value={req.franchiseAddress} readOnly />
                </Field>
                <HStack spacing={4}>
                  <Field label={"신청자 사번"}>
                    <Input value={req.businessEmployeeNo} readOnly />
                  </Field>
                  <Field label={"신청자"}>
                    <Input value={req.businessEmployeeName} readOnly />
                  </Field>
                </HStack>
                <HStack>
                  {/*로그인 한 사용자의 사번, 이름*/}
                  <Field label={"승인자 사번"}>
                    <Input value={"CUS0000000010"} readOnly />
                  </Field>
                  <Field label={"승인자"}>
                    <Input value={"직원명"} readOnly />
                  </Field>
                </HStack>
                <HStack>
                  <Field label={"창고명"}>
                    <Input value={req.warehouseName} readOnly />
                  </Field>
                  <Field label={"창고 위치"}>
                    <Input value={req.warehouseAddress} readOnly />
                  </Field>
                </HStack>
                <HStack spacing={4}>
                  <Field label={"설치 예정 날짜"}>
                    <Input
                      value={installScheduleDate}
                      onChange={(e) => setInstallScheduleDate(e.target.value)}
                      placeholder="YYYY-MM-DD"
                    />
                  </Field>
                  <Field label={"설치 기사"}>
                    <Input
                      value={customerInstallerNo}
                      onChange={(e) => setCustomerInstallerNo(e.target.value)}
                      placeholder="설치 기사"
                    />
                  </Field>
                </HStack>
                <Field label={"비고"}>
                  <Input value={req.installRequestNote} readOnly />
                </Field>
              </Box>
            ))}
          </Box>
        </DialogBody>
        <DialogFooter>
          <HStack>
            <Button onClick={handleApproveClick}>출고 승인</Button>
            <Button>출고 반려</Button>
          </HStack>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
