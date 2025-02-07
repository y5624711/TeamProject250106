import React, { useContext, useEffect, useState } from "react";
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
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

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
  const [disapproveData, setDisapproveData] = useState([]);

  const handleClose = () => {
    setInstallApprove(initialInstallApprove);
    setIsApproved(null);
    onClose();
  };

  // 설치 요청 정보
  const fetchInstallRequest = async () => {
    try {
      const response = await axios.get(`/api/install/request/${installKey}`);
      setInstallRequest(response.data);
    } catch (error) {
      console.error("설치 요청 정보 조회 실패:", error);
    }
  };

  // 설치 기사 정보
  const fetchCustomerEmployees = async () => {
    try {
      const response = await axios.get(
        `api/install/customerEmployee/${installKey}`,
      );
      setCustomerEmployeeList(response.data);
    } catch (error) {
      console.error("설치기사 정보 조회 실패:", error);
    }
  };

  useEffect(() => {
    if (installKey) {
      fetchInstallRequest();
      fetchCustomerEmployees();
    }
  }, [installKey, isApproved]);

  // 반려 상태일땐 반려 데이터 가져오기
  useEffect(() => {
    if (installRequest.installRequestConsent === false) {
      axios
        .get(`/api/install/disapproveData/${installKey}`)
        .then((response) => {
          setDisapproveData(response.data);
        });
    }
  }, [installRequest]);

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
          serialNumbers: res.data.serialNumbers,
        }));
        setChange((prev) => !prev);
        setIsApproved(true);
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // installApprove의 serialNumbers를 split하여 serialList로 설정
  const serialList = installApprove?.serialNumbers?.split(",") || [];

  // 설치 요청 반려 (기본키, 요청키, 반려자, 반려일, 비고)
  const handleDisapproveClick = () => {
    const disapproveData = {
      installRequestKey: installKey,
      customerEmployeeNo: id, // 협력업체 직원 사번 (로그인된 사용자 = 반려자)
      disapproveNote: installApprove.installApproveNote,
    };

    axios
      .post(`/api/install/disapprove`, disapproveData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        return axios.get(`/api/install/disapproveData/${installKey}`);
      })
      .then(() => {
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
              ? "설치 반려 상세"
              : isApproved
                ? "설치 승인 상세"
                : "설치 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody>
          <Box css={{ "--field-label-width": "85px" }}>
            <Stack gap={"15px"}>
              {isApproved == true && (
                <Box display="flex" gap={5}>
                  <Field
                    label={<SpacedLabel text="출고 번호" />}
                    orientation="horizontal"
                  >
                    <Input value={installApprove.outputNo} readOnly />
                  </Field>
                  <Field
                    label={<SpacedLabel text="시리얼 번호" />}
                    orientation="horizontal"
                  >
                    <SelectRoot>
                      <SelectTrigger>
                        <SelectValueText>
                          내역 {serialList.length}건 확인
                        </SelectValueText>
                      </SelectTrigger>
                      <SelectContent
                        style={{
                          width: "210px",
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
                </Box>
              )}
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="가맹점" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.franchiseName} readOnly />
                </Field>
                <Field
                  label={<SpacedLabel text="주소" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.franchiseAddress} readOnly />
                </Field>
              </Box>
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="품목" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.itemCommonName} readOnly />
                </Field>
                <Field
                  label={<SpacedLabel text="수량" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.installRequestAmount} readOnly />
                </Field>
              </Box>
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="담당 업체" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.customerName} readOnly />
                </Field>
                <Field
                  label={<SpacedLabel text="창고" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.warehouseName} readOnly />
                </Field>
              </Box>
              <Box display="flex" gap={5}>
                <Field
                  label={<SpacedLabel text="요청자" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.businessEmployeeName} readOnly />
                </Field>
                <Field
                  label={<SpacedLabel text="사번" />}
                  orientation="horizontal"
                >
                  <Input value={installRequest.businessEmployeeNo} readOnly />
                </Field>
              </Box>
              <Field
                label={<SpacedLabel text="요청일" />}
                orientation="horizontal"
              >
                <Input value={installRequest.installRequestDate} readOnly />
              </Field>
              <Field
                label={<SpacedLabel text="요청 비고" />}
                orientation="horizontal"
              >
                {installRequest.installRequestNote ? (
                  <Textarea
                    value={installRequest.installRequestNote}
                    readOnly
                    maxHeight={"40px"}
                  />
                ) : (
                  <Input readOnly value={"내용 없음"} />
                )}
              </Field>

              {installRequest.installRequestConsent == null && <Separator />}

              {installRequest.installRequestConsent != false && (
                <Stack gap={"15px"}>
                  <Box display="flex" gap={5}>
                    <Field
                      label={
                        <SpacedLabel
                          text={isApproved != true ? "반려/승인자" : "승인자"}
                        />
                      }
                      orientation="horizontal"
                    >
                      <Input
                        value={name}
                        readOnly
                        variant={isApproved == null ? "subtle" : "outline"}
                      />
                    </Field>
                    <Field
                      label={<SpacedLabel text="사번" />}
                      orientation="horizontal"
                    >
                      <Input
                        value={id}
                        readOnly
                        variant={isApproved == null ? "subtle" : "outline"}
                      />
                    </Field>
                  </Box>

                  <Box display="flex" gap={5}>
                    <Field
                      label={<SpacedLabel text="설치 기사" req />}
                      orientation="horizontal"
                      required={isApproved == null}
                    >
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
                        readOnly={isApproved}
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
                            width: "69%",
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
                    <Field
                      label={<SpacedLabel text="사번" />}
                      orientation="horizontal"
                    >
                      <Input
                        value={installApprove.customerInstallerNo}
                        variant={isApproved == null ? "subtle" : "outline"}
                        readOnly
                      />
                    </Field>
                  </Box>
                  <Field
                    label={<SpacedLabel text="설치 예정일" req />}
                    orientation="horizontal"
                    required={isApproved == null}
                  >
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
                      readOnly={isApproved}
                    />
                  </Field>
                  {isApproved == true && (
                    <Field
                      label={<SpacedLabel text="승인일" />}
                      orientation="horizontal"
                    >
                      <Input
                        value={installApprove.installApproveDate}
                        readOnly={isApproved}
                      />
                    </Field>
                  )}
                  <Field
                    label={
                      <SpacedLabel
                        text={isApproved != true ? "비고" : "승인 비고"}
                      />
                    }
                    orientation="horizontal"
                  >
                    {isApproved != true ? (
                      <Textarea
                        placeholder={"최대 50자"}
                        onChange={(e) =>
                          setInstallApprove({
                            ...installApprove,
                            installApproveNote: e.target.value,
                          })
                        }
                        maxHeight={"100px"}
                      />
                    ) : installApprove.installApproveNote ? (
                      <Textarea
                        readOnly
                        value={installApprove.installApproveNote}
                        maxHeight={"40px"}
                      />
                    ) : (
                      <Input readOnly value={"내용 없음"} />
                    )}
                  </Field>
                </Stack>
              )}
              {installRequest.installRequestConsent == false && (
                <Stack gap={"15px"}>
                  <Box display="flex" gap={5}>
                    <Field
                      label={<SpacedLabel text="반려자" />}
                      orientation="horizontal"
                    >
                      <Input
                        value={disapproveData.disapproveEmployeeName}
                        readOnly
                      />
                    </Field>
                    <Field
                      label={<SpacedLabel text="사번" />}
                      orientation="horizontal"
                    >
                      <Input
                        value={disapproveData.disapproveEmployeeNo}
                        readOnly
                      />
                    </Field>
                  </Box>
                  <Field
                    label={<SpacedLabel text="반려일" />}
                    orientation="horizontal"
                  >
                    <Input value={disapproveData.disapproveDate} readOnly />
                  </Field>
                  <Field
                    label={<SpacedLabel text="반려 비고" />}
                    orientation="horizontal"
                  >
                    {disapproveData.disapproveNote ? (
                      <Textarea
                        readOnly
                        value={disapproveData.disapproveNote}
                        maxHeight={"100px"}
                      />
                    ) : (
                      <Input readOnly value={"내용 없음"} />
                    )}
                  </Field>
                </Stack>
              )}
            </Stack>
          </Box>
        </DialogBody>
        <DialogFooter>
          {installRequest.installRequestConsent == null && (
            <DialogActionTrigger asChild>
              <Button variant="outline" onClick={handleClose}>
                취소
              </Button>
            </DialogActionTrigger>
          )}
          {installRequest.installRequestConsent != false && !isApproved ? (
            <HStack>
              <Button
                variant="outline"
                colorPalette="red"
                onClick={handleDisapproveClick}
              >
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
