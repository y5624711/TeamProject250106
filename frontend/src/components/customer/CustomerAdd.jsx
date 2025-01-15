import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "../ui/button.jsx";
import {
  Heading,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";

function CustomerAdd({ onCancel }) {
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [itemCode, setItemCode] = useState("");
  const [itemCodeList, setItemCodeList] = useState([]);
  const [customerRep, setCustomerRep] = useState("");
  const [customerNo, setCustomerNo] = useState("");
  const [customerTel, setCustomerTel] = useState("");
  const [customerFax, setCustomerFax] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [customerAddressDetail, setCustomerAddressDetail] = useState("");
  const [customerPost, setCustomerPost] = useState("");
  const [customerNote, setCustomerNote] = useState("");

  // 물품 코드 불러오기
  useEffect(() => {
    axios
      .get("/api/customer/itemCode/list")
      .then((res) => setItemCodeList(res.data))
      .catch((error) => console.log("오류", error));
  }, []);
  console.log(itemCodeList);
  console.log("설정", itemCode);

  const handleSaveClick = () => {
    axios
      .post("api/customer/add", {
        customerCode,
        customerName,
        customerRep,
        itemCode,
        customerNo,
        customerTel,
        customerFax,
        customerPost,
        customerAddress,
        customerAddressDetail,
        customerNote,
      })
      .then();
  };

  return (
    <div>
      <Heading>협력 업체 등록</Heading>
      <Stack gap={5}>
        <Field label={"협력 업체 코드(차후 자동생성)"}>
          <Input
            required
            value={customerCode}
            onChange={(e) => setCustomerCode(e.target.value)}
          />
        </Field>
        <Field label={"협력 업체"}>
          <Input
            required
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />
        </Field>
        <Field label={"대표자"}>
          <Input
            value={customerRep}
            onChange={(e) => setCustomerRep(e.target.value)}
          />
        </Field>
        <SelectRoot
          value={itemCode}
          onValueChange={(e) => {
            console.log("설정2", e.value);
            setItemCode(e.value);
          }}
        >
          <SelectLabel>취급 품목</SelectLabel>
          <SelectTrigger>
            <SelectValueText>
              {itemCode != "" ? 1 : "품목 선택"}
            </SelectValueText>
          </SelectTrigger>
          <SelectContent>
            {itemCodeList.map((choice) => (
              <SelectItem
                item={choice}
                // key={choice.common_code_key}
                key={choice.common_code}
              >
                {choice.common_code_name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
        {/*<select*/}
        {/*  name="itemCode"*/}
        {/*  value={itemCode}*/}
        {/*  onChange={(e) => setItemCode(e.target.value)}*/}
        {/*>*/}
        {/*  <option value="">품목 구분</option>*/}
        {/*  {itemCodeList.map((code) => (*/}
        {/*    <option key={code.item_common_code} value={code.item_common_code}>*/}
        {/*      {code.item_common_name}*/}
        {/*    </option>*/}
        {/*  ))}*/}
        {/*</select>*/}
        {/*<Field label={"취급 물품"}>*/}
        {/*<Input*/}
        {/*  value={itemCode}*/}
        {/*  onChange={(e) => setItemCode(e.target.value)}*/}
        {/*/>*/}
        {/*</Field>*/}
        <Field label={"사업자 번호"}>
          <Input
            value={customerNo}
            onChange={(e) => setCustomerNo(e.target.value)}
          />
        </Field>
        <Field label={"전화 번호"}>
          <Input
            value={customerTel}
            onChange={(e) => setCustomerTel(e.target.value)}
          />
        </Field>
        <Field label={"팩스 번호"}>
          <Input
            value={customerFax}
            onChange={(e) => setCustomerFax(e.target.value)}
          />
        </Field>
        <Field label={"우편 번호"}>
          <Input
            value={customerPost}
            onChange={(e) => setCustomerPost(e.target.value)}
          />
        </Field>
        <Field label={"주소"}>
          <Input
            value={customerAddress}
            onChange={(e) => setCustomerAddress(e.target.value)}
          />
        </Field>
        <Field label={"상세 주소"}>
          <Input
            value={customerAddressDetail}
            onChange={(e) => setCustomerAddressDetail(e.target.value)}
          />
        </Field>
        <Field label={"비고"}>
          <Input
            value={customerNote}
            onChange={(e) => setCustomerNote(e.target.value)}
          />
        </Field>
      </Stack>
      <div>
        {/* 취소 버튼 */}
        <Button onClick={onCancel}>취소</Button>
        <Button onClick={handleSaveClick}>저장</Button>
      </div>
    </div>
  );
}

export default CustomerAdd;
