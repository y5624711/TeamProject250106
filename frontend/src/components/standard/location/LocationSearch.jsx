import React, { useState } from "react";
import { HStack, IconButton, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";
import { BsArrowCounterclockwise } from "react-icons/bs";

function LocationSearch({
  locationOptionList,
  setSearch,
  search,
  handleSearchClick,
  setSearchParams,
}) {
  const [inputValue, setInputValue] = useState("");
  const [selectValue, setSelectValue] = useState(["all"]);

  const resetSearch = () => {
    setSearchParams("?"); // 검색 파라미터 초기화
    setSearch({
      type: "all",
      keyword: "",
      sort: "",
      order: "",
      active: true,
    });
    setInputValue(""); // 입력 필드 초기화
    setSelectValue(["all"]); // 선택 값 초기화
  };

  return (
    <HStack justifyContent="center" w={"100%"} mt={-2}>
      <SelectRoot
        collection={locationOptionList}
        value={selectValue.includes("all") ? selectValue : selectValue[0]}
        defaultValue={["all"]}
        size="md"
        width="160px"
        onValueChange={(oc) => {
          setSelectValue([oc.value]);
          setSearch({ ...search, type: oc.value });
        }}
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {locationOptionList.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>

      <Input
        placeholder="검색어를 입력해 주세요."
        width="50%"
        onChange={(e) => {
          setInputValue(e.target.value);
          setSearch({ ...search, keyword: e.target.value });
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
        value={inputValue}
      />
      <IconButton
        transform="translateX(-130%) "
        style={{ cursor: "pointer" }}
        variant={"ghost"}
        onClick={resetSearch}
      >
        <BsArrowCounterclockwise size="25px" />
      </IconButton>
      <Button onClick={handleSearchClick} transform="translateX(-75%)">
        검색
      </Button>
    </HStack>
  );
}

export default LocationSearch;
