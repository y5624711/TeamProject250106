import React from "react";
import {
  Box,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { Button } from "../../ui/button.jsx";

function LocationSearch({
  locationOptionList,
  setSearch,
  search,
  handleSearchClick,
}) {
  return (
    <Box>
      <Stack justify={"top"} direction={"row"}>
        <Box>
          <SelectRoot
            collection={locationOptionList}
            defaultValue={["all"]}
            width="120px"
            onValueChange={(oc) => setSearch({ ...search, type: oc.value })}
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
        </Box>

        <Box>
          <Input
            placeholder="키워드를 입력해주세요"
            width="700px"
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          ></Input>
        </Box>
        <Box>
          <Button onClick={handleSearchClick}>검색</Button>
        </Box>
      </Stack>
    </Box>
  );
}

export default LocationSearch;
