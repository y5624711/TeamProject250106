import React, { useEffect, useState } from "react";
import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";

export function StateRadioGroup({ radioOptions, onRadioChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [state, setState] = useState(searchParams.get("state") || "all");

  useEffect(() => {
    const currentState = searchParams.get("state") || "all";
    setState(currentState); // UI와 동기화
  }, [searchParams]);

  const handleRadio = (value) => {
    setState(value);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("state", value);
    nextSearchParams.set("page", "1");

    onRadioChange(value); // 부모 컴포넌트로 선택된 값 전달

    setSearchParams(nextSearchParams);
  };

  return (
    <RadioGroup
      value={state}
      onValueChange={(value) => handleRadio(value.value)}
      my={6}
      ml={2}
    >
      <Stack direction="row" spacing={4}>
        {radioOptions.map((option) => (
          <Radio key={option.value} value={option.value}>
            {option.label}
          </Radio>
        ))}
      </Stack>
    </RadioGroup>
  );
}
