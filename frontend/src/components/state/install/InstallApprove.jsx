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
  Separator,
  Stack,
  Textarea,
} from "@chakra-ui/react";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function InstallApprove({ installKey, isOpen, onClose, setChange }) {
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
  const [isApproved, setIsApproved] = useState(null);

  const handleClose = () => {
    setInstallApprove(initialInstallApprove);
    setIsApproved(null);
    onClose();
  };

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
  }, [installKey, isApproved]);

  // 설치기사 정보 가져오기
  useEffect(() => {
    if (installKey) {
      axios
        .get(`api/install/customerEmployee/${installKey}`)
        .then((res) => setCustomerEmployeeList(res.data))
        .catch((error) => console.log("설치기사 정보 오류:", error));
    }
  }, [installKey]);

  // 설치 승인
  const handleApproveClick = () => {
    const approveData = {
      installRequestKey: installKey,
      itemCommonCode: installRequest?.itemCommonCode,
      installRequestAmount: installRequest?.installRequestAmount,
      customerEmployeeNo: id, // 협력업체 직원 사번 (로그인된 사용자)
      ...installApprove,
    };

    axios
      .post("/api/install/approve", approveData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        // 승인 후 바로 installAppr 데이터 다시 요청
        return axios.get(`/api/install/approveData/${installKey}`);
      })
      .then((res) => {
        // 기존 installApprove 상태를 유지하면서 새로운 데이터만 업데이트
        setInstallApprove((prev) => ({
          ...prev,
          outputNo: res.data.outputNo,
          installApproveDate: res.data.installApproveDate,
          // 기존 설치기사 정보 유지
          customerInstallerName: prev.customerInstallerName,
          customerInstallerNo: prev.customerInstallerNo,
          installScheduleDate: prev.installScheduleDate,
          installApproveNote: prev.installApproveNote,
        }));
        setChange((prev) => !prev);
        setIsApproved(true); // 승인 완료 상태로 변경
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 설치 요청 반려
  const handleDisapproveClick = () => {
    axios
      .put(`/api/install/disapprove/${installKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setChange((prev) => !prev);
        setIsApproved(false);
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
      onOpenChange={handleClose}
      size="lg"
      scrollBehavior={"none"}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {installRequest.installRequestConsent === false
              ? "설치 승인 반려"
              : isApproved
                ? "설치 승인 상세"
                : "설치 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box>
            <Stack gap={"15px"}>
              {isApproved == true && (
                <Field label={"출고 번호"} orientation="horizontal">
                  <Input value={installApprove.outputNo} readOnly />
                </Field>
              )}
              <HStack>
                <Field label={"가맹점"} orientation="horizontal">
                  <Input value={installRequest.franchiseName} readOnly />
                </Field>
                <Field label={"주소"} orientation="horizontal">
                  <Input value={installRequest.franchiseAddress} readOnly />
                </Field>
              </HStack>
              <HStack>
                <Field label={"품목"} orientation="horizontal">
                  <Input value={installRequest.itemCommonName} readOnly />
                </Field>
                <Field label={"수량"} orientation="horizontal">
                  <Input value={installRequest.installRequestAmount} readOnly />
                </Field>
              </HStack>
              <HStack>
                <Field label={"담당 업체"} orientation="horizontal">
                  <Input value={installRequest.customerName} readOnly />
                </Field>
                <Field label={"창고"} orientation="horizontal">
                  <Input value={installRequest.warehouseName} readOnly />
                </Field>
              </HStack>
              <HStack spacing={4}>
                <Field label={"요청자"} orientation="horizontal">
                  <Input value={installRequest.businessEmployeeName} readOnly />
                </Field>
                <Field label={"사번"} orientation="horizontal">
                  <Input value={installRequest.businessEmployeeNo} readOnly />
                </Field>
              </HStack>

              <Field label={"요청 날짜"} orientation="horizontal">
                <Input value={installRequest.installRequestDate} readOnly />
              </Field>
              <Field label={"요청 비고"} orientation="horizontal">
                <Textarea
                  value={installRequest.installRequestNote || "내용없음"}
                  readOnly
                  maxHeight={"40px"}
                />
              </Field>

              {!isApproved && <Separator />}

              {installRequest.installRequestConsent != false && (
                <HStack>
                  <Field label={"승인자"} orientation="horizontal">
                    <Input value={name} readOnly />
                  </Field>
                  <Field label={"사번"} orientation="horizontal">
                    <Input value={id} readOnly />
                  </Field>
                </HStack>
              )}
              {installRequest.installRequestConsent != false && (
                <Stack gap={"15px"}>
                  <HStack>
                    <Field label="설치 기사" orientation="horizontal">
                      <SelectRoot
                        onValueChange={(e) => {
                          const selectedCE = customerEmployeeList.find(
                            (selectedCE) =>
                              selectedCE.customer_installer_name === e.value[0],
                          );
                          if (selectedCE) {
                            setInstallApprove((prev) => ({
                              ...prev,
                              customerInstallerName:
                                selectedCE.customer_installer_name || "",
                              customerInstallerNo:
                                selectedCE.customer_installer_no || "",
                            }));
                          }
                        }}
                      >
                        <SelectTrigger>
                          <SelectValueText>
                            {installApprove.customerInstallerName ||
                              "설치 기사 선택"}
                          </SelectValueText>
                        </SelectTrigger>
                        <SelectContent
                          maxHeight={"100px"}
                          style={{
                            width: "75%",
                            top: "40px",
                            position: "absolute",
                          }}
                        >
                          {customerEmployeeList
                            .filter(
                              (customer) => customer.customer_installer_name,
                            )
                            .map((customer) => (
                              <SelectItem
                                key={customer.customer_installer_name}
                                item={customer.customer_installer_name}
                              >
                                {customer.customer_installer_name}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </SelectRoot>
                    </Field>
                    <Field label={"사번"} orientation="horizontal">
                      <Input
                        value={installApprove.customerInstallerNo}
                        readOnly
                      />
                    </Field>
                  </HStack>
                  <Field label={"설치 예정일"} orientation="horizontal">
                    <Input
                      value={installApprove.installScheduleDate}
                      onChange={(e) =>
                        setInstallApprove({
                          ...installApprove,
                          installScheduleDate: e.target.value,
                        })
                      }
                      type={"date"}
                      min={new Date().toISOString().split("T")[0]}
                    />
                  </Field>

                  {isApproved == true && (
                    <Field label={"승인 날짜"} orientation="horizontal">
                      <Input
                        value={installApprove.installApproveDate}
                        readOnly={isApproved}
                      />
                    </Field>
                  )}
                  <Field label={"승인 비고"} orientation="horizontal">
                    <Textarea
                      placeholder={isApproved ? "" : "최대 50자"}
                      value={installApprove.installApproveNote}
                      onChange={(e) =>
                        setInstallApprove({
                          ...installApprove,
                          installApproveNote: e.target.value,
                        })
                      }
                      maxHeight={"40px"}
                      readOnly={isApproved}
                    />
                  </Field>
                </Stack>
              )}
            </Stack>
          </Box>
        </DialogBody>
        <DialogFooter>
          {installRequest.installRequestConsent != false && !isApproved ? (
            <HStack>
              <Button variant="outline" onClick={handleDisapproveClick}>
                반려
              </Button>
              <Tooltip
                content={"입력을 완료해주세요"}
                disabled={isValid}
                openDelay={100}
                closeDelay={100}
              >
                <Button onClick={handleApproveClick} disabled={!isValid}>
                  승인
                </Button>
              </Tooltip>
            </HStack>
          ) : (
            <Button variant="outline" onClick={handleClose}>
              닫기
            </Button>
          )}
        </DialogFooter>
        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  );
}
