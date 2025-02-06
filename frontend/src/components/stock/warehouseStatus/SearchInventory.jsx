import {
  createListCollection,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import React, { useEffect } from "react";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";

export function SearchInventory({
  search,
  setSearch,
  searchParams,
  setSearchParams,
}) {
  const searchOptions = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "창고", value: "wareHouseName" },
      { label: "광역시도", value: "warehouseCity" },
      { label: "시군", value: "warehouseAddress" },
      { label: "협력 업체", value: "customerName" },
      { label: "품목", value: "itemName" },
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

  const handleResetClick = () => {
    setSearchParams({ page: "1" }); // searchParams 초기화
    setSearch({ type: "all", keyword: "" }); // search 상태도 초기화
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
            width: "150px",
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
        placeholder={"검색어를 입력해 주세요."}
        onKeyDown={handlePressKey}
      />
      <IconButton
        transform="translateX(-130%) "
        style={{ cursor: "pointer" }}
        variant={"none"}
        onClick={handleResetClick}
      >
        <BsArrowCounterclockwise size="25px" />
      </IconButton>
      <Button onClick={handleSearch} transform="translateX(-70%) ">
        검색
      </Button>
    </HStack>
  );
}
