import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Input } from "@chakra-ui/react";
import axios from "axios";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import { toaster } from "../ui/toaster.jsx";
import { Field } from "../ui/field.jsx";

export function ItemView({ itemKey }) {
  const [itemList, setItemList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState({
    itemCommonCode: "",
    customerName: "",
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemActive: false,
    itemNote: "",
  });
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);

  // 물품 상세 정보를 가져오기
  useEffect(() => {
    if (itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItemList(res.data);
          setEditedItem(res.data[0]); // 첫 번째 물품 정보로 상태 설정
        })
        .catch((error) => {
          console.error("물품 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey]);

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

  // 폼 입력 값 변경 처리
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem((prevItem) => ({
      ...prevItem,
      [name]: value,
    }));
  };

  // 수정 버튼 클릭 시
  const handleEditClick = () => {
    setIsEditing(true);
  };

  // 수정된 물품 데이터 서버로 전송
  const handleSubmitClick = () => {
    axios
      .put(`/api/item/edit/${itemKey}`, editedItem)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        setIsEditing(false);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 물품 삭제 시 사용여부 false
  const handleDeleteClick = () => {
    axios
      .put(`/api/item/delete/${itemKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
      })
      .catch((error) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <Box>
      <HStack>
        {itemList.map((item) => (
          <Box key={item.itemKey}>
            <Box>
              {isEditing ? (
                <>
                  <Field label={"품목"}>
                    <Input readOnly value={item.itemCommonName} />
                  </Field>
                  <Field label={"담당업체"}>
                    <Input readOnly value={item.customerName} />
                  </Field>
                  <Field label={"규격"}>
                    <Input
                      name="size"
                      placeholder="규격"
                      value={editedItem.size}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label={"단위"}>
                    <Input
                      name="unit"
                      placeholder="단위"
                      value={editedItem.unit}
                      onChange={handleChange}
                    />
                  </Field>
                  <Field label={"입고가"}>
                    <NumberInputRoot>
                      <NumberInputField
                        name="inputPrice"
                        placeholder="입고가"
                        value={editedItem.inputPrice}
                        onChange={handleChange}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field label={"출고가"}>
                    <NumberInputRoot>
                      <NumberInputField
                        name="outputPrice"
                        placeholder="출고가"
                        value={editedItem.outputPrice}
                        onChange={handleChange}
                      />
                    </NumberInputRoot>
                  </Field>
                  <Field label={"비고"}>
                    <Input
                      name="itemNote"
                      placeholder="비고"
                      value={editedItem.itemNote}
                      onChange={handleChange}
                    />
                  </Field>
                </>
              ) : (
                <>
                  <Field label={"품목"}>
                    <Input readOnly value={item.itemCommonName} />
                  </Field>
                  <Field label={"담당업체"}>
                    <Input readOnly value={item.customerName} />
                  </Field>
                  <Field label={"규격"}>
                    <Input readOnly value={item.size} />
                  </Field>
                  <Field label={"단위"}>
                    <Input readOnly value={item.unit} />
                  </Field>
                  <Field label={"입고가"}>
                    <Input readOnly value={item.inputPrice} />
                  </Field>
                  <Field label={"출고가"}>
                    <Input readOnly value={item.outputPrice} />
                  </Field>
                  <Field label={"사용여부"}>
                    <Input
                      readOnly
                      value={item.itemActive ? "사용" : "미사용"}
                    />
                  </Field>
                  <Field label={"비고"}>
                    <Input readOnly value={item.itemNote} />
                  </Field>
                </>
              )}
            </Box>
          </Box>
        ))}
      </HStack>

      <Button onClick={handleDeleteClick}>삭제</Button>
      {isEditing ? (
        <Button onClick={handleSubmitClick}>수정 저장</Button>
      ) : (
        <Button onClick={handleEditClick}>수정</Button>
      )}
    </Box>
  );
}
