import {
  createListCollection,
  HStack,
  IconButton,
  Input,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";
import React from "react";

export function BusinessSearchAndFilter({
  search,
  setSearch,
  searchParams,
  setSearchParams,
  handleReset,
}) {
  /*검색타입*/
  const optionList = createListCollection({
    items: [
      { label: "전체", value: "all" },
      { label: "부서번호", value: "number" },
      { label: "부서명", value: "name" },
    ],
  });
  const handlePressKey = (e) => {
    if (e.key === "Enter") {
      handleSearchClick();
    }
  };

  function handleSearchClick() {
    if (search.keyword.trim().length > 0) {
      // 검색
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.set("st", search.type);
      nextSearchParam.set("sk", search.keyword);
      nextSearchParam.set("page", 1);

      setSearchParams(nextSearchParam);
    } else {
      // 검색 안함
      const nextSearchParam = new URLSearchParams(searchParams);
      nextSearchParam.delete("st");
      nextSearchParam.delete("sk");

      setSearchParams(nextSearchParam);
    }
  }

  return (
    <HStack justifyContent="center" mt={5}>
      {/*셀렉트 &&검색창*/}
      <SelectRoot
        collection={optionList}
        value={[search.type]}
        onValueChange={(sel) => {
          setSearch({ ...search, type: sel.value[0] });
        }}
        width="160px"
        position="relative"
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent
          w={"100%"}
          style={{
            position: "absolute",
          }}
        >
          {optionList.items.map((option) => (
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
        onChange={(e) =>
          setSearch({ ...search, keyword: e.target.value.trim() })
        }
        placeholder={"검색어를 입력해 주세요"}
        onKeyDown={handlePressKey}
      />
      <IconButton
        variant={"ghost"}
        style={{ cursor: "pointer" }}
        transform="translateX(-130%) "
        onClick={handleReset}
      >
        <BsArrowCounterclockwise size="25px" />
      </IconButton>
      <Button onClick={handleSearchClick} transform="translateX(-70%) ">
        검색
      </Button>
    </HStack>
  );
}
