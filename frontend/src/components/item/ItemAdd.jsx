import React, { useState } from "react";
import { Box, Input, Stack, Text } from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import axios from "axios";

export function ItemAdd() {
  const [itemCode, setItemCode] = useState("");
  const [itemType, setItemType] = useState("");
  const [managerId, setManagerId] = useState("");
  const [name, setName] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [inPrice, setInPrice] = useState("");
  const [outPrice, setOutPrice] = useState("");
  const [tax, setTax] = useState("");
  const [minimumStock, setMinimumStock] = useState("");
  const [note, setNote] = useState("");

  const handleAddClick = () => {
    const itemData = {
      itemCode,
      itemType,
      managerId,
      name,
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
      <Text>물품 등록</Text>
      <Stack>
        <Input
          placeholder="품목 코드"
          value={itemCode}
          onChange={(e) => setItemCode(e.target.value)}
        />
        <Input
          placeholder="품목 구분"
          value={itemType}
          onChange={(e) => setItemType(e.target.value)}
        />
        <Input
          placeholder="취급 담당자 코드"
          value={managerId}
          onChange={(e) => setManagerId(e.target.value)}
        />
        <Input
          placeholder="품목명"
          value={name}
          onChange={(e) => setName(e.target.value)}
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
