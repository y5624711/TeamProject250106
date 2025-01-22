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
  DialogTrigger,
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
} from "@chakra-ui/react";
import axios from "axios";

export function InstallConfiguration({ installKey, isOpen, onClose }) {
  const [installData, setInstallData] = useState(null);
  const [serialList, setSerialList] = useState();
  const [selectedSerial, setSelectedSerial] = useState("");
  const [serialNote, setSerialNote] = useState("");

  // 설치 승인 정보와 시리얼 번호 정보를 병렬로 가져오기
  useEffect(() => {
    if (installKey) {
      Promise.all([
        axios.get(`/api/install/approve/${installKey}`),
        axios.get(`/api/install/serial/${installKey}`),
      ])
        .then(([approveRes, serialRes]) => {
          const approveData = approveRes.data || [];
          const serialData = serialRes.data || [];
          setInstallData(approveData);
          setSerialList(serialData);
        })
        .catch((error) => {
          console.error("데이터 로드 오류:", error);
        });
    }
  }, [installKey]);

  // 데이터가 로드되기 전에는 아무것도 렌더링하지 않음
  if (!installData) {
    return null;
  }

  console.log(selectedSerial);
  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={() => {
        onClose();
      }}
      size="lg"
    >
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          설치 확인
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>설치 확인</DialogTitle>
        </DialogHeader>
        <DialogBody>
          {installData?.map((appr) => (
            <Box>
              <Field label={"가맹점명"} orientation="horizontal">
                <Input value={appr.franchiseName} readOnly />
              </Field>
              <Field label={"품목명"} orientation="horizontal">
                <Input value={appr.itemCommonName} readOnly />
              </Field>
              <HStack>
                <Field label={"출고 번호"} orientation="horizontal">
                  <Input value={appr.outputNo} readOnly />
                </Field>
                <Field label={"시리얼 번호"} orientation="horizontal">
                  <SelectRoot
                    onValueChange={(e) => {
                      setSelectedSerial(e.value[0]);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText>
                        {selectedSerial || "시리얼 선택"}
                      </SelectValueText>
                    </SelectTrigger>
                    <SelectContent
                      style={{
                        width: "220px",
                        top: "40px",
                        position: "absolute",
                      }}
                    >
                      {serialList.map((serial) => (
                        // 각 시리얼 번호를 SelectItem으로 개별 렌더링
                        <SelectItem key={serial} item={serial}>
                          {serial}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
              </HStack>
              <Field label={"가맹점 주소"} orientation="horizontal">
                <Input value={appr.franchiseAddress} readOnly />
              </Field>
              <HStack>
                <Field label={"신청자 사번"} orientation="horizontal">
                  <Input value={appr.businessEmployeeNo} readOnly />
                </Field>
                <Field label={"신청자"} orientation="horizontal">
                  <Input value={appr.businessEmployeeName} readOnly />
                </Field>
              </HStack>
              <Field label={"설치 기사"} orientation="horizontal">
                <Input value={appr.customerInstallerNo} readOnly />
              </Field>
              <Field label={"승인 비고"} orientation="horizontal">
                <Input value={appr.installApproveNote} readOnly />
              </Field>
              <Field label={"시리얼 비고"} orientation="horizontal">
                <Input onChange={(e) => setSerialNote(e.target.value)} />
              </Field>
            </Box>
          ))}
        </DialogBody>
        <DialogFooter>
          <DialogActionTrigger asChild>
            <Button variant="outline">취소</Button>
          </DialogActionTrigger>
          <Button>설치 완료</Button>
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
