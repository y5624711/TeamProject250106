import React, { useEffect, useState } from "react";
import { Box, Button, Input, Spinner, Textarea } from "@chakra-ui/react";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import axios from "axios";
import { Checkbox } from "../../ui/checkbox.jsx";

export function FranchiseView({ franchiseKey, onClose, onSave }) {
  const [franchise, setFranchise] = useState(null);
  const [originalData, setOriginalData] = useState(null);

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

  // 입력값이 변경될 때마다 상태를 업데이트
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFranchise((prevFranchise) => ({
      ...prevFranchise,
      [name]: value,
    }));
  };

  // 확인 (수정 후 저장)
  const handleSaveClick = () => {
    const updatedFranchise = {
      ...franchise,
      franchiseActive: franchise.franchiseActive ? 1 : 0, // boolean을 1, 0으로 변환
    };

    if (updatedFranchise.franchiseActive === 0) {
      // 비활성화 상태로 저장하려는 경우, 먼저 삭제 처리
      axios
        .put(`/api/franchise/delete/${franchiseKey}`)
        .then(() => {
          // 수정 처리
          axios
            .put(`/api/franchise/edit/${franchiseKey}`, updatedFranchise)
            .then((res) => {
              const message = res.data.message;
              toaster.create({
                type: message.type,
                description: message.text,
              });
              setOriginalData(updatedFranchise); // 저장 후 초기값 갱신
              onSave(updatedFranchise, franchiseKey); // 부모 컴포넌트로 수정된 데이터와 가맹점 키 전달
            })
            .catch((e) => {
              const message = e.response.data.message;
              toaster.create({
                type: message.type,
                description: message.text,
              });
            });
        })
        .catch(() => {
          toaster.create({
            type: "error",
            description: "사용 여부 업데이트 실패",
          });
        });
    } else {
      // 비활성화가 아닌 경우 그냥 수정 처리
      axios
        .put(`/api/franchise/edit/${franchiseKey}`, updatedFranchise)
        .then((res) => {
          const message = res.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
          setOriginalData(updatedFranchise); // 저장 후 초기값 갱신
          onSave(updatedFranchise, franchiseKey); // 부모 컴포넌트로 수정된 데이터와 가맹점 키 전달
        })
        .catch((e) => {
          const message = e.response.data.message;
          toaster.create({
            type: message.type,
            description: message.text,
          });
        });
    }
  };

  // 취소
  const handleCancelClick = () => {
    onClose();
  };

  if (!franchise) {
    return <Spinner />;
  }

  return (
    <Box>
      <Box>
        <Box display="flex" gap={4}>
          <Field label="가맹점" orientation="horizontal" mb={15}>
            <Input
              name="franchiseName"
              value={franchise.franchiseName}
              onChange={handleChange}
            />
          </Field>
          <Field label="가맹점 코드" orientation="horizontal" mb={15}>
            <Input
              name="franchiseCode"
              value={franchise.franchiseCode}
              onChange={handleChange}
              readOnly
            />
          </Field>
        </Box>
        <Field label="사업자 번호" orientation="horizontal" mb={15}>
          <Input
            name="franchiseNo"
            value={franchise.franchiseNo}
            onChange={handleChange}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="대표자" orientation="horizontal" mb={15}>
            <Input
              name="franchiseRep"
              value={franchise.franchiseRep}
              onChange={handleChange}
            />
          </Field>
          <Field label="전화번호" orientation="horizontal" mb={15}>
            <Input
              name="franchiseTel"
              value={franchise.franchiseTel}
              onChange={handleChange}
            />
          </Field>
        </Box>
        <Field label="우편번호" orientation="horizontal" mb={15}>
          <Input
            name="franchisePost"
            value={franchise.franchisePost}
            onChange={handleChange}
          />
        </Field>
        <Field label="주소" orientation="horizontal" mb={15}>
          <Input
            name="franchiseAddress"
            value={franchise.franchiseAddress}
            onChange={handleChange}
          />
        </Field>
        <Field label="상세 주소" orientation="horizontal" mb={15}>
          <Input
            name="franchiseAddressDetail"
            value={franchise.franchiseAddressDetail}
            onChange={handleChange}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="광역시도" orientation="horizontal" mb={15}>
            <Input
              name="franchiseState"
              value={franchise.franchiseState}
              onChange={handleChange}
            />
          </Field>
          <Field label="시군" orientation="horizontal" mb={15}>
            <Input
              name="franchiseCity"
              value={franchise.franchiseCity}
              onChange={handleChange}
            />
          </Field>
        </Box>
        <Field label="비고" orientation="horizontal" mb={15}>
          <Textarea
            name="franchiseNote"
            placeholder="최대 50자"
            value={franchise.franchiseNote}
            onChange={handleChange}
            style={{ maxHeight: "100px", overflowY: "auto" }}
          />
        </Field>

        <Checkbox
          size={"lg"}
          checked={franchise.franchiseActive}
          onChange={(e) => {
            const checked = e.target.checked;
            setFranchise((prevFranchise) => ({
              ...prevFranchise,
              franchiseActive: checked, // 상태 업데이트
            }));
          }}
        >
          사용 여부
        </Checkbox>

        <Box display="flex" gap={4} mt={6} justifyContent="flex-end">
          <Button onClick={handleCancelClick} variant="outline">
            취소
          </Button>
          <Button onClick={handleSaveClick}>확인</Button>
        </Box>
      </Box>
    </Box>
  );
}
