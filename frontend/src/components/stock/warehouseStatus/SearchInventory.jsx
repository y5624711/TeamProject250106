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
import React, { useEffect } from "react";

export function SearchInventory({
  search,
  setSearch,
  searchParams,
  setSearchParams,
}) {
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "창고명", value: "wareHouseName" },
      { label: "업체명", value: "customerName" },
      { label: "품명", value: "itemName" },
    ],
  });

  useEffect(() => {
    const nextSearchParams = { ...search };

    if (searchParams.get("type")) {
      nextSearchParams.type = searchParams.get("type");
    } else {
      nextSearchParams.type = "all";
    }

    if (searchParams.get("keyword")) {
      nextSearchParams.keyword = searchParams.get("keyword");
    } else {
      nextSearchParams.keyword = "";
    }

    setSearch(nextSearchParams);
  }, [searchParams]);

  function handleSearch() {
    if (search.keyword.trim().length > 0) {
      //검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
      nextSearchParam.set("page", 1);
      setSearchParams(nextSearchParam);
      console.log(search);
    } else {
      //검색안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");

      setSearchParams(nextSearchParam);
    }
  }

  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <HStack justifyContent="center">
      <SelectRoot
        collection={searchOptions}
        value={[search.type]}
        width="160px"
        position="relative"
        onValueChange={(sel) => {
          setSearch({ ...search, type: sel.value[0] });
        }}
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
        w={"50%"}
        value={search.keyword}
        onChange={(e) => {
          setSearch({ ...search, keyword: e.target.value.trim() });
        }}
        placeholder={"검색어를 입력해 주세요"}
        onKeyDown={handlePressKey}
      />
      <Button onClick={handleSearch}>검색</Button>
    </HStack>
  );
}
