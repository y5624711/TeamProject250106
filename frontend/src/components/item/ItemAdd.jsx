import React, { useEffect, useState } from "react";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import axios from "axios";

export function ItemAdd() {
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);

  // 물품 구분 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/item/commonCode")
      .then((res) => {
        setItemCommonCodeList(res.data);
      })
      .catch((error) => {
        console.error("데이터 로딩 중 오류 발생: ", error);
      });
  }, []);

  // 물품 선택 시 협력업체 이름 가져오기
  useEffect(() => {
    if (itemCommonCode) {
      axios
        .get(`/api/item/customer/${itemCommonCode}`)
        .then((res) => {
          const customerName = res.data[0]?.customerName || "없음";
          const customerCode = res.data[0]?.customerCode || "";

          setCustomerName(customerName);
          setCustomerCode(customerCode);
        })
        .catch((error) => {
          console.error("협력업체 정보 로드 중 오류 발생: ", error);
          setCustomerName(""); // 오류 시 초기화
        });
    } else {
      setCustomerName(""); // 선택 해제 시 초기화
    }
  }, [itemCommonCode]);

  // 물품 등록하기
  const handleAddClick = () => {
    const itemData = {
      itemCommonCode,
      customerCode,
      size,
      unit,
      inputPrice,
      outputPrice,
      itemNote,
    };

    axios
      .post("/api/item/add", itemData)
      .then((res) => {
        const message = res.data.message;
        console.log(message);
      })
      .catch((e) => {
        const message = e.response.data.message;
        console.log(message);
      });
  };

  return (
    <Box>
      <Text>물품 등록 </Text>
      <Stack>
        <select
          value={itemCommonCode}
          onChange={(e) => setItemCommonCode(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #E2E8F0",
          }}
        >
          <option value="">품목 구분</option>
          {itemCommonCodeList.map((code) => (
            <option key={code.item_common_code} value={code.item_common_code}>
              {code.item_common_name}
            </option>
          ))}
        </select>

        <Input
          placeholder="담당업체"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <Input
          placeholder="규격"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        />
        <Input
          placeholder="단위"
          value={unit}
          onChange={(e) => setUnit(e.target.value)}
        />
        <NumberInputRoot>
          <NumberInputField
            placeholder="입고가"
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
          />
        </NumberInputRoot>
        <NumberInputRoot>
          <NumberInputField
            placeholder="출고가"
            value={outputPrice}
            onChange={(e) => setOutputPrice(e.target.value)}
          />
        </NumberInputRoot>
        <Input
          placeholder="비고"
          value={itemNote}
          onChange={(e) => setItemNote(e.target.value)}
        />
        <Button onClick={handleAddClick}>등록</Button>
      </Stack>
    </Box>
  );
}
