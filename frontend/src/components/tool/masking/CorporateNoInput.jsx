import React from "react";
import { Input } from "@chakra-ui/react";

export function CorporateNoInput({ value, onChange }) {
  const formatCorporateNumber = (num) => {
    const onlyNums = num.replace(/\D/g, "").slice(0, 13); // 숫자만 남기고 13자리 제한
    if (onlyNums.length > 6) {
      return onlyNums.replace(/(\d{6})(\d{0,7})/, "$1-$2");
    }
    return onlyNums;
  };

  return (
    <Input
      value={value}
      onChange={(e) => onChange(formatCorporateNumber(e.target.value))}
      maxLength={14}
      // placeholder="000000-0000000"
    />
  );
}
