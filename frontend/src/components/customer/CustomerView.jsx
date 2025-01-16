import React, { useEffect, useState } from "react";
import axios from "axios";
import { Heading, Input, Stack, Textarea } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { Field } from "../ui/field.jsx";
import { toaster } from "../ui/toaster.jsx";

function CustomerView({ customerKey }) {
  const [customer, setCustomer] = useState(null);

  // //정보 불러오기
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

  // console.log(customerKey);
  // console.log(customer);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCustomer((prevCustomer) => ({
      ...prevCustomer,
      [name]: value,
    }));
  };

  //수정 버튼
  const handleEditClick = () => {
    // console.log(customer);
    axios
      .put("api/customer/edit", customer)
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

  const handleDeleteClick = () => {
    axios
      .put(`api/customer/delete/${customerKey}`)
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
        <Field label={"품목 코드(차후 셀렉트)"}>
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
        <Button onClick={handleDeleteClick}>삭제</Button>
        <Button onClick={handleEditClick}>수정</Button>
      </div>
    </div>
  );
}

export default CustomerView;
