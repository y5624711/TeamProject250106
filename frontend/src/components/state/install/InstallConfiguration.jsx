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
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Separator,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { format } from "date-fns";
import { Tooltip } from "../../ui/tooltip.jsx";

export function InstallConfiguration({
  installKey,
  isOpen,
  onClose,
  setChange,
}) {
  const { id, company } = useContext(AuthenticationContext);
  const [installData, setInstallData] = useState(null);
  const [inoutHistoryNote, setInoutHistoryNote] = useState("");
  // const [isConfiguration, setIsConfiguration] = useState(null);

  const handleClose = () => {
    setInoutHistoryNote("");
    // setIsConfiguration(null);
    onClose();
  };

  // 설치 승인 정보와 시리얼 번호 정보를 병렬로 가져오기
  useEffect(() => {
    if (installKey) {
      axios
        .get(`/api/install/approve/${installKey}`)
        .then((res) => {
          const data = res.data || [];
          setInstallData(data);
        })
        .catch((error) => {
          console.error("설치 요청 정보 오류 발생: ", error);
        });
    }
  }, [installKey]);

  // 설치 확인 요청
  const handleConfigurationClick = () => {
    const configurationData = {
      outputNo: installData.outputNo,
      customerEmployeeNo: id,
      businessEmployeeNo: installData.businessEmployeeNo,
      franchiseCode: installData.franchiseCode,
      inoutHistoryNote,
      serialNumbers: installData.serialNumbers,
      customerInstallerNo: installData.customerInstallerNo,
    };
    axios
      .post("/api/install/configuration", configurationData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        // 설치 완료 후 최신 데이터 갱신
        return axios.get(`/api/install/approve/${installKey}`);
      })
      .then((res) => {
        setInstallData(res.data || []); // 새로운 데이터로 업데이트
        setChange((prev) => !prev);
        // setIsConfiguration(true);
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // installData의 serialNumbers를 split하여 serialList로 설정
  const serialList = installData?.serialNumbers?.split(",") || [];

  // 오늘 날짜 표기
  const today = format(new Date(), "yyyy-MM-dd");

  // 설치 완료 버튼 활성화 조건
  const isValid = () => {
    const isBIZCompany = company?.startsWith("BIZ");
    const isInstaller = installData?.customerInstallerNo === id;

    return isBIZCompany || isInstaller;
  };

  if (!installData) {
    return null;
  }

  return (
    <DialogRoot open={isOpen} onOpenChange={handleClose} size="lg">
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {installData.inoutHistoryDate ? "설치 완료 상세" : "설치 완료"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Stack gap={"15px"}>
            <Field label={"가맹점"} orientation="horizontal">
              <Input value={installData.franchiseName} readOnly />
            </Field>
            <Field label={"가맹점 주소"} orientation="horizontal">
              <Input value={installData.franchiseAddress} readOnly />
            </Field>
            <HStack>
              <Field label={"품목"} orientation="horizontal">
                <Input value={installData.itemCommonName} readOnly />
              </Field>
              <Field label={"수량"} orientation="horizontal">
                <Input value={installData.installRequestAmount} readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field label={"요청자"} orientation="horizontal">
                <Input value={installData.businessEmployeeName} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={installData.businessEmployeeNo} readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field label={"승인자"} orientation="horizontal">
                <Input value={installData.customerEmployeeName} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={installData.customerEmployeeNo} readOnly />
              </Field>
            </HStack>
            <HStack>
              <Field label={"설치 기사"} orientation="horizontal">
                <Input value={installData.customerInstallerName} readOnly />
              </Field>
              <Field label={"사번"} orientation="horizontal">
                <Input value={installData.customerInstallerNo} readOnly />
              </Field>
            </HStack>
            <Field label={"승인 날짜"} orientation="horizontal">
              <Input value={installData.installRequestDate} readOnly />
            </Field>
            <Field label={"승인 비고"} orientation="horizontal">
              <Input
                value={installData.installApproveNote || "내용없음"}
                readOnly
              />
            </Field>
            {installData.installApproveConsent && <Separator />}
            <HStack>
              <Field label={"출고 번호"} orientation="horizontal">
                <Input value={installData.outputNo} readOnly />
              </Field>
              <Field label={"시리얼 번호"} orientation="horizontal">
                <SelectRoot>
                  <SelectTrigger>
                    <SelectValueText>{serialList[0]}</SelectValueText>
                  </SelectTrigger>
                  <SelectContent
                    style={{
                      width: "220px",
                      top: "40px",
                      position: "absolute",
                    }}
                  >
                    {serialList.map((serial) => (
                      <SelectItem key={serial} item={serial}>
                        {serial}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Field>
            </HStack>
            <HStack>
              <Field label={"설치 예정일"} orientation="horizontal">
                <Input value={installData.installScheduleDate} readOnly />
              </Field>
              <Field
                label={
                  installData?.inoutHistoryDate ? "설치 완료일" : "설치 확정일"
                }
                orientation="horizontal"
              >
                <Input
                  value={installData?.inoutHistoryDate || today}
                  readOnly
                />
              </Field>
            </HStack>
            <Field label={"완료 비고"} orientation="horizontal">
              <Textarea
                value={
                  installData?.inoutHistoryDate
                    ? installData?.inoutHistoryNote || "내용없음"
                    : inoutHistoryNote
                }
                placeholder={installData?.inoutHistoryDate ? "" : "최대 50자"}
                onChange={(e) => setInoutHistoryNote(e.target.value)}
                maxHeight={"100px"}
                readOnly={!!installData?.inoutHistoryDate} // 완료되었으면 읽기 전용
              />
            </Field>
          </Stack>
        </DialogBody>
        <DialogFooter>
          {installData?.inoutHistoryDate ? (
            // 이미 설치 완료된 경우
            <Button variant="outline" onClick={handleClose}>
              닫기
            </Button>
          ) : (
            // 설치 완료되지 않은 경우
            <HStack>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
              <Tooltip
                content="권한이 없습니다."
                disabled={isValid()}
                openDelay={100}
                closeDelay={100}
              >
                <Button
                  onClick={handleConfigurationClick}
                  disabled={!isValid()}
                >
                  완료
                </Button>
              </Tooltip>
            </HStack>
          )}
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
