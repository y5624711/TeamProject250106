import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

export function CustomerSelect({ frameworks, formData, handleSelectChange }) {
  return (
    <SelectRoot
      collection={frameworks}
      value={formData.workPlace}
      onValueChange={handleSelectChange}
    >
      <SelectLabel>상위 구분 코드</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={"선택 해 주세요"} />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((code) => (
          <SelectItem item={code} key={code.value}>
            {code.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
