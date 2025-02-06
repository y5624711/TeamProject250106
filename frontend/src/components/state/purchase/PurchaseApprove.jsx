import React, { useContext, useEffect, useState } from "react";
import {
  Box,
  Button,
  HStack,
  Input,
  Separator,
  Spinner,
  Textarea,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";
import { AuthenticationContext } from "../../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { toaster } from "../../ui/toaster.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

export function PurchaseApprove({
  purchaseRequestKey,
  setPurchaseConsent,
  onUpdateList,
  onClose,
}) {
  const { id, name } = useContext(AuthenticationContext);
  const [purchase, setPurchase] = useState(null);
  const [loading, setLoading] = useState(true);

  // 구매 요청 팝업 보기
  useEffect(() => {
    if (purchaseRequestKey) {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((res) => {
          setPurchase(res.data);
          setPurchaseConsent(res.data.purchaseConsent);
          setLoading(false);
        })
        .catch((error) => {
          console.error("구매 데이터를 가져오는 데 실패했습니다:", error);
        });
    }
  }, [purchaseRequestKey]);

  // 반려된 구매 요청 데이터 가져오기
  useEffect(() => {
    if (purchaseRequestKey && purchase?.purchaseConsent === false) {
      axios
        .get(`/api/purchase/disapprove/${purchaseRequestKey}`)
        .then((res) => {
          console.log("데이터:", res.data);
          setPurchase((prevPurchase) => ({
            ...prevPurchase,
            ...res.data,
          }));
        })
        .catch((error) => {
          console.error("반려 데이터를 가져오는 데 실패했습니다:", error);
        });
    }
  }, [purchaseRequestKey, purchase?.purchaseConsent]);

  // 구매 요청 승인하기 (warehouseCode 즉, 창고 정보가 없으면 승인 안됨)
  const handleApprove = () => {
    const updatedPurchase = {
      ...purchase,
      customerEmployeeNo: id,
      customerEmployeeName: name,
      warehouseCode: purchase.warehouseCode,
      purchaseApproveDate: new Date().toISOString(),
      purchaseConsent: true,
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
          setPurchaseConsent(true);
          setPurchase((prevPurchase) => ({
            ...prevPurchase,
            customerEmployeeNo: id,
            customerEmployeeName: name,
            purchaseNo: res.data.purchaseNo,
            purchaseApproveDate: new Date().toISOString(),
            purchaseConsent: true,
          }));

          onUpdateList();
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

  // 구매 요청 반려하기
  const handleDisapprove = () => {
    const updatedPurchase = {
      ...purchase,
      disapproveEmployeeNo: id,
      disapproveEmployeeName: name,
      disapproveDate: new Date().toISOString(),
      disapproveNote: purchase.purchaseApproveNote,
    };

    axios
      .post(`/api/purchase/disapprove`, updatedPurchase)
      .then((res) => {
        const data = res.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });

        setPurchase((prevPurchase) => ({
          ...prevPurchase,
          purchaseConsent: false,
          disapproveEmployeeNo: data.disapproveEmployeeNo,
          disapproveEmployeeName: data.disapproveEmployeeName,
          disapproveDate: data.disapproveDate,
          disapproveNote: data.disapproveNote,
        }));

        onUpdateList();
      })
      .catch((e) => {
        const data = e.response.data;
        toaster.create({
          type: data.message.type,
          description: data.message.text,
        });
      });
  };

  // 취소 버튼 클릭 시 창 닫기
  const handleCancelClick = () => {
    onClose();
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      {/* 승인 여부에 따라 발주 번호 추가 */}
      {purchase.purchaseConsent ? (
        <Field
          label={<SpacedLabel text="발주 번호" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase.purchaseNo} readOnly />
        </Field>
      ) : null}

      {/* 요청 필드 */}
      <Field
        label={<SpacedLabel text="품목" />}
        orientation="horizontal"
        mb={15}
      >
        <Input value={purchase.itemCommonName} readOnly />
      </Field>
      <Box display="flex" gap={5}>
        <Field
          label={<SpacedLabel text="수량" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase.amount} readOnly />
        </Field>
        <Field
          label={<SpacedLabel text="가격" />}
          orientation="horizontal"
          mb={15}
        >
          <Input
            value={
              purchase?.totalPrice
                ? Number(purchase.totalPrice).toLocaleString("ko-KR")
                : "N/A"
            }
            readOnly
          />
        </Field>
      </Box>
      <Box display="flex" gap={5}>
        <Field
          label={<SpacedLabel text="담당 업체" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase.customerName} readOnly />
        </Field>
        <Field
          label={<SpacedLabel text="창고" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase?.warehouseName || "창고 정보 없음"} readOnly />
        </Field>
      </Box>
      <Box display="flex" gap={5}>
        <Field
          label={<SpacedLabel text="요청자" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase.employeeName} readOnly />
        </Field>
        <Field
          label={<SpacedLabel text="사번" />}
          orientation="horizontal"
          mb={15}
        >
          <Input value={purchase.employeeNo} readOnly />
        </Field>
      </Box>
      <Field
        label={<SpacedLabel text="요청 날짜" />}
        orientation="horizontal"
        mb={15}
      >
        <Input
          value={purchase.purchaseRequestDate?.split("T")[0] || "N/A"}
          readOnly
        />
      </Field>
      <Field
        label={<SpacedLabel text="요청 비고" />}
        orientation="horizontal"
        mb={15}
      >
        {purchase.purchaseRequestNote ? (
          <Textarea
            value={purchase.purchaseRequestNote}
            readOnly
            style={{ maxHeight: "100px", overflowY: "auto" }}
          />
        ) : (
          <Input readOnly value={"내용 없음"} />
        )}
      </Field>

      {/* 반려일 경우 */}
      {purchase.purchaseConsent === false && (
        <>
          <Box mt={4}>
            <Box display="flex" gap={5}>
              <Field
                label={<SpacedLabel text="반려자" />}
                orientation="horizontal"
                mb={15}
              >
                <Input value={purchase.disapproveEmployeeName} readOnly />
              </Field>
              <Field
                label={<SpacedLabel text="사번" />}
                orientation="horizontal"
                mb={15}
              >
                <Input value={purchase.disapproveEmployeeNo} readOnly />
              </Field>
            </Box>
            <Field
              label={<SpacedLabel text="반려 날짜" />}
              orientation="horizontal"
              mb={15}
            >
              <Input
                value={purchase.disapproveDate?.split("T")[0] || "N/A"}
                readOnly
              />
            </Field>
          </Box>
          <Field
            label={<SpacedLabel text="반려 비고" />}
            orientation="horizontal"
            mb={15}
          >
            {purchase.disapproveNote ? (
              <Textarea
                value={purchase.disapproveNote}
                readOnly
                style={{ maxHeight: "100px", overflowY: "auto" }}
              />
            ) : (
              <Input readOnly value={"내용 없음"} />
            )}
          </Field>
        </>
      )}

      {/* 승인 여부가 승인/반려이면 숨기고, 승인 여부가 정해지지 않은 경우에만 표시 */}
      {purchase.purchaseConsent === undefined && <Separator />}

      {/* 승인 여부가 false가 아닌 경우 승인자와 관련 필드 표시 */}
      {purchase.purchaseConsent !== false && (
        <>
          <Box display="flex" gap={4} mt={15}>
            <Field
              label={
                <SpacedLabel
                  text={
                    purchase.purchaseConsent === true ? "승인자" : "반려/승인자"
                  }
                  req
                />
              }
              orientation="horizontal"
            >
              <Input
                value={purchase.customerEmployeeName || name}
                readOnly
                variant={
                  purchase.purchaseConsent !== true ? "subtle" : undefined
                }
              />
            </Field>
            <Field label={<SpacedLabel text="사번" />} orientation="horizontal">
              <Input
                value={purchase.customerEmployeeNo || id}
                readOnly
                variant={
                  purchase.purchaseConsent !== true ? "subtle" : undefined
                }
              />
            </Field>
          </Box>
          {purchase.purchaseConsent && (
            <Box mt={4}>
              <Field
                label={<SpacedLabel text="승인 날짜" />}
                orientation="horizontal"
                mb={15}
              >
                <Input
                  value={purchase.purchaseApproveDate?.split("T")[0] || "N/A"}
                  readOnly
                />
              </Field>
            </Box>
          )}
          <Field
            label={<SpacedLabel text="비고" />}
            orientation="horizontal"
            mt={15}
          >
            {purchase.purchaseConsent ? (
              purchase.purchaseApproveNote ? (
                <Textarea
                  value={purchase.purchaseApproveNote}
                  readOnly
                  style={{ maxHeight: "100px", overflowY: "auto" }}
                />
              ) : (
                <Input readOnly value={"내용 없음"} />
              )
            ) : (
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
                style={{ maxHeight: "100px", overflowY: "auto" }}
              />
            )}
          </Field>
        </>
      )}

      {/* 승인 여부가 null일 때만 취소/반려/승인 버튼 표시 */}
      {purchase?.purchaseConsent === undefined && (
        <Box display="flex" gap={4} mt={6} justifyContent="flex-end">
          <Button onClick={handleCancelClick} variant="outline">
            취소
          </Button>
          <Button
            onClick={handleDisapprove}
            variant="outline"
            colorPalette="red"
          >
            반려
          </Button>
          <Button onClick={handleApprove}>승인</Button>
        </Box>
      )}

      {/* 승인 여부가 true 또는 false일 때 닫기 버튼 표시 */}
      {(purchase?.purchaseConsent === true ||
        purchase?.purchaseConsent === false) && (
        <Box display="flex" gap={4} mt={6} justifyContent="flex-end">
          <Button variant="outline" onClick={onClose}>
            닫기
          </Button>
        </Box>
      )}
    </Box>
  );
}
