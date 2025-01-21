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
import { withMask } from "use-mask-input";

export function InstallApprove({ installKey, isOpen, onClose }) {
  const [installRequest, setInstallRequest] = useState();
  const [installScheduleDate, setInstallScheduleDate] = useState(""); // 설치 예정 날짜
  const [customerInstallerNo, setCustomerInstallerNo] = useState(""); // 설치 기사
  const [customerInstallerName, setCustomerInstallerName] = useState(""); // 설치 기사
  const [installApproveNote, setInstallApproveNote] = useState("");

  useEffect(() => {
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
  }, [installKey]);

  const handleApproveClick = () => {
    if (!installScheduleDate || !customerInstallerName) {
      toaster.create({
        description: "모든 필수 입력값을 입력해 주세요.",
        type: "error",
      });
      return;
    }

    const approveData = {
      installRequestKey: installKey,
      itemCommonCode: installRequest[0]?.itemCommonCode,
      installRequestAmount: installRequest[0]?.installRequestAmount,
      customerInstallerNo,
      customerEmployeeNo: "CUS0000000010", // 협력업체 직원 사번 (로그인된 사용자)
      installScheduleDate: new Date(installScheduleDate),
      installApproveNote: installRequest[0]?.installRequestNote || "", // 비고
    };

    console.log(approveData);
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

  // 설치기사 사번 통해 이름 가져오기
  const handleInstallerSearch = () => {
    if (!customerInstallerNo) {
      toaster.create({
        description: "기사 사번을 입력해 주세요.",
        type: "error",
      });
      return;
    }

    axios
      .get(`/api/install/${customerInstallerNo}`)
      .then((res) => {
        const installerData = res.data;
        if (installerData) {
          setCustomerInstallerName(installerData); // 기사 이름 업데이트
          toaster.create({
            description: "설치 기사 정보가 조회되었습니다.",
            type: "success",
          });
        } else {
          toaster.create({
            description: "설치 기사 정보를 찾을 수 없습니다.",
            type: "error",
          });
        }
      })
      .catch((e) => {
        console.error(e);
        toaster.create({
          description: "설치 기사 조회 중 오류가 발생했습니다.",
          type: "error",
        });
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
                <Field label={"가맹점명"} orientation="horizontal">
                  <Input value={req.franchiseName} readOnly />
                </Field>
                <Field label={"품목명"} orientation="horizontal">
                  <Input value={req.itemCommonName} readOnly />
                </Field>
                <Field label={"수량"} orientation="horizontal">
                  <Input value={req.installRequestAmount} readOnly />
                </Field>
                <Field label={"가맹점 주소"} orientation="horizontal">
                  <Input value={req.franchiseAddress} readOnly />
                </Field>
                <HStack spacing={4}>
                  <Field label={"신청자 사번"} orientation="horizontal">
                    <Input value={req.businessEmployeeNo} readOnly />
                  </Field>
                  <Field label={"신청자"} orientation="horizontal">
                    <Input value={req.businessEmployeeName} readOnly />
                  </Field>
                </HStack>
                <HStack>
                  {/*로그인 한 사용자의 사번, 이름 - customer*/}
                  <Field label={"승인자 사번"} orientation="horizontal">
                    <Input value={"CUS000000006"} readOnly />
                  </Field>
                  <Field label={"승인자"} orientation="horizontal">
                    <Input value={"직원명"} readOnly />
                  </Field>
                </HStack>
                <HStack>
                  <Field label={"창고명"} orientation="horizontal">
                    <Input value={req.warehouseName} readOnly />
                  </Field>
                  <Field label={"창고 위치"} orientation="horizontal">
                    <Input value={req.warehouseAddress} readOnly />
                  </Field>
                </HStack>

                <Field label={"설치 예정 날짜"} orientation="horizontal">
                  <Input
                    value={installScheduleDate}
                    onChange={(e) => setInstallScheduleDate(e.target.value)}
                    placeholder="9999-99-99 "
                    ref={withMask("9999-99-99")}
                  />
                </Field>
                <HStack>
                  <Field label={"설치 기사"} orientation="horizontal">
                    <Input
                      value={customerInstallerNo}
                      onChange={(e) => setCustomerInstallerNo(e.target.value)}
                      placeholder="설치 기사"
                    />
                  </Field>
                  <Button onClick={handleInstallerSearch}>조회</Button>
                </HStack>
                <Field label={"설치 기사 이름"} orientation="horizontal">
                  <Input value={customerInstallerName} readOnly />
                </Field>
                <Field label={"요청 비고"} orientation="horizontal">
                  <Input value={req.installRequestNote} readOnly />
                </Field>
                <Field label={"설치 비고"} orientation="horizontal">
                  <Input
                    value={installApproveNote}
                    onChange={(e) => setInstallApproveNote(e.target.value)}
                  />
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
