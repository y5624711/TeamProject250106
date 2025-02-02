import React from "react";
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

function InoutHistorySearch({
  setSearch,
  search,
  inoutHistoryOptionList,
  handleSearchClick,
}) {
  return (
    <HStack justifyContent="center" w={"100%"} mt={-2}>
      <SelectRoot
        collection={inoutHistoryOptionList}
        size="md"
        defaultValue={["all"]}
        width="160px"
        onValueChange={(oc) => setSearch({ ...search, type: oc.value[0] })}
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {inoutHistoryOptionList.items.map((option) => (
            <SelectItem item={option} key={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </SelectRoot>
      <Input
        placeholder="검색어를 입력해 주세요."
        width="50%"
        onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSearchClick();
          }
        }}
      />
      <IconButton
        transform="translateX(-130%) "
        style={{ cursor: "pointer" }}
        variant={"ghost"}
        onClick={() => {
          window.location.search = ""; // searchParams 초기화
        }}
      >
        <BsArrowCounterclockwise size="25px" />
      </IconButton>
      <Button onClick={handleSearchClick} transform="translateX(-75%)">
        검색
      </Button>
    </HStack>
  );
}

export default InoutHistorySearch;
