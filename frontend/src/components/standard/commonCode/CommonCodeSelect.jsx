import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";

export function CommonCodeSelect({ codeOptions, onSelectChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "ALL");

  useEffect(() => {
    const currentFilter = searchParams.get("filter") || "all";
    setFilter(currentFilter);
  }, [searchParams]);

  const handleSelect = (selectedValue) => {
    const value = selectedValue[0];
    setFilter(value);

    const nextSearchParams = new URLSearchParams(searchParams);
    nextSearchParams.set("filter", value.toLowerCase());
    nextSearchParams.set("page", "1");

    onSelectChange(value);

    setSearchParams(nextSearchParams);
  };

  return (
    <SelectRoot
      collection={codeOptions}
      width="160px"
      position="relative"
      value={filter.toUpperCase()}
      onValueChange={(value) => handleSelect(value.value)}
    >
      <SelectTrigger>
        <SelectValueText placeholder={filter.toUpperCase()} />
      </SelectTrigger>

      <SelectContent>
        {codeOptions?.items.map((option) => (
          <SelectItem item={option.value.toUpperCase()} key={option.value}>
            {option.value.toUpperCase()}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
