import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  createListCollection,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import LocationAdd from "../../../components/standard/location/LocationAdd.jsx";
import LocationSearch from "../../../components/standard/location/LocationSearch.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import LocationList from "../../../components/standard/location/LocationList.jsx";
import axios from "axios";

function Location(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [countLocation, setCountLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );

  // 로케이션 정보 가져오기
  useEffect(() => {
    axios.get(`/api/location/list?${searchParams.toString()}`).then((res) => {
      setLocationList(res.data.list);
      setCountLocation(res.data.count);
    });
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/location/list?${searchQuery.toString()}`);
  }

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/location/list?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            기준정보 관리 {">"} 로케이션 관리
          </Heading>
          <LocationSearch
            locationOptionList={locationOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <LocationList
            countLocation={countLocation}
            locationList={locationList}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
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
    { label: "열", value: "col" },
    { label: "단", value: "shelf" },
    { label: "품목명", value: "itemName" },
  ],
});

export default Location;
