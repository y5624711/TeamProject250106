import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { createListCollection } from "@chakra-ui/react";

export function CommonCodeSelect({ onSelectChange }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const codeOptions = createListCollection({
    items: ["ALL", "ITEM", "STANDARD", "STATE"].map((value) => ({ value })),
  });
  const defaultFilter = codeOptions.items[0].value;
  const [filter, setFilter] = useState(defaultFilter);

  useEffect(() => {
    const paramFilter =
      searchParams.get("filter")?.toUpperCase() || defaultFilter;
    setFilter(paramFilter);
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
      value={[filter]}
      onValueChange={(e) => handleSelect(e.value)}
    >
      <SelectTrigger>
        <SelectValueText placeholder={filter} />
      </SelectTrigger>

      <SelectContent>
        {codeOptions?.items.map((option) => (
          <SelectItem item={option.value} key={option.value}>
            {option.value}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
