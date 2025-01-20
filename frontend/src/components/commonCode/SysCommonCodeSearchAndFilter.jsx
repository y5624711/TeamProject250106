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
import { Button } from "../ui/button.jsx";
import React from "react";

export function SysCommonCodeSearchAndFilter({
  search,
  setSearch,
  searchParams,
  setSearchParams,
}) {
  // 검색 옵션
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "공통코드", value: "number" },
      { label: "코드명", value: "name" },
    ],
  });

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      nextSearchParam.set("page", 1);

      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");

      setSearchParams(nextSearchParam);
    }
  }

  return (
    <HStack>
      {/*셀렉트 &&검색창*/}
      <SelectRoot
        collection={searchOptions}
        value={[search.type]}
        onValueChange={(sel) => {
          setSearch({ ...search, type: sel.value[0] });
        }}
        size="sm"
        width="200px"
        position="relative"
      >
        <SelectTrigger>
          <SelectValueText />
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
      <Input
        value={search.keyword}
        onChange={(e) =>
          setSearch({ ...search, keyword: e.target.value.trim() })
        }
      />
      <Button onClick={handleSearchClick}>검색</Button>
    </HStack>
  );
}
