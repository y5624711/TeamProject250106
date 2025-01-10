import React, { useEffect, useState } from "react";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import axios from "axios";

export function ItemAdd() {
  const [itemCode, setItemCode] = useState("");
  const [itemName, setItemName] = useState("");
  const [partnerName, setPartnerName] = useState("");
  const [managerName, setManagerName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [inPrice, setInPrice] = useState("");
  const [outPrice, setOutPrice] = useState("");
  const [tax, setTax] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [note, setNote] = useState("");
  const [itemCommonCode, setItemCommonCode] = useState([]);

  // 물품 구분 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/item/commonCode")
      .then((res) => {
        setItemCommonCode(res.data);
      })
      .catch((error) => {
        console.error("데이터 로딩 중 오류 발생: ", error);
      });
  }, []);

  // 물품 등록하기
  const handleAddClick = () => {
    const itemData = {
      itemCode,
      itemName,
      partnerName,
      managerName,
      size,
      unit,
      inPrice,
      outPrice,
      tax,
      minimumStock,
      note,
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
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
          style={{
            width: "100%",
            padding: "8px",
            borderRadius: "6px",
            border: "1px solid #E2E8F0",
          }}
        >
          <option value="">품목 구분</option>
          {itemCommonCode.map((code) => (
            <option key={code.item_code} value={code.item_code}>
              {code.item_code_name}
            </option>
          ))}
        </select>

        <Input
          placeholder="품목명"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
        <Input
          placeholder="담당업체명"
          value={partnerName}
          onChange={(e) => setPartnerName(e.target.value)}
        />
        <Input
          placeholder="취급 담당자명"
          value={managerName}
          onChange={(e) => setManagerName(e.target.value)}
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
        <Input
          placeholder="입고가"
          value={inPrice}
          onChange={(e) => setInPrice(e.target.value)}
        />
        <Input
          placeholder="출고가"
          value={outPrice}
          onChange={(e) => setOutPrice(e.target.value)}
        />
        <Input
          placeholder="과세구분"
          value={tax}
          onChange={(e) => setTax(e.target.value)}
        />
        <Input
          placeholder="기초재고량"
          value={minimumStock}
          onChange={(e) => setMinimumStock(e.target.value)}
        />
        <Input
          placeholder="비고"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <Button onClick={handleAddClick}>등록</Button>
      </Stack>
    </Box>
  );
}
