import { Box, Button, Input } from "@chakra-ui/react";
import axios from "axios";
import { useState } from "react";
import { toaster } from "../../ui/toaster.jsx";
import { Field } from "../../ui/field.jsx";

export function FranchiseAdd({ onClose, onSave }) {
  const [businessEmployeeNo, setBusinessEmployeeNo] = useState("");
  const [businessEmployeeName, setBusinessEmployeeName] = useState("");
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

  // 가맹점 등록하기
  const handleSaveClick = () => {
    axios
      .post("/api/franchise/add", {
        businessEmployeeNo,
        businessEmployeeName,
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
            businessEmployeeNo,
            businessEmployeeName,
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

  return (
    <Box>
      <Box maxW="500px" mx="auto" p={4}>
        <Box display="flex" gap={4}>
          <Field label="직원 사번" required mb={4}>
            <Input
              value={businessEmployeeNo}
              onChange={(e) => setBusinessEmployeeNo(e.target.value)}
              placeholder="직원 사번"
              required
            />
          </Field>
          <Field label="직원 이름" required>
            <Input
              value={businessEmployeeName}
              onChange={(e) => setBusinessEmployeeName(e.target.value)}
              placeholder="직원 이름"
            />
          </Field>
        </Box>
        <Field label="가맹점명" required mb={4}>
          <Input
            value={franchiseName}
            onChange={(e) => setFranchiseName(e.target.value)}
            placeholder="가맹점명"
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="가맹점주" required mb={4}>
            <Input
              value={franchiseRep}
              onChange={(e) => setFranchiseRep(e.target.value)}
              placeholder="가맹점주"
            />
          </Field>
          <Field label="전화번호" required mb={4}>
            <Input
              value={franchiseTel}
              onChange={(e) => setFranchiseTel(e.target.value)}
              placeholder="전화번호"
            />
          </Field>
        </Box>
        <Field label="사업자 번호" required mb={4}>
          <Input
            value={franchiseNo}
            onChange={(e) => setFranchiseNo(e.target.value)}
            placeholder="사업자 번호"
          />
        </Field>
        <Field label="주소" required mb={4}>
          <Input
            value={franchiseAddress}
            onChange={(e) => setFranchiseAddress(e.target.value)}
            placeholder="주소"
          />
        </Field>
        <Field label="상세 주소" mb={4}>
          <Input
            value={franchiseAddressDetail}
            onChange={(e) => setFranchiseAddressDetail(e.target.value)}
            placeholder="상세 주소"
          />
        </Field>
        <Field label="우편번호" required mb={4}>
          <Input
            value={franchisePost}
            onChange={(e) => setFranchisePost(e.target.value)}
            placeholder="우편 번호"
          />
        </Field>
        <Box display="flex" gap={4}>
          <Field label="광역시도" required mb={4}>
            <Input
              value={franchiseState}
              onChange={(e) => setFranchiseState(e.target.value)}
              placeholder="광역시도"
            />
          </Field>
          <Field label="시군" required mb={4}>
            <Input
              value={franchiseCity}
              onChange={(e) => setFranchiseCity(e.target.value)}
              placeholder="시군"
            />
          </Field>
        </Box>
        <Field label="비고" mb={4}>
          <Input
            value={franchiseNote}
            onChange={(e) => setFranchiseNote(e.target.value)}
            placeholder="비고"
          />
        </Field>
        <Button onClick={handleSaveClick}>등록</Button>
        {/*<Button onClick={onCancel} ml={4}>*/}
        {/*  취소*/}
        {/*</Button>*/}
      </Box>
    </Box>
  );
}
