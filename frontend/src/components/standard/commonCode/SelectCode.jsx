import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React from "react";

export function SelectCode({ selectOptions, onChange }) {
  const handleSelect = (selectedItem) => {
    if (onChange) {
      onChange(selectedItem.value); // 선택된 값 전달
    }
  };

  return (
    <SelectRoot
      size="sm"
      width="150px"
      collection={selectOptions}
      position="relative"
      marginBottom={15}
      marginTop={5}
      onValueChange={handleSelect}
    >
      <SelectTrigger>
        <SelectValueText placeholder="Select Code" />
      </SelectTrigger>
      <SelectContent
        style={{
          width: "150px",
          top: "30px",
          position: "absolute",
        }}
      >
        {selectOptions.items.map((option) => (
          <SelectItem item={option} key={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
