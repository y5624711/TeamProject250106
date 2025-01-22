import React, { useEffect, useState } from "react";
import { Button, Spinner } from "@chakra-ui/react";
import axios from "axios";

export function PurchaseApprove({ isOpen, onClose, purchaseRequestKey }) {
  const [purchase, setPurchase] = useState(null); // 구매 데이터 상태
  const [loading, setLoading] = useState(true); // 로딩 상태

  // 구매 승인 데이터 조회
  useEffect(() => {
    const purchaseData = () => {
      axios
        .get(`/api/purchase/approve/${purchaseRequestKey}`)
        .then((response) => {
          console.log("구매 데이터:", response.data); // 서버 응답 확인
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
    // 승인 처리 로직 추가
    console.log("구매 승인:", purchase);
    onClose();
  };

  const handleReject = () => {
    // 반려 처리 로직 추가
    console.log("구매 반려:", purchase);
    onClose();
  };

  // 구매 데이터가 로딩 중이면 Spinner 표시
  if (loading) {
    return <Spinner />;
  }

  if (!purchase) {
    return <p>구매 정보를 가져오는 데 실패했습니다.</p>;
  }

  return (
    <div>
      <p>구매 요청 키: {purchase.purchaseRequestKey}</p>
      <p>상품명: {purchase.productName}</p>
      <p>금액: {purchase.amount}</p>

      {/* 추가적인 구매 정보가 있으면 여기에 표시 */}
      <div>
        <h3>구매 정보</h3>
        <p>구매자: {purchase.buyerName}</p>
        <p>구매일자: {purchase.purchaseDate}</p>
      </div>

      <Button onClick={handleApprove}>승인</Button>
      <Button onClick={handleReject}>반려</Button>
    </div>
  );
}
