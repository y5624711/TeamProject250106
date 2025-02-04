import React from "react";
import { Input } from "@chakra-ui/react";

export function PhoneInput({ value, onChange, ...props }) {
  const formatPhone = (value) => {
    const onlyNums = value.replace(/\D/g, "").slice(0, 11); // 숫자만 남기고 최대 11자리 제한

    if (onlyNums.startsWith("02")) {
      // 서울(02) 지역번호 처리 (최대 10자리)
      if (onlyNums.length > 6) {
        return onlyNums.replace(/(02)(\d{3,4})(\d{4})/, "$1-$2-$3");
      } else if (onlyNums.length > 2) {
        return onlyNums.replace(/(02)(\d{0,4})/, "$1-$2");
      }
    } else if (/^0[3-9]/.test(onlyNums)) {
      // 기타 지역번호(031, 051 등) 처리
      if (onlyNums.length > 7) {
        return onlyNums.replace(/(\d{3})(\d{3,4})(\d{4})/, "$1-$2-$3");
      } else if (onlyNums.length > 3) {
        return onlyNums.replace(/(\d{3})(\d{0,4})/, "$1-$2");
      }
    } else if (/^01[016789]/.test(onlyNums)) {
      // 휴대폰 번호 처리
      if (onlyNums.length === 11) {
        return onlyNums.replace(/(\d{3})(\d{4})(\d{4})/, "$1-$2-$3");
      } else if (onlyNums.length > 7) {
        return onlyNums.replace(/(\d{3})(\d{4})(\d{0,4})/, "$1-$2-$3");
      } else if (onlyNums.length > 3) {
        return onlyNums.replace(/(\d{3})(\d{0,4})/, "$1-$2");
      }
    }

    return onlyNums;
  };

  return (
    <Input
      value={value}
      onChange={(e) => onChange(formatPhone(e.target.value))}
      maxLength={13}
      {...props}
    />
  );
}
