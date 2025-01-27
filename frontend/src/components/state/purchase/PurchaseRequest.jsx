import {
  Box,
  Button,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Textarea,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function PurchaseRequest({ onSave, onClose }) {
  const { id, name } = useContext(AuthenticationContext);
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState(1);
  const [purchaseRequestNote, setPurchaseRequestNote] = useState("");
  const [itemData, setItemData] = useState({
    itemCommonName: "",
    itemCommonCode: "",
    inputPrice: 0,
  });
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  // 품목 구분 코드 가져오기
  useEffect(() => {
    axios
      .get("/api/purchase/commonCode")
      .then((res) => setItemCommonCodeList(res.data))
      .catch((e) => console.error("데이터 로딩 중 오류 발생:", e));
  }, []);

  // 품목 선택 시 해당 품목에 대한 협력 업체, 가격 가져오기
  useEffect(() => {
    if (itemData.itemCommonCode) {
      console.log("품목:", itemData.itemCommonCode);
      axios
        .get(`/api/purchase/customer/${itemData.itemCommonCode}`)
        .then((res) => {
          const customerData = res.data[0] || {};
          setItemData((prev) => ({
            ...prev,
            customerName: customerData.customerName || "없음",
            customerCode: customerData.customerCode || "",
            inputPrice: customerData.inputPrice || "",
          }));
        })
        .catch((error) => {
          console.error("협력 업체 정보 로드 중 오류 발생: ", error);
          setItemData((prev) => ({
            ...prev,
            customerName: "",
            customerCode: "",
            inputPrice: "",
          }));
        });
    }
  }, [itemData.itemCommonCode]);

  // 유효성 검사
  useEffect(() => {
    const isValid = validate();
    setIsButtonDisabled(!isValid);
  }, [itemData, amount]);

  const validate = () => {
    const itemCommonCodeValid =
      itemData.itemCommonCode != null && itemData.itemCommonCode.trim() !== "";
    const customerCodeValid =
      itemData.customerCode != null && itemData.customerCode.trim() !== "";
    const amountValid = amount != null && amount > 0;

    return itemCommonCodeValid && customerCodeValid && amountValid;
  };

  // 수량 변경 시 가격에 수량 곱한 값으로 표시
  const handleAmountChange = (e) => {
    const value = parseInt(e.target.value, 10);
    setAmount(value >= 1 ? value : 1);
  };

  // 구매 신청하기
  const handleSaveClick = () => {
    const requestAmount = amount && amount > 0 ? amount : 1; // 수량 기본값 1로 설정
    axios
      .post("/api/purchase/request", {
        employeeNo: id,
        employeeName: name,
        itemCommonCode: itemData.itemCommonCode,
        customerCode: itemData.customerCode,
        amount: requestAmount,
        inputPrice: itemData.inputPrice,
        purchaseRequestNote,
      })
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        onClose();
      })
      .catch((e) => {
        console.error("신청 오류:", e);
        const message = e.response?.data?.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  // 취소 버튼 클릭 시 창 닫기
  const handleCancelClick = () => {
    onClose();
  };

  return (
    <Box>
      <Field label="품목" orientation="horizontal" mb={15}>
        <SelectRoot
          onValueChange={(e) => {
            const selectedItem = itemCommonCodeList.find(
              (item) => item.item_common_name === e.value[0],
            );
            setItemData((prev) => ({
              ...prev,
              itemCommonName: selectedItem?.item_common_name,
              itemCommonCode: selectedItem?.item_common_code || "",
            }));
          }}
        >
          <SelectTrigger>
            <SelectValueText>
              {itemData.itemCommonName || "품목 선택"}
            </SelectValueText>
          </SelectTrigger>
          <SelectContent
            style={{
              width: "280px",
              position: "absolute",
            }}
          >
            {itemCommonCodeList.map((item) => (
              <SelectItem
                key={item.item_common_code}
                item={item.item_common_name}
              >
                {item.item_common_name}
              </SelectItem>
            ))}
          </SelectContent>
        </SelectRoot>
      </Field>
      <Field label="담당 업체" orientation="horizontal" mb={15}>
        <Input
          value={itemData.customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Field>
      <Box display="flex" gap={4}>
        <Field label="수량" orientation="horizontal" mb={15}>
          <Input
            type="number"
            value={amount}
            onChange={handleAmountChange}
            min={1}
          />
        </Field>
        <Field label="가격" orientation="horizontal" mb={15}>
          <Input value={itemData.inputPrice * amount} isReadOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="신청자" orientation="horizontal" mb={15}>
          <Input value={name} />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={id} />
        </Field>
      </Box>
      <Field label="신청 비고" orientation="horizontal" mb={15}>
        <Textarea
          value={purchaseRequestNote}
          onChange={(e) => setPurchaseRequestNote(e.target.value)}
          placeholder={"최대 50자"}
        />
      </Field>
      <Box display="flex" gap={4} justifyContent="flex-end">
        <Button variant="outline" onClick={handleCancelClick}>
          취소
        </Button>
        <Tooltip
          content="입력을 완료해 주세요."
          openDelay={500}
          closeDelay={100}
        >
          <Button onClick={handleSaveClick} disabled={isButtonDisabled}>
            신청
          </Button>
        </Tooltip>
      </Box>
    </Box>
  );
}
