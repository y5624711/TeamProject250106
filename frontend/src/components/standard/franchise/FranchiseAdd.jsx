import { Box, Button, Input, Textarea } from "@chakra-ui/react";
import axios from "axios";
import React, { useState } from "react";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";
import { Tooltip } from "../../ui/tooltip.jsx";
import { SpacedLabel } from "../../tool/form/SpaceLabel.jsx";

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

  // 사업자 번호 정규식
  const formatFranchiseNo = (value) => {
    return value
      .replace(/[^0-9]/g, "") // 숫자만 허용
      .replace(/^(\d{3})(\d{0,2})(\d{0,5})$/, (match, p1, p2, p3) => {
        let result = p1;
        if (p2) result += `-${p2}`;
        if (p3) result += `-${p3}`;
        return result;
      });
  };

  // 전화번호 정규식
  const formatFranchiseTel = (value) => {
    value = value.replace(/[^0-9]/g, ""); // 숫자만 허용
    if (value.length <= 3) {
      return value; // 3자리 이하일 경우 그냥 반환
    } else if (value.length <= 6) {
      return value.replace(/^(\d{3})(\d{0,3})$/, "$1-$2");
    } else if (value.length <= 10) {
      return value.replace(/^(\d{3})(\d{3})(\d{0,4})$/, "$1-$2-$3");
    } else if (value.length <= 11) {
      return value.replace(/^(\d{3})(\d{4})(\d{4})$/, "$1-$2-$3"); // 11자리 이상도 이 패턴을 사용
    }
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
    <Box css={{ "--field-label-width": "85px" }}>
      <Box>
        <Field
          label={<SpacedLabel text="가맹점" req />}
          orientation="horizontal"
          mb={15}
          required
        >
          <Input
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
          />
        </Field>
        <Field
          label={<SpacedLabel text="사업자 번호" req />}
          orientation="horizontal"
          mb={15}
          required
        >
          <Input
            value={franchiseNo}
            onChange={(e) => setFranchiseNo(formatFranchiseNo(e.target.value))}
            maxLength={12}
          />
        </Field>
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="대표자" req />}
            orientation="horizontal"
            mb={15}
            required
          >
            <Input
              value={franchiseRep}
              onChange={(e) => setFranchiseRep(e.target.value)}
            />
          </Field>
          <Field
            label={<SpacedLabel text="전화번호" req />}
            orientation="horizontal"
            mb={15}
            required
          >
            <Input
              value={franchiseTel}
              onChange={(e) =>
                setFranchiseTel(formatFranchiseTel(e.target.value))
              }
              maxLength={13}
            />
          </Field>
        </Box>
        <Box display="flex" gap={5}>
          <Field
            label={<SpacedLabel text="광역시도" req />}
            orientation="horizontal"
            mb={15}
            required
          >
            <Input
              value={franchiseState}
              onChange={(e) => setFranchiseState(e.target.value)}
            />
          </Field>
          <Field
            label={<SpacedLabel text="시군" req />}
            orientation="horizontal"
            mb={15}
            required
          >
            <Input
              value={franchiseCity}
              onChange={(e) => setFranchiseCity(e.target.value)}
            />
          </Field>
        </Box>
        <Field
          label={<SpacedLabel text="우편번호" req />}
          orientation="horizontal"
          mb={15}
          required
        >
          <Input
            value={franchisePost}
            onChange={(e) => setFranchisePost(e.target.value)}
          />
        </Field>
        <Field
          label={<SpacedLabel text="주소" req />}
          orientation="horizontal"
          mb={15}
          required
        >
          <Input
            value={franchiseAddress}
            onChange={(e) => setFranchiseAddress(e.target.value)}
          />
        </Field>
        <Field
          label={<SpacedLabel text="상세 주소" />}
          orientation="horizontal"
          mb={15}
        >
          <Input
            value={franchiseAddressDetail}
            onChange={(e) => setFranchiseAddressDetail(e.target.value)}
          />
        </Field>
        <Field
          label={<SpacedLabel text="비고" />}
          orientation="horizontal"
          mb={15}
        >
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
            disabled={validate()}
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
