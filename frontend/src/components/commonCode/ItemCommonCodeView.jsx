import React, { useEffect, useState } from "react";
import { Box, Input } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import axios from "axios";

export function ItemCommonCodeView({
  itemCommonCodeKey,
  setCommonCodeList,
  setChange,
}) {
  const [itemCommonCode, setItemCommonCode] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editedItem, setEditedItem] = useState({
    itemCommonCode: "",
    itemCommonName: "",
    itemCommonCodeNote: "",
  });

  // 수정 상태에서 물품 공통 코드 변경 시 수정 상태 해제
  useEffect(() => {
    setIsEditing(false);
  }, [itemCommonCodeKey]);

  // 물품 공통 코드 상세 정보 가져오기
  useEffect(() => {
    if (itemCommonCodeKey) {
      axios
        .get(`/api/commonCode/item/view/${itemCommonCodeKey}`)
        .then((res) => {
          setItemCommonCode(res.data[0]);
          setEditedItem(res.data[0]);
        })
        .catch((error) => {
          console.error("물품 공통 코드 정보 요청 중 오류 발생: ", error);
        });
    }
  }, [itemCommonCodeKey]);
  console.log(itemCommonCode.itemCommonCode);

  return (
    <Box>
      <Field label={"품목코드"}>
        <Input readOnly value={itemCommonCode.itemCommonCode} />
      </Field>
      <Field label={"품목명"}>
        <Input readOnly value={itemCommonCode.itemCommonName} />
      </Field>
      <Field label={"비고"}>
        <Input readOnly value={itemCommonCode.itemCommonCodeNote} />
      </Field>
    </Box>
  );
}
