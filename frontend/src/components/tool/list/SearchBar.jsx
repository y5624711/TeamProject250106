import React, { useEffect, useState } from "react";
import {
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import { useSearchParams } from "react-router-dom";

export function SearchBar({ onSearchChange, searchOptions }) {
  const [searchParams, setSearchParams] = useSearchParams("");
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });

  useEffect(() => {
    const type = searchParams.get("type") ?? "all";
    const keyword = searchParams.get("keyword") ?? "";
    setSearch({ type, keyword });
  }, [searchParams]);

  // 검색 조건에 맞는 URL 파라미터 설정
  const buildSearchParams = () => {
    const nextSearchParam = new URLSearchParams();
    if (search.keyword.trim().length > 0) {
      nextSearchParam.set("type", search.type);
      nextSearchParam.set("keyword", search.keyword);
    } else {
      nextSearchParam.delete("type");
      nextSearchParam.delete("keyword");
    }
    // 검색해도 active, sort, order 값 유지
    const active = searchParams.get("active") ?? "false";
    nextSearchParam.set("active", active);

    const sort = searchParams.get("sort") ?? "";
    const order = searchParams.get("order") ?? "asc";
    nextSearchParam.set("sort", sort);
    nextSearchParam.set("order", order);
    return nextSearchParam;
  };

  // 검색 파라미터가 변경되면 URL 업데이트
  const handleSearchClick = () => {
    const nextSearchParam = buildSearchParams();
    setSearchParams(nextSearchParam);
    onSearchChange(nextSearchParam); // 부모에게 전달
  };

  return (
    <HStack justifyContent="center">
      <SelectRoot
        collection={searchOptions}
        width="160px"
        position="relative"
        value={[search.type]}
        onValueChange={(e) => {
          setSearch({ ...search, type: e.value[0] });
        }}
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent
          style={{
            width: "150px",
            top: "40px",
            position: "absolute",
          }}
        >
          {searchOptions?.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Input
        placeholder="검색어를 입력해 주세요."
        width="50%"
        value={search.keyword}
        onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <Button onClick={handleSearchClick}>검색</Button>
    </HStack>
  );
}
