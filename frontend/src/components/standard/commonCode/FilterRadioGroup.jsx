import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { HStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function FilterRadioGroup({ onRadioChange }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [radioValue, setRadioValue] = useState(() => {
    return searchParams.get("filter") || 1; // 기본값 "1"
  });

  const handleRadioChange = (value) => {
    setRadioValue(parseInt(value)); // 로컬 상태 업데이트
    // 부모 컴포넌트에 상태 전달
    if (onRadioChange) {
      onRadioChange(value);
    }

    // URL 파라미터 업데이트
    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("filter", value);
    nextSearchParams.set("page", "1");
    setSearchParams(nextSearchParams);
  };

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "1";
    setRadioValue(currentFilter);
  }, [searchParams]);

  return (
    <RadioGroup
      defaultValue={radioValue}
      my={1}
      marginBottom={2}
      onValueChange={handleRadioChange}
    >
      <HStack gap={6}>
        <Radio value="1">전체 조회</Radio>
        <Radio value="2">시스템 코드 조회</Radio>
        <Radio value="3">물품 코드 조회</Radio>
      </HStack>
    </RadioGroup>
  );
}
