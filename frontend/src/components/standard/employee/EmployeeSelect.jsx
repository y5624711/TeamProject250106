import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

export function EmployeeSelect({ frameworks, formData, handleSelectChange }) {
  return (
    <SelectRoot
      collection={frameworks}
      value={formData.workPlace}
      onValueChange={handleSelectChange}
    >
      <SelectLabel> 부서를 선택해주세요</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={"부서"} />
      </SelectTrigger>
      <SelectContent>
        {frameworks.items.map((code, index) => (
          <SelectItem item={code} key={index}>
            {code.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
