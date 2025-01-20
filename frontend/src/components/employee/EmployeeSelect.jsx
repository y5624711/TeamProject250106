import {
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";

export function EmployeeSelect({ frameworks, formData, handleSelectChange }) {
  console.log("frameworks", frameworks, frameworks.items[0].label);
  return (
    <SelectRoot
      collection={frameworks}
      value={formData.workPlace}
      onValueChange={handleSelectChange}
      // defaultValue={viewKey !== -1 ? [formData.selectedCommonCode] : ""}
      // readOnly={viewKey !== -1}
    >
      <SelectLabel> 부서를 선택해주세요</SelectLabel>
      <SelectTrigger>
        <SelectValueText placeholder={"부서"} />
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
