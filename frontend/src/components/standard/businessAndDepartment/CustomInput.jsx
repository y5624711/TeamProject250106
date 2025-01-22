import { Input } from "@chakra-ui/react";

export function CustomInput({ onChange, readOnly = false, ...props }) {
  return (
    <Input
      // borderColor="black" // 기본 외곽선 색상
      boxShadow="0 0 0 1px black" // 기본 외곽선 스타일
      size="sm"
      onChange={onChange} // onChange 핸들러 전달
      readOnly={readOnly}
      {...props} // 추가 속성 전달
    />
  );
}
