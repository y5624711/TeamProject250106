import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import { toaster } from "../ui/toaster.jsx";

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
      <Text>물품 조회 > 물품 상세 {itemKey}</Text>
      <HStack>
        {itemList.map((item) => (
          <Box key={item.itemKey}>
            <Box>
              {isEditing ? (
                <>
                  <Input readOnly value={item.itemCommonName} />
                  <Input readOnly value={item.customerName} />
                  <Input
                    name="size"
                    placeholder="규격"
                    value={editedItem.size}
                    onChange={handleChange}
                  />
                  <Input
                    name="unit"
                    placeholder="단위"
                    value={editedItem.unit}
                    onChange={handleChange}
                  />
                  <NumberInputRoot>
                    <NumberInputField
                      name="inputPrice"
                      placeholder="입고가"
                      value={editedItem.inputPrice}
                      onChange={handleChange}
                    />
                  </NumberInputRoot>
                  <NumberInputRoot>
                    <NumberInputField
                      name="outputPrice"
                      placeholder="출고가"
                      value={editedItem.outputPrice}
                      onChange={handleChange}
                    />
                  </NumberInputRoot>
                  <Input
                    name="itemNote"
                    placeholder="비고"
                    value={editedItem.itemNote}
                    onChange={handleChange}
                  />
                </>
              ) : (
                <>
                  <Box>{item.itemCommonName}</Box>
                  <Box>{item.customerName}</Box>
                  <Box>{item.size}</Box>
                  <Box>{item.unit}</Box>
                  <Box>{item.inputPrice}</Box>
                  <Box>{item.outputPrice}</Box>
                  <Box>{item.itemActive ? "사용" : "미사용"}</Box>
                  <Box>{item.itemNote}</Box>
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
