import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Spinner } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

export function PurchaseApprove({ isOpen, onClose, purchaseRequestKey }) {
  const { id, name } = useContext(AuthenticationContext);
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showPurchaseNo, setShowPurchaseNo] = useState(false);
  const [showButton, setShowButton] = useState(true);

  // 구매 승인 팝업 보기
  useEffect(() => {
    const purchaseData = () => {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((res) => {
          console.log("구매 데이터:", res.data);
          setPurchase(res.data);
          setLoading(false);

          // 이미 발주 번호가 있으면 승인 버튼 숨기고 발주 번호 표시
          if (res.data.purchaseNo) {
            setShowPurchaseNo(true);
            setShowButton(false);
          }
        })
        .catch((error) => {
          console.error("구매 데이터를 가져오는 데 실패했습니다:", error);
        });
    };

    if (purchaseRequestKey) {
      purchaseData();
    }
  }, [purchaseRequestKey]);

  // 구매 요청 승인
  const handleApprove = () => {
    const updatedPurchase = {
      ...purchase,
      customerEmployeeNo: id,
      warehouseCode: purchase.warehouseCode,
    };
    console.log("구매 승인:", updatedPurchase);

    axios
      .post(
        `/api/purchase/approve/${purchase.purchaseRequestKey}`,
        updatedPurchase,
      )
      .then((res) => {
        console.log("구매 승인 응답:", res.data);
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        if (res.data.purchaseNo) {
          setPurchase((prevPurchase) => ({
            ...prevPurchase,
            purchaseNo: res.data.purchaseNo,
          }));
          setShowPurchaseNo(true);
          setShowButton(false);
        }
      })
      .catch((e) => {
        console.error("구매 승인 실패:", e);
        const message = e.res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  // 구매 요청 반려
  const handleReject = () => {
    console.log("구매 반려:", purchase);
    setShowButton(false);
    onClose();
  };

  if (loading) {
    return <Spinner />;
  }

  if (!purchase) {
    return <p>구매 정보를 가져오는 데 실패했습니다.</p>;
  }

  return (
    <Box>
      <Box display="flex" gap={4}>
        <Field label="직원 사번" orientation="horizontal" mb={7}>
          <Input value={purchase.employeeNo} placeholder="직원 사번" readOnly />
        </Field>
        <Field label="직원 이름" orientation="horizontal" mb={7}>
          <Input
            value={purchase.employeeName}
            placeholder="직원 이름"
            readOnly
          />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="승인자 사번" orientation="horizontal" mb={7}>
          <Input value={id} placeholder="승인자 사번" readOnly />
        </Field>
        <Field label="승인자 이름" orientation="horizontal" mb={7}>
          <Input value={name} placeholder="승인자 이름" readOnly />
        </Field>
      </Box>
      <Field label="품목" orientation="horizontal" mb={7}>
        <Input value={purchase.itemCommonName} placeholder="품목" readOnly />
      </Field>
      <Box display="flex" gap={4}>
        <Field label="담당 업체" orientation="horizontal" mb={7}>
          <Input
            value={purchase.customerName}
            placeholder="담당 업체"
            readOnly
          />
        </Field>
        <Field label="창고" orientation="horizontal" mb={7}>
          <Input
            value={purchase?.warehouseName || "창고 정보 없음"}
            placeholder="창고"
            readOnly
          />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="수량" orientation="horizontal" mb={7}>
          <Input value={purchase.amount} placeholder="수량" readOnly />
        </Field>
        <Field label="가격" orientation="horizontal" mb={7}>
          <Input value={purchase.inputPrice} placeholder="가격" readOnly />
        </Field>
      </Box>
      <Field label="요청 날짜" orientation="horizontal" mb={7}>
        <Input
          value={purchase.purchaseRequestDate?.split("T")[0] || "N/A"}
          placeholder="요청 날짜"
          readOnly
        />
      </Field>
      <Field label="비고" orientation="horizontal" mb={7}>
        <Input
          value={purchase.purchaseRequestNote}
          placeholder="비고"
          readOnly
        />
      </Field>

      {/* 승인 후 발주 번호 필드 추가 */}
      {showPurchaseNo && (
        <Field label="발주 번호" orientation="horizontal" mb={7}>
          <Input value={purchase.purchaseNo} placeholder="발주 번호" readOnly />
        </Field>
      )}

      {/* 승인/반려 버튼이 보일지 여부를 상태로 제어 */}
      {showButton && (
        <Box display="flex" gap={4} mt={6}>
          <Button onClick={handleApprove} colorScheme="blue">
            승인
          </Button>
          <Button onClick={handleReject} colorScheme="red">
            반려
          </Button>
        </Box>
      )}
    </Box>
  );
}
