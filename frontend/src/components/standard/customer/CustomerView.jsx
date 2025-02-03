import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, HStack, Input, Stack, Textarea } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { Field } from "../../ui/field.jsx";
import {
  DialogActionTrigger,
  DialogBody,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogRoot,
  DialogTitle,
} from "../../ui/dialog.jsx";
import { DialogConfirmation } from "../../tool/DialogConfirmation.jsx";

function CustomerView({ isOpen, onCancel, customerKey, onDelete, onEdit }) {
  const [customer, setCustomer] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  // const [isDeleted, setIsDeleted] = useState(false);

  //정보 불러오기
  useEffect(() => {
    if (customerKey) {
      axios
        .get(`/api/customer/view/${customerKey}`)
        .then((res) => setCustomer(res.data))
        .catch((error) => console.error("오류 발생", error));
    }
  }, [customerKey]);

  // console.log(customer);

  if (!customer) {
    return <p>로딩 중이거나 고객 정보가 없습니다.</p>;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  const handleClose = () => {
    // setIsEditing(false);
    onCancel();
  };

  return (
    <Box>
      <DialogRoot
        open={isOpen}
        onOpenChange={() => {
          onCancel();
          handleClose();
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>협력 업체 정보</DialogTitle>
          </DialogHeader>
          <DialogBody>
            <Stack gap={5}>
              <Box display={"flex"} gap={3}>
                <Field label={"업체 코드"}>
                  <Input readOnly value={customer.customerCode} />
                </Field>
                <Field label={"업체명"}>
                  <Input
                    name="customerName"
                    value={customer.customerName}
                    onChange={handleInputChange}
                  />
                </Field>
              </Box>
              <Field label={"대표자"}>
                <Input
                  name="customerRep"
                  value={customer.customerRep}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label={"취급 품목"}>
                <Input readOnly name="itemName" value={customer.itemName} />
              </Field>
              <Field label={"사업자 번호"}>
                <Input
                  name="customerNo"
                  value={customer.customerNo}
                  onChange={handleInputChange}
                />
              </Field>
              <Box display={"flex"} gap={3}>
                <Field label={"전화번호"}>
                  <Input
                    name="customerTel"
                    value={customer.customerTel}
                    onChange={handleInputChange}
                  />
                </Field>
                <Field label={"팩스"}>
                  <Input
                    name="customerFax"
                    value={customer.customerFax}
                    onChange={handleInputChange}
                  />
                </Field>
              </Box>
              <Field label={"우편 번호"}>
                <Input
                  name={"customerPost"}
                  value={customer.customerPost}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label={"주소"}>
                <Input
                  name={"customerAddress"}
                  value={customer.customerAddress}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label={"상세 주소"}>
                <Input
                  name={"customerAddressDetails"}
                  value={customer.customerAddressDetails}
                  onChange={handleInputChange}
                />
              </Field>
              <Field label={"비고"}>
                <Textarea
                  name={"customerNote"}
                  value={customer.customerNote}
                  onChange={handleInputChange}
                  resize="none"
                />
              </Field>
            </Stack>
          </DialogBody>
          <DialogFooter>
            {customer.customerActive ? (
              <HStack>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={handleClose}>
                    취소
                  </Button>
                </DialogActionTrigger>
                <Button onClick={() => onEdit(customer)}>수정</Button>
                <Button onClick={setIsDialogOpen} colorPalette={"red"}>
                  삭제
                </Button>
              </HStack>
            ) : (
              <HStack>
                <DialogActionTrigger asChild>
                  <Button variant="outline" onClick={handleClose}>
                    목록으로
                  </Button>
                </DialogActionTrigger>
              </HStack>
            )}
          </DialogFooter>
        </DialogContent>
      </DialogRoot>

      <DialogConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={onDelete}
        title="삭제 확인"
        body="해당 협력업체 정보를 삭제하시겠습니까?"
      />
    </Box>
  );
}

export default CustomerView;
