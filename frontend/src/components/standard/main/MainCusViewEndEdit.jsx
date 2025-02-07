import React, { useEffect, useState } from "react";
import axios from "axios";
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
import { Box, HStack, Input, Text, Textarea } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { Button } from "../../ui/button.jsx";
import { toaster } from "../../ui/toaster.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function MainCusViewEndEdit({ company, cusViewOpen, onCancel }) {
  const [customer, setCustomer] = useState();
  const [savedCustomer, setSavedCustomer] = useState();
  const [updateCheck, setUpdateCheck] = useState(false);

  useEffect(() => {
    axios
      .get(`/api/main/mainCustomerView/${company}`)
      .then((res) => res.data)
      .then((data) => {
        setCustomer(data);
        setSavedCustomer(data);
      })
      .finally(() => setUpdateCheck(false));
  }, [updateCheck]);

  let disabled = false;
  if (customer != null) {
    disabled = !(
      customer.customerRep.trim().length > 0 &&
      customer.customerNo.trim().length > 0 &&
      customer.customerTel.trim().length > 0 &&
      customer.customerFax.trim().length > 0 &&
      customer.customerAddress.trim().length > 0 &&
      customer.customerPost.trim().length > 0
    );
  }

  function formatPhoneNumber(value) {
    value = value.replace(/\D/g, ""); // 숫자만 남기기

    // 02 지역번호 (서울)
    if (value.startsWith("02")) {
      return value.replace(/(\d{2})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 12);
    }
    // 휴대폰 및 일반 지역번호 (3자리 지역번호 포함)
    return value.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3").slice(0, 13);
  }

  // 사업자등록번호 정규식 (자동으로 하이픈 입력)
  function formatBusinessNumber(value) {
    return value
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/(\d{3})(\d{2})(\d{5})/, "$1-$2-$3") // 하이픈 자동 삽입
      .slice(0, 12); // 최대 길이 제한
  }

  // 법인등록번호 정규식 (자동으로 하이픈 입력)
  function formatCorporateNumber(value) {
    return value
      .replace(/\D/g, "") // 숫자만 남기기
      .replace(/(\d{6})(\d{7})/, "$1-$2") // 하이픈 자동 삽입
      .slice(0, 14); // 최대 길이 제한
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    let formattedValue = value;

    if (name === "customerTel") {
      formattedValue = formatPhoneNumber(value);
    } else if (name === "customerFax") {
      formattedValue = formatPhoneNumber(value);
    } else if (name === "customerNo") {
      formattedValue = formatBusinessNumber(value);
    } else if (name === "corporateNo") {
      formattedValue = formatCorporateNumber(value);
    }
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: formattedValue,
    }));
  };

  const handleClose = () => {
    setCustomer(savedCustomer);
    onCancel();
  };

  const handleUpdate = () => {
    axios
      .put("/api/main/mainCustomerUpdate", {
        customerCode: customer.customerCode,
        customerName: customer.customerName,
        customerRep: customer.customerRep,
        customerNo: customer.customerNo,
        customerTel: customer.customerTel,
        customerFax: customer.customerFax,
        customerAddress: customer.customerAddress,
        customerAddressDetails: customer.customerAddressDetails,
        customerPost: customer.customerPost,
        customerNote: customer.customerNote,
      })
      .then((res) => res.data)
      .then((data) => {
        const message = data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setUpdateCheck(true);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  return (
    <Box>
      <DialogRoot open={cusViewOpen} size={"lg"} onOpenChange={handleClose}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>협력 업체 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {customer ? (
              <Box
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
                css={{ "--field-label-width": "85px" }}
              >
                <Box display="flex" gap={5}>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="업체" />}
                  >
                    <Input
                      name="customerName"
                      value={customer.customerName || ""}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="업체코드" />}
                  >
                    <Input
                      readOnly
                      value={customer.customerCode || ""}
                      variant={"subtle"}
                    />
                  </Field>
                </Box>
                <Box display="flex" gap={5}>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="취급 품목" />}
                  >
                    <Input
                      readOnly
                      name="itemName"
                      value={customer.itemName}
                      variant={"subtle"}
                    />
                  </Field>
                  <Field
                    orientation={"horizontal"}
                    label={<SpacedLabel text="업태" />}
                  >
                    <Input
                      readOnly
                      name={"industry"}
                      value={customer.industry}
                      variant={"subtle"}
                    />
                  </Field>
                </Box>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="대표자" />}
                >
                  <Input
                    name="customerRep"
                    value={customer.customerRep}
                    onChange={handleInputChange}
                  />
                </Field>
                <Box display="flex" gap={5}>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="사업자 번호" />}
                  >
                    <Input
                      name="customerNo"
                      value={customer.customerNo}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="법인 번호" />}
                  >
                    <Input
                      name="corporateNo"
                      value={customer.corporateNo}
                      onChange={handleInputChange}
                    ></Input>
                  </Field>
                </Box>
                <Box display="flex" gap={5}>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="전화번호" />}
                  >
                    <Input
                      name="customerTel"
                      value={customer.customerTel}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field
                    orientation="horizontal"
                    label={<SpacedLabel text="팩스" />}
                  >
                    <Input
                      name="customerFax"
                      value={customer.customerFax}
                      onChange={handleInputChange}
                    />
                  </Field>
                </Box>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="우편번호" />}
                >
                  <Input
                    name={"customerPost"}
                    value={customer.customerPost}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="주소" />}
                >
                  <Input
                    name={"customerAddress"}
                    value={customer.customerAddress}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="상세 주소" />}
                >
                  <Input
                    name={"customerAddressDetails"}
                    value={customer.customerAddressDetails}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field
                  orientation="horizontal"
                  label={<SpacedLabel text="비고" />}
                >
                  <Textarea
                    placeholder={"최대 50자"}
                    name={"customerNote"}
                    value={customer.customerNote}
                    onChange={handleInputChange}
                    maxHeight={"100px"}
                  />
                </Field>
                {/*<Field*/}
                {/*  orientation="horizontal"*/}
                {/*  label={<SpacedLabel text="사용여부" />}*/}
                {/*>*/}
                {/*  <Checkbox*/}
                {/*    transform="translateX(-2590%)"*/}
                {/*    name={"customerActive"}*/}
                {/*    checked={customer.customerActive}*/}
                {/*    onCheckedChange={(e) => {*/}
                {/*      const checked =*/}
                {/*        e.checked !== undefined ? e.checked : e.target.checked;*/}
                {/*      setCustomer((prevCustomer) => ({*/}
                {/*        ...prevCustomer,*/}
                {/*        customerActive: checked, // 상태 업데이트*/}
                {/*      }));*/}
                {/*    }}*/}
                {/*  />*/}
                {/*</Field>*/}
              </Box>
            ) : (
              <Text>고객 정보를 불러오는 중입니다...</Text>
            )}
          </DialogBody>
          <DialogFooter>
            <HStack>
              <DialogActionTrigger asChild>
                <Button variant="outline" onClick={handleClose}>
                  취소
                </Button>
              </DialogActionTrigger>
              <Tooltip
                content="입력을 완료해 주세요."
                openDelay={500}
                closeDelay={100}
                disabled={!disabled}
              >
                <Button onClick={handleUpdate} disabled={disabled}>
                  확인
                </Button>
              </Tooltip>
            </HStack>
            <DialogCloseTrigger />
          </DialogFooter>
        </DialogContent>
      </DialogRoot>
    </Box>
  );
}
