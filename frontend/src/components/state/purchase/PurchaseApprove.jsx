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

  // 구매 신청 팝업 보기
  useEffect(() => {
    if (purchaseRequestKey) {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((res) => {
          console.log("승인 여부 상태:", res.data.purchaseConsent);
          setPurchase(res.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("구매 데이터를 가져오는 데 실패했습니다:", error);
        });
    }
  }, [purchaseRequestKey]);

  // 구매 신청 승인하기 (warehouseCode 즉, 창고 정보가 없으면 승인 안됨)
  const handleApprove = () => {
    const updatedPurchase = {
      ...purchase,
      customerEmployeeNo: id,
      customerEmployeeName: name,
      warehouseCode: purchase.warehouseCode,
      purchaseApproveDate: new Date().toISOString(),
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
            customerEmployeeNo: id,
            customerEmployeeName: name,
            purchaseNo: res.data.purchaseNo,
            purchaseApproveDate: new Date().toISOString(),
            purchaseConsent: true,
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
  const handleDisapprove = () => {
    axios
      .put(`api/purchase/disapprove/${purchaseRequestKey}`)
      .then((res) => res.data)
      .then((data) => {
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
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

      {/* 신청 필드 */}
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
      <Field label="신청 날짜" orientation="horizontal" mb={15}>
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

      {/* 반려일 때는 Separator 숨기기 */}
      {purchase.purchaseConsent !== false && <Separator />}

      {/* 승인 여부가 false가 아닌 경우 승인자와 관련 필드 표시 */}
      {purchase.purchaseConsent !== false && (
        <>
          {purchase.purchaseConsent && (
            <Box mt={4}>
              <Field label="승인 날짜" orientation="horizontal" mb={15}>
                <Input
                  value={purchase.purchaseApproveDate?.split("T")[0] || "N/A"}
                  readOnly
                />
              </Field>
            </Box>
          )}
          <Box display="flex" gap={4} mt={15}>
            <Field label="승인자" orientation="horizontal" mb={15}>
              <Input value={purchase.customerEmployeeName || name} readOnly />
            </Field>
            <Field label="사번" orientation="horizontal" mb={15}>
              <Input value={purchase.customerEmployeeNo || id} readOnly />
            </Field>
          </Box>
          <Field label="승인 비고" orientation="horizontal" mb={15}>
            <Textarea
              value={purchase.purchaseApproveNote}
              placeholder={"최대 50자"}
              onChange={(e) =>
                purchase.purchaseConsent !== true &&
                setPurchase({
                  ...purchase,
                  purchaseApproveNote: e.target.value,
                })
              }
              readOnly={purchase.purchaseConsent === true}
            />
          </Field>
        </>
      )}

      {/* 승인 여부가 null일 때만 버튼 표시 */}
      {purchase?.purchaseConsent === undefined && (
        <Box display="flex" gap={4} mt={6} justifyContent="flex-end">
          <Button onClick={handleDisapprove} variant="outline">
            반려
          </Button>
          <Button onClick={handleApprove}>승인</Button>
        </Box>
      )}
    </Box>
  );
}
