import React, { useContext, useEffect, useState } from "react";
import { Box, Button, Input, Spinner } from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";

export function PurchaseApprove({ isOpen, onClose, purchaseRequestKey }) {
  const { id, name } = useContext(AuthenticationContext);
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  // 구매 승인 팝업 보기
  useEffect(() => {
    const purchaseData = () => {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((response) => {
          console.log("구매 데이터:", response.data);
          setPurchase(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("구매 데이터를 가져오는 데 실패했습니다:", error);
        });
    };

    if (purchaseRequestKey) {
      purchaseData();
    }
  }, [purchaseRequestKey]);

  const handleApprove = () => {
    console.log("구매 승인:", purchase);
    onClose();
  };

  const handleReject = () => {
    console.log("구매 반려:", purchase);
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
          <Input value={purchase.intPrice} placeholder="가격" readOnly />
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
      <Box display="flex" gap={4} mt={6}>
        <Button onClick={handleApprove} colorScheme="blue">
          승인
        </Button>
        <Button onClick={handleReject} colorScheme="red">
          반려
        </Button>
      </Box>
    </Box>
  );
}
