import { Radio, RadioGroup } from "../../ui/radio.jsx";
import { Stack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

export function FilterRadioGroup({ onRadioChange, radioOptions }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [filter, setFilter] = useState(searchParams.get("filter") || "all");

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "all";
    setFilter(currentFilter);
  }, [searchParams]);

  const handleRadio = (value) => {
    setFilter(value);
    console.log(value);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("filter", value);
    nextSearchParams.set("page", "1");

    if (onRadioChange) {
      onRadioChange(value);
    }

    setSearchParams(nextSearchParams);
  };

  return (
    <RadioGroup
      value={filter}
      onValueChange={(value) => handleRadio(value.value)}
      mb={2}
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
