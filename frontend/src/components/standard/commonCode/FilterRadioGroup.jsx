import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function FilterRadioGroup({ onRadioChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [radioValue, setRadioValue] = useState(() => {
    return searchParams.get("filter") || "all"; // 기본값 "1"
  });

  const handleRadioChange = (value) => {
    setRadioValue(value.value); // 로컬 상태 업데이트
    // 부모 컴포넌트에 상태 전달
    if (onRadioChange) {
      onRadioChange(value.value);
    }

    // URL 파라미터 업데이트
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("filter", value.value);
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "all";
    setRadioValue(currentFilter);
  }, [searchParams]);

  return (
    <RadioGroup value={radioValue} onValueChange={handleRadioChange}>
      <HStack gap={6}>
        <Radio value="all">전체 조회</Radio>
        <Radio value="system">시스템 코드 조회</Radio>
        <Radio value="item">물품 코드 조회</Radio>
      </HStack>
    </RadioGroup>
  );
}
