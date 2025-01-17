import React, { useEffect, useState } from "react";
import {
  Box,
  createListCollection,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Text,
} from "@chakra-ui/react";
import { Button } from "../ui/button.jsx";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import axios from "axios";
import { toaster } from "../ui/toaster.jsx";
import { Field } from "../ui/field.jsx";

export function ItemAdd({ onCancel, onAdd, setItemKey, setChange }) {
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [itemCommonName, setItemCommonName] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [customerCode, setCustomerCode] = useState("");
  const [size, setSize] = useState("");
  const [unit, setUnit] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [outputPrice, setOutputPrice] = useState("");
  const [itemNote, setItemNote] = useState("");
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [isValid, setIsValid] = useState(false);

  // 품목 구분 코드 가져오기
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

  // 품목 선택 시 협력업체 이름 가져오기
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

  // 품목 등록하기
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
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        onAdd(itemData);
        setItemKey(data.data.itemKey);
        setChange((prev) => !prev);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  const itemCommonCodes = createListCollection({
    items: itemCommonCodeList.map((itemCode) => {
      return {
        label: itemCode.item_common_name,
        value: itemCode.item_common_code,
      };
    }),
  });

  // 버튼 활성화를 위한 유효성 검사
  useEffect(() => {
    setIsValid(itemCommonCode && customerName && inputPrice && outputPrice);
  }, [itemCommonCode, customerName, inputPrice, outputPrice]);

  return (
    <Box>
      <Button onClick={onCancel}>취소</Button>
      <Stack>
        <SelectRoot
          onValueChange={(e) => {
            setItemCommonName(e.value);
            const selectedItem = itemCommonCodeList.find(
              (item) => item.item_common_name == e.value,
            );
            console.log("내부", selectedItem);
            if (selectedItem) {
              setItemCommonCode(selectedItem.item_common_code); // 선택된 품목 코드 설정
            }
          }}
        >
          <SelectLabel>
            품목{" "}
            <Text as="span" color="red.500">
              *
            </Text>
          </SelectLabel>
          <SelectTrigger>
            <SelectValueText>
              {itemCommonName != "" ? itemCommonName : "품목 선택"}
            </SelectValueText>
          </SelectTrigger>
          <SelectContent>
            {itemCommonCodes.items.map((item) => (
              <SelectItem item={item.label} key={item.value}>
                {item.label}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>

        <Field label={"담당업체"} required>
          <Input readOnly placeholder="담당업체" value={customerName} />
        </Field>
        <Field label={"규격"}>
          <Input
            placeholder="규격"
            value={size}
            onChange={(e) => setSize(e.target.value)}
          />
        </Field>
        <Field label={"단위"}>
          <Input
            placeholder="단위"
            value={unit}
            onChange={(e) => setUnit(e.target.value)}
          />
        </Field>
        <Field label={"입고가"} required>
          <NumberInputRoot>
            <NumberInputField
              placeholder="입고가"
              value={inputPrice}
              onChange={(e) => setInputPrice(e.target.value)}
            />
          </NumberInputRoot>
        </Field>
        <Field label={"출고가"} required>
          <NumberInputRoot>
            <NumberInputField
              placeholder="출고가"
              value={outputPrice}
              onChange={(e) => setOutputPrice(e.target.value)}
            />
          </NumberInputRoot>
        </Field>
        <Field label={"비고"}>
          <Input
            placeholder="비고"
            value={itemNote}
            onChange={(e) => setItemNote(e.target.value)}
          />
        </Field>
        <Button onClick={handleAddClick} disabled={!isValid}>
          등록
        </Button>
      </Stack>
    </Box>
  );
}
