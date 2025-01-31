import React from "react";
import { HStack, Input } from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";
import {
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "../../ui/select.jsx";

function WarehouseSearch({
  warehouseOptionList,
  setSearch,
  handleSearchClick,
  search,
}) {
  return (
    <HStack justifyContent="center">
      <SelectRoot
        collection={warehouseOptionList}
        defaultValue={["all"]}
        width="160px"
        onValueChange={(oc) => setSearch({ ...search, type: oc.value })}
        size="md"
      >
        <SelectTrigger>
          <SelectValueText />
        </SelectTrigger>
        <SelectContent>
          {warehouseOptionList.items.map((option) => (
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
      ></Input>
      <Button onClick={handleSearchClick}>검색</Button>
    </HStack>
  );
}

export default WarehouseSearch;
