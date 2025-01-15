import { Box, Heading, HStack, Input } from "@chakra-ui/react";
import { Field } from "../ui/field.jsx";
import { Button } from "../ui/button.jsx";

function CustomInput({ onChange, readOnly = false, ...props }) {
  return (
    <Input
      borderColor="black"
      _hover={{ borderColor: "black" }}
      _focus={{
        borderColor: "black",
        boxShadow: "0 0 0 1px black",
      }}
      readOnly={readOnly}
      onChange={!readOnly ? onChange : undefined} // onChange 핸들러 전달
      {...props} // 추가 속성 전달
    />
  );
}

export function BusinessInfo({
  business,
  setBusiness,
  isEditing,
  toggleEditing,
  handleSaveClick,
}) {
  return (
    <Box p={5} bgColor={"gray.200"}>
      {isEditing && <Heading color={"red"}>수정중..</Heading>}
      <Field label={"회사명"}>
        <CustomInput
          value={business.businessName || ""}
          onChange={(e) =>
            setBusiness((prev) => ({
              ...prev,
              businessName: e.target.value,
            }))
          }
          readOnly={!isEditing}
        />
      </Field>
      <HStack>
        <Field label={"대표"}>
          <CustomInput
            value={business.businessRep || ""}
            onChange={(e) =>
              setBusiness((prev) => ({
                ...prev,
                businessNo: e.target.value, // businessName 업데이트
              }))
            }
            readOnly={!isEditing}
          />
        </Field>
        <Field label={"사업자번호"}>
          <CustomInput
            value={business.businessNo || ""}
            onChange={(e) =>
              setBusiness((prev) => ({
                ...prev,
                businessNo: e.target.value, // businessName 업데이트
              }))
            }
            readOnly={!isEditing}
          />
        </Field>
      </HStack>
      <HStack>
        <Field label={"대표 전화번호"}>
          <CustomInput
            value={business.businessTel || ""}
            onChange={(e) =>
              setBusiness((prev) => ({
                ...prev,
                businessTel: e.target.value, // businessName 업데이트
              }))
            }
            readOnly={!isEditing}
          />
        </Field>
        <Field label={"팩스번호"}>
          <CustomInput
            value={business.businessFax || ""}
            onChange={(e) =>
              setBusiness((prev) => ({
                ...prev,
                businessFax: e.target.value, // businessName 업데이트
              }))
            }
            readOnly={!isEditing}
          />
        </Field>
      </HStack>
      <Field label={"주소"}>
        <CustomInput
          value={business.businessAddress || ""}
          onChange={(e) =>
            setBusiness((prev) => ({
              ...prev,
              businessAddress: e.target.value, // businessName 업데이트
            }))
          }
          readOnly={!isEditing}
        />
      </Field>
      <HStack pt={3}>
        {!isEditing && <Button onClick={toggleEditing}>수정</Button>}
        {isEditing && <Button onClick={handleSaveClick}>저장</Button>}
      </HStack>
    </Box>
  );
}
