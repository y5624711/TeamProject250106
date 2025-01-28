import React from "react";
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

function LocationSearch({
  locationOptionList,
  setSearch,
  search,
  handleSearchClick,
}) {
  return (
    <HStack justifyContent="center">
      <SelectRoot
        collection={locationOptionList}
        defaultValue={["all"]}
        position="relative"
        width="160px"
        onValueChange={(oc) => setSearch({ ...search, type: oc.value })}
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

export default LocationSearch;
