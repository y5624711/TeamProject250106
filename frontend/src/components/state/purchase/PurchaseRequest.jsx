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

export function PurchaseRequest({ onSave, onClose }) {
  const { id, name } = useContext(AuthenticationContext);
  const [itemCommonCode, setItemCommonCode] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [amount, setAmount] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [purchaseRequestDate, setPurchaseRequestDate] = useState(new Date());
  const [purchaseRequestNote, setPurchaseRequestNote] = useState("");
  const [itemData, setItemData] = useState({
    itemCommonName: "",
    itemCommonCode: "",
  });
  const [itemCommonCodeList, setItemCommonCodeList] = useState([]);

  // 품목 구분 코드 가져오기 (UI에서 품목명을 보여줘야 되는데 우리는 코드를 사용해서 -> 품목 구분 코드를 가져와야 함)
  useEffect(() => {
    axios
      .get("/api/item/commonCode")
      .then((res) => setItemCommonCodeList(res.data))
      .catch((e) => console.error("데이터 로딩 중 오류 발생:", e));
  }, []);

  // 품목 선택 시 협력업체 이름 가져오기
  useEffect(() => {
    // itemCommonCode 값이 변경될 때 실행
    if (itemData.itemCommonCode) {
      console.log("itemCommonCode 변경됨:", itemData.itemCommonCode);
      axios
        .get(`/api/item/customer/${itemData.itemCommonCode}`)
        .then((res) => {
          const customerData = res.data[0] || {}; // 응답 데이터에서 첫 번째 협력업체 정보 가져오기
          setItemData((prev) => ({
            ...prev,
            customerName: customerData.customerName || "없음",
            customerCode: customerData.customerCode || "",
          }));
        })
        .catch((error) => {
          console.error("협력업체 정보 로드 중 오류 발생: ", error);

          // 오류 발생 시 협력업체 정보 초기화
          setItemData((prev) => ({
            ...prev,
            customerName: "",
            customerCode: "",
          }));
        });
    }
  }, [itemData.itemCommonCode]);

  const handleSaveClick = () => {
    axios
      .post("/api/purchase/request", {
        employeeNo: id,
        employeeName: name,
        itemCommonCode: itemData.itemCommonCode,
        customerCode: itemData.customerCode,
        amount,
        purchaseRequestDate: purchaseRequestDate.toISOString(),
        purchaseRequestNote,
      })
      .then((res) => {
        console.log("응답 데이터:", res);
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        // 신청 성공 시 추가 작업 수행
        if (res.data && res.data.purchaseRequestKey) {
          onSave({
            purchaseRequestKey: res.data.purchaseRequestKey,
            employeeNo: id,
            employeeName: name,
            itemCommonCode: itemData.itemCommonCode,
            customerCode: itemData.customerCode,
            amount,
            purchaseRequestDate: purchaseRequestDate.toISOString(),
            purchaseRequestNote,
          });
        }
        onClose();
      })
      .catch((e) => {
        console.error("신청 오류:", e);
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  const handleCancelClick = () => {
    // 취소 버튼 클릭 시 입력된 값 초기화
    setItemCommonCode("");
    setCustomerName("");
    setAmount("");
    setInputPrice("");
    setPurchaseRequestDate(new Date());
    setPurchaseRequestNote("");
    onClose();
  };

  return (
    <Box>
      <Field label="품목" orientation="horizontal" required mb={15}>
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
              width: "380px",
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
      <Field label="담당 업체" orientation="horizontal" required mb={15}>
        <Input
          value={itemData.customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </Field>
      <Box display="flex" gap={4}>
        <Field label="수량" orientation="horizontal" required mb={15}>
          <Input
            type="number"
            value={amount || 1}
            onChange={(e) => {
              const value = parseInt(e.target.value, 10);
              setAmount(value >= 1 ? value : 1);
            }}
            min={1}
          />
        </Field>
        <Field label="가격" orientation="horizontal" required mb={15}>
          <Input
            value={inputPrice}
            onChange={(e) => setInputPrice(e.target.value)}
          />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="신청자" orientation="horizontal" required mb={15}>
          <Input value={name} />
        </Field>
        <Field label="사번" orientation="horizontal" required mb={15}>
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
        <Button onClick={handleSaveClick}>신청</Button>
      </Box>
    </Box>
  );
}
