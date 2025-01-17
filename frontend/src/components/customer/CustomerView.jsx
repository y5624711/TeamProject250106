import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { Field } from "../ui/field.jsx";

function CustomerView({ customerKey, onDelete, onEdit }) {
  const [customer, setCustomer] = useState(null);

  //정보 불러오기
  useEffect(() => {
    if (customerKey) {
      axios
        .get(`/api/customer/view/${customerKey}`)
        .then((res) => setCustomer(res.data))
        .catch((error) => console.error("오류 발생", error));
    }
  }, [customerKey]);

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

  return (
    <div>
      <Heading>협력 업체 정보</Heading>
      <Stack gap={5}>
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
        <Field label={"대표자"}>
          <Input
            name="customerRep"
            value={customer.customerRep}
            onChange={handleInputChange}
          />
        </Field>
        <Field label={"품목 코드"}>
          <Input readOnly name="itemCode" value={customer.itemCode} />
        </Field>
        <Field label={"사업자 번호"}>
          <Input
            name="customerNo"
            value={customer.customerNo}
            onChange={handleInputChange}
          />
        </Field>
        <Field label={"전화 번호"}>
          <Input
            name="customerTel"
            value={customer.customerTel}
            onChange={handleInputChange}
          />
        </Field>
        <Field label={"팩스 번호"}>
          <Input
            name="customerFax"
            value={customer.customerFax}
            onChange={handleInputChange}
          />
        </Field>
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
            name={"customerAddressDetail"}
            value={customer.customerAddressDetail}
            onChange={handleInputChange}
          />
        </Field>
        <Field label={"비고"}>
          <Textarea
            name={"customerNote"}
            value={customer.customerNote}
            onChange={handleInputChange}
          />
        </Field>
      </Stack>
      <div>
        <Button onClick={onDelete}>삭제</Button>
        <Button onClick={() => onEdit(customer)}>수정</Button>
      </div>
    </div>
  );
}

export default CustomerView;
