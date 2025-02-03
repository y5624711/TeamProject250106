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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleClose = () => {
    setCustomer(savedCustomer);
    onCancel();
  };

  const handleUpdate = () => {
    axios
      .put("/api/main/mainCustomerUpdate", {
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
              >
                <HStack>
                  <Field orientation="horizontal" label={"업체명"}>
                    <Input
                      name="customerName"
                      value={customer.customerName || ""}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field orientation="horizontal" label={"업체 코드"}>
                    <Input readOnly value={customer.customerCode || ""} />
                  </Field>
                </HStack>
                <Field orientation="horizontal" label={"취급 품목"}>
                  <Input readOnly name="itemName" value={customer.itemName} />
                </Field>
                <HStack>
                  <Field orientation="horizontal" label={"대표자"}>
                    <Input
                      name="customerRep"
                      value={customer.customerRep}
                      onChange={handleInputChange}
                    />
                  </Field>

                  <Field orientation="horizontal" label={"사업자 번호"}>
                    <Input
                      name="customerNo"
                      value={customer.customerNo}
                      onChange={handleInputChange}
                    />
                  </Field>
                </HStack>
                <HStack>
                  <Field orientation="horizontal" label={"전화번호"}>
                    <Input
                      name="customerTel"
                      value={customer.customerTel}
                      onChange={handleInputChange}
                    />
                  </Field>
                  <Field orientation="horizontal" label={"팩스"}>
                    <Input
                      name="customerFax"
                      value={customer.customerFax}
                      onChange={handleInputChange}
                    />
                  </Field>
                </HStack>
                <Field orientation="horizontal" label={"우편번호"}>
                  <Input
                    name={"customerPost"}
                    value={customer.customerPost}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field orientation="horizontal" label={"주소"}>
                  <Input
                    name={"customerAddress"}
                    value={customer.customerAddress}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field orientation="horizontal" label={"상세 주소"}>
                  <Input
                    name={"customerAddressDetails"}
                    value={customer.customerAddressDetails}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field orientation="horizontal" label={"비고"}>
                  <Textarea
                    style={{ maxHeight: "100px", overflowY: "auto" }}
                    placeholder="최대 50자"
                    name={"customerNote"}
                    value={customer.customerNote}
                    onChange={handleInputChange}
                  />
                </Field>
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
