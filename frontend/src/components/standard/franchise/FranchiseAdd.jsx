import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";

export function FranchiseAdd({ onClose, onSave, onCancel }) {
  const [franchiseCode, setFranchiseCode] = useState("");
  const [franchiseName, setFranchiseName] = useState("");
  const [franchiseRep, setFranchiseRep] = useState("");
  const [franchiseNo, setFranchiseNo] = useState("");
  const [franchiseTel, setFranchiseTel] = useState("");
  const [franchiseAddress, setFranchiseAddress] = useState("");
  const [franchiseAddressDetail, setFranchiseAddressDetail] = useState("");
  const [franchisePost, setFranchisePost] = useState("");
  const [franchiseState, setFranchiseState] = useState("");
  const [franchiseCity, setFranchiseCity] = useState("");
  const [franchiseNote, setFranchiseNote] = useState("");

  // 유효성 검사
  const validate = () => {
    return (
      franchiseName.trim() !== "" &&
      franchiseRep.trim() !== "" &&
      franchiseNo.trim() !== "" &&
      franchiseTel.trim() !== "" &&
      franchiseAddress.trim() !== "" &&
      franchisePost.trim() !== "" &&
      franchiseState.trim() !== "" &&
      franchiseCity.trim() !== ""
    );
  };

  // 가맹점 등록하기
  const handleSaveClick = () => {
    if (!validate()) {
      return;
    }

    axios
      .post("/api/franchise/add", {
        franchiseName,
        franchiseRep,
        franchiseNo,
        franchiseTel,
        franchiseAddress,
        franchiseAddressDetail,
        franchisePost,
        franchiseState,
        franchiseCity,
        franchiseNote,
      })
      .then((res) => {
        const message = res.data.message;
        toaster.create({
          type: message.type,
          description: message.text,
        });

        // 중복 체크 후, 메시지 띄우되 입력 창은 닫지 않기
        if (res.data.message.type === "warning") {
          return;
        }

        if (res.data && res.data.franchiseKey) {
          onSave({
            franchiseKey: res.data.franchiseKey,
            franchiseName,
            franchiseRep,
            franchiseNo,
            franchiseTel,
            franchiseAddress,
            franchiseAddressDetail,
            franchisePost,
            franchiseState,
            franchiseCity,
            franchiseNote,
          });
        }
        onClose();
      })
      .catch((e) => {
        const message = e.response.data.message;
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
      <Box>
        <Field label="가맹점" orientation="horizontal" mb={15}>
          <Input
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
          />
        </Field>
        <Field label="사업자 번호" orientation="horizontal" mb={15}>
          <Input
            value={franchiseNo}
            onChange={(e) => setFranchiseNo(e.target.value)}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="대표자" orientation="horizontal" mb={15}>
            <Input
              value={franchiseRep}
              onChange={(e) => setFranchiseRep(e.target.value)}
            />
          </Field>
          <Field label="전화번호" orientation="horizontal" mb={15}>
            <Input
              value={franchiseTel}
              onChange={(e) => setFranchiseTel(e.target.value)}
            />
          </Field>
        </Box>
        <Field label="우편번호" orientation="horizontal" mb={15}>
          <Input
            value={franchisePost}
            onChange={(e) => setFranchisePost(e.target.value)}
          />
        </Field>
        <Field label="주소" orientation="horizontal" mb={15}>
          <Input
            value={franchiseAddress}
            onChange={(e) => setFranchiseAddress(e.target.value)}
          />
        </Field>
        <Field label="상세 주소" orientation="horizontal" mb={15}>
          <Input
            value={franchiseAddressDetail}
            onChange={(e) => setFranchiseAddressDetail(e.target.value)}
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="광역시도" orientation="horizontal" mb={15}>
            <Input
              value={franchiseState}
              onChange={(e) => setFranchiseState(e.target.value)}
            />
          </Field>
          <Field label="시군" orientation="horizontal" mb={15}>
            <Input
              value={franchiseCity}
              onChange={(e) => setFranchiseCity(e.target.value)}
            />
          </Field>
        </Box>
        <Field label="비고" orientation="horizontal" mb={15}>
          <Textarea
            value={franchiseNote}
            onChange={(e) => setFranchiseNote(e.target.value)}
            placeholder="최대 50자"
            style={{ maxHeight: "100px", overflowY: "auto" }}
          />
        </Field>
        <Box display="flex" gap={4} justifyContent="flex-end">
          <Button onClick={handleCancelClick} variant="outline" ml={4}>
            취소
          </Button>
          <Tooltip
            content="입력을 완료해 주세요."
            openDelay={100}
            closeDelay={100}
          >
            <Button onClick={handleSaveClick} disabled={!validate()}>
              등록
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Box>
  );
}
