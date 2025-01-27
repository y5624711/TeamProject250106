import React, { useEffect, useState } from "react";
import { Box, Button, Input, Spinner, Textarea } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { DialogConfirmation } from "../../tool/DialogConfirmation.jsx";

export function FranchiseView({
  franchiseKey,
  setViewMode,
  onClose,
  onSave,
  onDelete,
}) {
  const [franchise, setFranchise] = useState(null);
  const [originalData, setOriginalData] = useState(null);
  const [isReadOnly, setIsReadOnly] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // 입력값이 변경될 때마다 상태를 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [name]: value,
    }));
  };

  // 수정
  const handleEditClick = () => {
    setIsReadOnly(false); // 수정 모드 활성화
  };

  // 취소
  const handleCancelClick = () => {
    setFranchise(originalData); // 취소 시 초기값으로 되돌림
    setIsReadOnly(true); // 수정 모드 취소
  };

  // 저장
  const handleSaveClick = () => {
    axios
      .put(`/api/franchise/edit/${franchiseKey}`, franchise)
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setIsReadOnly(true); // 저장 후 읽기 모드로 전환
        setOriginalData(franchise); // 저장 후 초기값 갱신
        onSave(franchise); // 부모 컴포넌트로 수정된 데이터 전달
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      });
  };

  // 삭제 버튼 클릭
  const handleDeleteClick = () => {
    setIsDialogOpen(true); // 다이얼로그 열기
  };

  // 삭제 확인
  const handleDeleteConfirm = () => {
    axios
      .put(`/api/franchise/delete/${franchiseKey}`)
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
        setViewMode("list");
      })
      .catch((e) => {
        const message = e.response.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });
      })
      .finally(() => {
        onDelete(franchiseKey); // 삭제 처리
        onClose();
      });
  };

  // 특정 가맹점 조회
  useEffect(() => {
    const franchiseData = () => {
      axios
        .get(`/api/franchise/view/${franchiseKey}`)
        .then((response) => {
          setFranchise(response.data);
          setOriginalData(response.data);
        })
        .catch((error) => {
          console.error("가맹점 데이터를 가져오는 데 실패했습니다:", error);
        });
    };

    if (franchiseKey) {
      franchiseData();
    }
  }, [franchiseKey]);

  if (!franchise) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box maxW="500px" mx="auto" p={4}>
        <Box display="flex" gap={4}>
          <Field label="가맹점명" orientation="horizontal" mb={15}>
            <Input
              name="franchiseName"
              value={franchise.franchiseName}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
          <Field label="가맹점 코드" orientation="horizontal" mb={15}>
            <Input
              name="franchiseCode"
              value={franchise.franchiseCode}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
        </Box>
        <Field label="사업자 번호" orientation="horizontal" mb={15}>
          <Input
            name="franchiseNo"
            value={franchise.franchiseNo}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="대표자" orientation="horizontal" mb={15}>
            <Input
              name="franchiseRep"
              value={franchise.franchiseRep}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
          <Field label="전화번호" orientation="horizontal" mb={15}>
            <Input
              name="franchiseTel"
              value={franchise.franchiseTel}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
        </Box>
        <Field label="우편번호" orientation="horizontal" mb={15}>
          <Input
            name="franchisePost"
            value={franchise.franchisePost}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Field>
        <Field label="주소" orientation="horizontal" mb={15}>
          <Input
            name="franchiseAddress"
            value={franchise.franchiseAddress}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Field>
        <Field label="상세 주소" orientation="horizontal" mb={15}>
          <Input
            name="franchiseAddressDetail"
            value={franchise.franchiseAddressDetail}
            onChange={handleChange}
            readOnly={isReadOnly}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="광역시도" orientation="horizontal" mb={15}>
            <Input
              name="franchiseState"
              value={franchise.franchiseState}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
          <Field label="시군" orientation="horizontal" mb={15}>
            <Input
              name="franchiseCity"
              value={franchise.franchiseCity}
              onChange={handleChange}
              readOnly={isReadOnly}
            />
          </Field>
        </Box>
        <Field label="비고" orientation="horizontal" mb={15}>
          <Textarea
            name="franchiseNote"
            value={franchise.franchiseNote}
            onChange={handleChange}
            placeholder="최대 50자"
            readOnly={isReadOnly}
          />
        </Field>
        <Box display="flex" justifyContent="space-between" mt={4}>
          {isReadOnly ? (
            <>
              <Button onClick={handleEditClick} colorScheme="blue">
                수정
              </Button>
              {franchise.franchiseActive && (
                <Button onClick={handleDeleteClick} colorScheme="red">
                  삭제
                </Button>
              )}
            </>
          ) : (
            <>
              <Button onClick={handleSaveClick} colorScheme="green">
                저장
              </Button>
              <Button onClick={handleCancelClick} colorScheme="gray">
                취소
              </Button>
            </>
          )}
        </Box>
      </Box>
      {/* DialogConfirmation */}
      <DialogConfirmation
        isOpen={isDialogOpen}
        onConfirm={handleDeleteConfirm}
        onClose={() => setIsDialogOpen(false)}
        title="삭제 확인"
        body="정말로 이 가맹점을 삭제하시겠습니까?"
      />
    </Box>
  );
}
