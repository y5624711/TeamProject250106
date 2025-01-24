import {
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import React from "react";

export function SearchInventory() {
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "창고명", value: "wareHouseName" },
      { label: "업체명", value: "customerName" },
      { label: "품명", value: "commonCodeName" },
    ],
  });

  return (
    <HStack justifyContent="center">
      <SelectRoot
        collection={searchOptions}
        value={"전체"}
        width="160px"
        position="relative"
      >
        <SelectTrigger>
          <SelectValueText placeholder="전체" />
        </SelectTrigger>
        <SelectContent
          style={{
            width: "100px",
            top: "40px",
            position: "absolute",
          }}
        >
          {searchOptions.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      {/*검색창*/}
      <Input w={"50%"} />
      <Button>검색</Button>
    </HStack>
  );
}
