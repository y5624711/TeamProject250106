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
    sort: "",
    order: "",
  });
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams("");
  const [countLocation, setCountLocation] = useState("");
  const [locationList, setLocationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [reborn, setReborn] = useState(false);

  function refresh() {
    setReborn(!reborn);
  }

  // 로케이션 정보 가져오기
  useEffect(() => {
    axios.get(`/api/location/list?${searchParams.toString()}`).then((res) => {
      setLocationList(res.data.list);
      setCountLocation(res.data.count);
    });
    window.scrollTo(0, 0);
  }, [searchParams, isAddDialogOpen, reborn]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
      sort: search.sort,
      order: search.order,
      page: 1,
    };
    setSearchParams(new URLSearchParams(searchInfo)); // searchParams 업데이트
  }

  function handlePageChangeClick(e) {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
      sort: search.sort,
      order: search.order,
      page: e.page,
    };
    setSearchParams(new URLSearchParams(searchInfo)); // searchParams 업데이트
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
          <Box h={9}></Box>
          <LocationList
            countLocation={countLocation}
            locationList={locationList}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
            setSearchParams={setSearchParams}
            searchParams={searchParams}
            refresh={refresh}
            setSearch={setSearch}
            search={search}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button
              size={"lg"}
              mt={"-65px"}
              onClick={() => setIsAddDialogOpen(true)}
            >
              로케이션 등록
            </Button>
          </Box>
          {/*등록 jsx*/}
          <LocationAdd
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            title="로케이션 등록"
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const locationOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "창고", value: "warehouse" },
    { label: "행", value: "row" },
    { label: "열", value: "col" },
    { label: "단", value: "shelf" },
  ],
});

export default Location;
