import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import React from "react";
import { Field } from "../../ui/field.jsx";

export function SelectCode({ selectOptions, onChange, selectValue }) {
  const handleSelect = (selectedItem) => {
    if (onChange) {
      onChange(selectedItem.value); // 선택된 값 전달
      console.log(selectValue);
    }
  };

  return (
    <Field label={"코드 구분"} orientation="horizontal">
      <SelectRoot collection={selectOptions} onValueChange={handleSelect}>
        <SelectTrigger>
          <SelectValueText
            placeholder={selectValue != null ? selectValue : "코드 구분 선택"}
          />
        </SelectTrigger>
        <SelectContent
          style={{
            width: "85%",
            top: "40px",
            position: "absolute",
          }}
        >
          {selectOptions.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.value}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  );
}
