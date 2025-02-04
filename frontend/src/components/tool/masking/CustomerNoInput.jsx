import React from "react";
import { Input } from "@chakra-ui/react";

export function CustomerNoInput({ value, onChange }) {
  const formatCustomerNo = (num) => {
    const onlyNums = num.replace(/\D/g, "").slice(0, 10); // 숫자만 남기고 최대 10자리 제한
    if (onlyNums.length > 5) {
      return onlyNums.replace(/(\d{3})(\d{2})(\d{0,5})/, "$1-$2-$3");
    } else if (onlyNums.length > 3) {
      return onlyNums.replace(/(\d{3})(\d{0,2})/, "$1-$2");
    }
    return onlyNums;
  };

  return (
    <Input
      value={value}
      onChange={(e) => onChange(formatCustomerNo(e.target.value))}
      maxLength={12}
      // placeholder="000-00-00000"
    />
  );
}
