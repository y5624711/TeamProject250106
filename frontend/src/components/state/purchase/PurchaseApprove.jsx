import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  Input,
  Separator,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";

export function PurchaseApprove({ isOpen, onClose, purchaseRequestKey }) {
  const { id, name } = useContext(AuthenticationContext);
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  // 구매 신청 팝업 (승인 팝업) 보기
  useEffect(() => {
    if (purchaseRequestKey) {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((res) => {
          setPurchase(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("구매 데이터를 가져오는 데 실패했습니다:", error);
        });
    }
  }, [purchaseRequestKey]);

  // 구매 신청 승인하기
  const handleApprove = () => {
    const updatedPurchase = {
      ...purchase,
      customerEmployeeNo: id,
      warehouseCode: purchase.warehouseCode,
    };

    axios
      .post(
        `/api/purchase/approve/${purchase.purchaseRequestKey}`,
        updatedPurchase,
      )
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        if (res.data.purchaseNo) {
          setPurchase((prevPurchase) => ({
            ...prevPurchase,
            purchaseNo: res.data.purchaseNo,
            purchaseConsent: true,
            purchaseApproveDate: res.data.purchaseApproveDate,
          }));
        }
      })
      .catch((e) => {
        const message = e.response?.data?.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  // 구매 신청 반려
  const handleReject = () => {
    console.log("구매 반려:", purchase);
    onClose();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      {/* 승인 여부에 따라 발주 번호 추가 */}
      {purchase.purchaseConsent ? (
        <Field label="발주 번호" orientation="horizontal" mb={15}>
          <Input value={purchase.purchaseNo} readOnly />
        </Field>
      ) : null}

      {/* 기존 필드 */}
      <Field label="품목" orientation="horizontal" mb={15}>
        <Input value={purchase.itemCommonName} readOnly />
      </Field>
      <Box display="flex" gap={4}>
        <Field label="수량" orientation="horizontal" mb={15}>
          <Input value={purchase.amount} readOnly />
        </Field>
        <Field label="가격" orientation="horizontal" mb={15}>
          <Input value={purchase?.totalPrice || "N/A"} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="신청자" orientation="horizontal" mb={15}>
          <Input value={purchase.employeeName} readOnly />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={purchase.employeeNo} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={4}>
        <Field label="담당 업체" orientation="horizontal" mb={15}>
          <Input value={purchase.customerName} readOnly />
        </Field>
        <Field label="창고" orientation="horizontal" mb={15}>
          <Input value={purchase?.warehouseName || "창고 정보 없음"} readOnly />
        </Field>
      </Box>
      <Field label="요청 날짜" orientation="horizontal" mb={15}>
        <Input
          value={purchase.purchaseRequestDate?.split("T")[0] || "N/A"}
          readOnly
        />
      </Field>
      <Field label="신청 비고" orientation="horizontal" mb={15}>
        <Textarea
          value={purchase.purchaseRequestNote}
          readOnly
          placeholder={"최대 50자"}
        />
      </Field>
      <Separator />
      <Box display="flex" gap={4} mt={15}>
        <Field label="승인자" orientation="horizontal" mb={15}>
          <Input value={name} readOnly />
        </Field>
        <Field label="사번" orientation="horizontal" mb={15}>
          <Input value={id} readOnly />
        </Field>
      </Box>

      {/* 승인 여부에 따라 승인 날짜 추가 */}
      {purchase.purchaseConsent && (
        <Field label="승인 날짜" orientation="horizontal" mb={15}>
          <Input
            value={purchase.purchaseApproveDate?.split("T")[0] || "N/A"}
            readOnly
          />
        </Field>
      )}

      <Field label="승인 비고" orientation="horizontal" mb={15}>
        <Textarea
          value={purchase.purchaseApproveNote}
          placeholder={"최대 50자"}
          onChange={(e) =>
            !purchase.purchaseConsent &&
            setPurchase({
              ...purchase,
              purchaseApproveNote: e.target.value,
            })
          }
          readOnly={purchase.purchaseConsent}
        />
      </Field>

      {/* 승인 여부에 따라 버튼 표시 */}
      {!purchase.purchaseConsent && (
        <Box display="flex" gap={4} mt={6} justifyContent="flex-end">
          <Button onClick={handleReject} colorScheme="red" variant="outline">
            반려
          </Button>
          <Button onClick={handleApprove} colorScheme="blue">
            승인
          </Button>
        </Box>
      )}
    </Box>
  );
}
