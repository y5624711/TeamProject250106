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
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

function ReturnApprove({ isOpen, onClose, onApprove, returnRequestKey }) {
  const { id, name } = useContext(AuthenticationContext);

  const initialApproveData = {
    customerEmployeeNo: id,
    customerEmployeeName: name,
    customerConfigurerNo: "",
    customerConfigurerName: "",
    returnDate: "",
    returnApproveNote: "",
  };
  const [approveData, setApproveData] = useState(initialApproveData);
  const [configurerList, setConfigurerList] = useState([]);
  const [refreshKey, setRefreshKey] = useState(0); //새로고침용

  //요청 정보 가져오기
  useEffect(() => {
    if (isOpen && returnRequestKey) {
      setApproveData(initialApproveData);
      axios.get(`/api/return/approve/${returnRequestKey}`).then((res) => {
        // console.log("호출", res.data);
        setApproveData(res.data[0]);
      });
    }
  }, [isOpen, returnRequestKey, refreshKey]);
  // console.log("셋팅", approveData);

  //검수 기사 정보 가져오기
  useEffect(() => {
    axios
      .get(`api/return/configurer/${returnRequestKey}`)
      .then((res) => {
        // console.log("직원 목록", res.data);
        setConfigurerList(res.data);
      })
      .catch((e) => console.error("검수자 에러", e));
  }, [returnRequestKey]);

  //정보 기입 (변화 적용)
  const handleApproveInput = (field) => (e) => {
    const value = e.target ? e.target.value : e.value;
    setApproveData((prev) => ({ ...prev, [field]: value }));
  };

  //반품 승인 정보 전달
  const handleApproveButtonClick = () => {
    const updatedApproveData = {
      ...approveData,
      customerEmployeeName: name,
      customerEmployeeNo: id,
    };

    axios
      .post(`api/return/approve`, updatedApproveData)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
        onApprove(updatedApproveData);
        setRefreshKey((prevKey) => prevKey + 1);
      })
      .catch((e) => {
        console.error(e);
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  //반려 전달
  const handleDisapproveButton = () => {
    axios
      .put(`api/return/disapprove/${returnRequestKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  //유효성 검사
  const validate = () => {
    return (
      approveData.customerConfigurerName != null &&
      approveData.returnDate != null
    );
  };

  // console.log("결과", approveData);

  return (
    <DialogRoot
      open={isOpen}
      onOpenChange={(e) => {
        onClose(e);
        setApproveData(initialApproveData);
      }}
      size={"lg"}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {approveData.returnConsent === "1"
              ? "반품 승인 상세"
              : approveData.returnConsent === "0"
                ? "반품 반려 상세"
                : "반품 승인"}
          </DialogTitle>
        </DialogHeader>
        <DialogBody
          style={{ display: "flex", flexDirection: "column", gap: "15px" }}
        >
          <Field orientation="horizontal" label="가맹점">
            <Input readOnly value={approveData.franchiseName} />
          </Field>
          {approveData.returnConsent === "1" ? (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <HStack>
                <Field orientation="horizontal" label="반품 번호">
                  <Input readOnly value={approveData.returnNo} />
                </Field>
                <Field orientation="horizontal" label="시리얼 번호">
                  <Input readOnly defaultValue={approveData.serialNo} />
                </Field>
              </HStack>
              <Field orientation="horizontal" label="품목">
                <Input readOnly value={approveData.itemCommonName} />
              </Field>
            </Box>
          ) : (
            <HStack>
              <Field orientation="horizontal" label="품목">
                <Input readOnly value={approveData.itemCommonName} />
              </Field>
              <Field orientation="horizontal" label="시리얼 번호">
                <Input readOnly defaultValue={approveData.serialNo} />
              </Field>
            </HStack>
          )}

          <HStack>
            <Field orientation="horizontal" label="요청자">
              <Input readOnly value={approveData.businessEmployeeName} />
            </Field>
            <Field orientation="horizontal" label="사번">
              <Input readOnly value={approveData.businessEmployeeNo} />
            </Field>
          </HStack>

          <Field orientation="horizontal" label="담당 업체">
            <Input readOnly value={approveData.customerName} />
          </Field>
          <Field orientation="horizontal" label="요청 날짜">
            <Input
              readOnly
              type={"date"}
              value={approveData.returnRequestDate}
            />
          </Field>
          <Field orientation="horizontal" label="요청 비고">
            {approveData.returnRequestNote ? (
              <Textarea readOnly value={approveData.returnRequestNote} />
            ) : (
              <Input readOnly value={"내용 없음"} />
            )}
          </Field>

          {approveData.returnConsent === "1" ? (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <HStack>
                <Field orientation="horizontal" label="승인자">
                  <Input readOnly value={approveData.customerEmployeeName} />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input readOnly value={approveData.customerEmployeeNo} />
                </Field>
              </HStack>
              <HStack>
                <Field orientation="horizontal" label="검수기사">
                  <Input readOnly value={approveData.customerConfigurerName} />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input readOnly value={approveData.customerConfigurerNo} />
                </Field>
              </HStack>
              <Field orientation="horizontal" label="회수 예정일">
                <Input readOnly value={approveData.returnDate || "미정"} />
              </Field>
              <Field orientation="horizontal" label="승인 날짜">
                <Input readOnly value={approveData.returnApproveDate} />
              </Field>
              <Field orientation="horizontal" label="승인 비고">
                {approveData.returnApproveNote ? (
                  <Textarea readOnly value={approveData.returnApproveNote} />
                ) : (
                  <Input readOnly value={"내용 없음"} />
                )}
              </Field>
            </Box>
          ) : approveData.returnConsent === "0" ? (
            ""
          ) : (
            <Box
              style={{ display: "flex", flexDirection: "column", gap: "15px" }}
            >
              <Separator />
              <HStack>
                <Field orientation="horizontal" label="승인자">
                  <Input readOnly value={name} />
                </Field>
                <Field orientation="horizontal" label="사번">
                  <Input readOnly value={id} />
                </Field>
              </HStack>
              <HStack>
                <Field label={"검수 기사"} orientation="horizontal">
                  <SelectRoot
                    onValueChange={(e) => {
                      const selectedConfigurer = configurerList.find(
                        (info) => info.customerConfigurerName === e.value[0],
                      );
                      if (selectedConfigurer) {
                        setApproveData((prev) => ({
                          ...prev,
                          customerConfigurerName:
                            selectedConfigurer.customerConfigurerName || "",
                          customerConfigurerNo:
                            selectedConfigurer.customerConfigurerNo || "",
                        }));
                      }
                    }}
                  >
                    <SelectTrigger>
                      <SelectValueText placeholder={"검수 기사 선택"}>
                        {approveData.customerConfigurerName}
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
                      {configurerList
                        .filter(
                          (configurer) => configurer.customerConfigurerName,
                        )
                        .map((configurer) => (
                          <SelectItem
                            key={configurer.customerConfigurerName}
                            item={configurer.customerConfigurerName}
                          >
                            {configurer.customerConfigurerName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </SelectRoot>
                </Field>
                <Field label={"사번"} orientation="horizontal">
                  <Input value={approveData.customerConfigurerNo} readOnly />
                </Field>
              </HStack>

              <Field orientation="horizontal" label="회수 예정일">
                <Input
                  type="date" // 사용자가 달력으로 날짜 선택 가능
                  value={approveData.returnDate || ""}
                  onChange={handleApproveInput("returnDate")}
                />
              </Field>
              <Field orientation="horizontal" label="승인 비고">
                <Textarea
                  value={approveData.returnApproveNote}
                  placeholder="최대 50자"
                  onChange={handleApproveInput("returnApproveNote")}
                />
              </Field>
            </Box>
          )}
        </DialogBody>
        <DialogFooter>
          {approveData.returnConsent === "1" ||
          approveData.returnConsent === "0" ? (
            <Button onClick={onClose} variant="outline">
              닫기
            </Button>
          ) : (
            <HStack>
              <Button onClick={handleDisapproveButton} variant="outline">
                반려
              </Button>
              <Tooltip
                content="입력을 완료해 주세요."
                openDelay={100}
                closeDelay={100}
                disabled={validate()}
              >
                <Button
                  onClick={handleApproveButtonClick}
                  disabled={!validate()}
                >
                  승인
                </Button>
              </Tooltip>
            </HStack>
          )}

          <DialogCloseTrigger />
        </DialogFooter>
      </DialogContent>
    </DialogRoot>
  );
}

export default ReturnApprove;
