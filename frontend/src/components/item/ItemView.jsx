import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Input, Text } from "@chakra-ui/react";
import axios from "axios";
import { NumberInputField, NumberInputRoot } from "../ui/number-input.jsx";
import { toaster } from "../ui/toaster.jsx";
import { Field } from "../ui/field.jsx";
import { DialogConfirmation } from "../tool/DialogConfirmation.jsx";

export function ItemView({ itemKey, setItemList, setSearchParams, setChange }) {
  const [item, setItem] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({
    size: "",
    unit: "",
    inputPrice: "",
    outputPrice: "",
    itemActive: false,
    itemNote: "",
  });

  // 수정 상태에서 물품 정보 변경 시 수정 상태 해제
  useEffect(() => {
    setIsEditing(false);
  }, [itemKey]);

  // 물품 상세 정보를 가져오기
  useEffect(() => {
    if (itemKey) {
      axios
        .get(`/api/item/view/${itemKey}`)
        .then((res) => {
          setItem(res.data);
          setEditedItem(res.data[0]); // 첫 번째 물품 정보로 상태 설정
        })
        .catch((error) => {
          console.error("물품 상세 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemKey]);

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
        // 수정된 항목을 부모 컴포넌트에 전달하여 상태를 갱신
        setItemList((prevItems) =>
          prevItems.map((item) =>
            item.itemKey === itemKey ? { ...item, ...editedItem } : item,
          ),
        );
        // 수정 시에 정렬된 리스트를 불러오기 위해 변경 상태 전달
        setChange((prev) => !prev);

        setSearchParams((prev) => new URLSearchParams(prev));
        // 물품 수정 후, item를 직접 업데이트하여 view에 바로 반영되도록 함
        setItem((prevList) =>
          prevList.map((item) =>
            item.itemKey === itemKey ? { ...item, ...editedItem } : item,
          ),
        );
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  // 물품 삭제 시 사용여부 false
  const handleDeleteConfirm = () => {
    axios
      .put(`/api/item/delete/${itemKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          description: data.message.text,
          type: data.message.type,
        });
        // 삭제 후 부모 컴포넌트로 삭제된 항목을 반영
        setItemList((prevItems) =>
          prevItems.filter((item) => item.itemKey !== itemKey),
        );
        setIsDialogOpen(false);
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({ description: message.text, type: message.type });
      });
  };

  return (
    <Box>
      <HStack>
        {item.map((item) => (
          <Box key={item.itemKey}>
            <Box>
              {isEditing ? (
                <>
                  <Text fontSize={"xs"}>품목 수정은 불가능합니다.</Text>
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
      <Box>
        {isEditing ? (
          <HStack>
            <Button onClick={handleSubmitClick}>저장</Button>
            <Button onClick={() => setIsEditing(false)}>취소</Button>
          </HStack>
        ) : (
          <HStack>
            <Button onClick={handleEditClick}>수정</Button>
            <Button onClick={() => setIsDialogOpen(true)}>삭제</Button>
          </HStack>
        )}
      </Box>

      <DialogConfirmation
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onConfirm={handleDeleteConfirm}
        title="삭제 확인"
        body="정말로 이 항목을 삭제하시겠습니까?"
      />
    </Box>
  );
}
