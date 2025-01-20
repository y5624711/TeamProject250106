import React, { useState } from "react";
import {
  Box,
  Button,
  createListCollection,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import LocationAdd from "../../../components/location/LocationAdd.jsx";
import LocationSearch from "../../../components/location/LocationSearch.jsx";
import { useNavigate } from "react-router-dom";

function Location(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const navigate = useNavigate();

  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/location/list?${searchQuery.toString()}`);
  }

  return (
    <Box>
      <HStack align="flex-start">
        <StandardSideBar />
        <Stack>
          로케이션 관리
          <LocationSearch
            locationOptionList={locationOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <Box>
            <Button width="120px" onClick={() => setIsAddDialogOpen(true)}>
              새 로케이션 등록
            </Button>
          </Box>
          {/*등록 jsx*/}
          <LocationAdd
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onConfirm={() => setIsAddDialogOpen(false)}
            title="새 로케이션 등록"
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const locationOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "창고명", value: "warehouseName" },
    { label: "행", value: "row" },
    { label: "열", value: "column" },
    { label: "단", value: "shelf" },
    { label: "품목명", value: "itemName" },
  ],
});

export default Location;
