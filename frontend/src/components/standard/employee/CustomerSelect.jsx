import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Field } from "../../ui/field.jsx";

export function CustomerSelect({ frameworks, formData, handleSelectChange }) {
  return (
    <Field orientation="horizontal" label={"업체 구분"}>
      <SelectRoot
        collection={frameworks}
        value={formData.workPlace}
        onValueChange={handleSelectChange}
        position="relative"
      >
        <SelectTrigger>
          <SelectValueText placeholder={"선택해 주세요."} />
        </SelectTrigger>
        <SelectContent
          style={{
            width: "100%",
            top: "40px",
            position: "absolute",
          }}
        >
          {frameworks.items.map((code, index) => (
            <SelectItem item={code} key={index}>
              {code.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
    </Field>
  );
}
