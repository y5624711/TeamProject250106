import React, { useEffect, useState } from "react";
import {
  Box,
  createListCollection,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import WarehouseList from "../../../components/standard/warehouse/WarehouseList.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { WarehouseAdd } from "../../../components/standard/warehouse/WarehouseAdd.jsx";
import { Checkbox } from "../../../components/ui/checkbox.jsx";
import { SearchBar } from "../../../components/tool/form/SearchBar.jsx";

function Warehouse(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [checkedActive, setCheckedActive] = useState(false);
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
    sort: "",
    active: checkedActive,
    order: "",
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams("");
  const [countWarehouse, setCountWarehouse] = useState("");
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );
  const [reborn, setReborn] = useState(false);
  const [auth, setAuth] = useState("");

  function refresh() {
    setReborn(!reborn);
  }

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/list?${searchParams.toString()}`).then((res) => {
      setWarehouseList(res.data.list);
      setCountWarehouse(res.data.count);
      setAuth(res.data.work);
    });
    window.scrollTo(0, 0);
  }, [searchParams, checkedActive, isAddDialogOpen, reborn]);

  useEffect(() => {
    const type = searchParams.get("type") || "all";
    const keyword = searchParams.get("keyword") || "";
    const sort = searchParams.get("sort") || "";
    const order = searchParams.get("order") || "";
    const active = searchParams.get("active") === "true";
    const page = parseInt(searchParams.get("page")) || 1;

    setCurrentPage(page);
    setSearch({
      type,
      keyword,
      sort,
      order,
      active,
    });

    setCheckedActive(active);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
      sort: search.sort,
      order: search.order,
      page: 1,
      active: search.active,
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
      active: checkedActive,
    };
    setSearchParams(new URLSearchParams(searchInfo)); // searchParams 업데이트
  }

  // 삭제 내역 포함 체크박스 상태 토글 및 URL 업데이트
  const toggleCheckedActive = () => {
    const nextValue = !checkedActive;
    setCheckedActive(nextValue);

    // 기존 searchParams를 복사한 후 active 값 업데이트, page 값 1
    const newParams = new URLSearchParams(searchParams);
    newParams.set("active", nextValue);
    newParams.set("page", 1);

    setSearchParams(newParams);
  };

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            기준정보 관리 {">"} 창고 관리
          </Heading>
          {/*검색 jsx*/}
          <SearchBar
            searchOptions={warehouseOptionList}
            onSearchChange={(nextSearchParam) =>
              setSearchParams(nextSearchParam)
            }
          />
          {/*<WarehouseSearch*/}
          {/*  warehouseOptionList={warehouseOptionList}*/}
          {/*  setSearch={setSearch}*/}
          {/*  search={search}*/}
          {/*  handleSearchClick={handleSearchClick}*/}
          {/*  setSearchParams={setSearchParams}*/}
          {/*  setCheckedActive={setCheckedActive}*/}
          {/*/>*/}
          <Checkbox
            checked={checkedActive}
            onCheckedChange={toggleCheckedActive}
            mt={1}
            mb={3}
            ml={3}
          >
            미사용 포함 조회
          </Checkbox>
          {/*리스트 jsx*/}
          <WarehouseList
            countWarehouse={countWarehouse}
            warehouseList={warehouseList}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
            setSearchParams={setSearchParams}
            refresh={refresh}
            search={search}
            setSearch={setSearch}
          />
          <Box display="flex" justifyContent="flex-end" mt="-65px">
            <Button size="lg" onClick={() => setIsAddDialogOpen(true)}>
              창고 등록
            </Button>
          </Box>
        </Stack>
        {/*등록 jsx*/}
        <WarehouseAdd
          isOpen={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          title="창고 등록"
        />
      </HStack>
    </Box>
  );
}

const warehouseOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "창고", value: "warehouse" },
    { label: "담당 업체", value: "customer" },
    { label: "관리자", value: "employee" },
    { label: "광역시도", value: "warehouseState" },
    { label: "시군", value: "warehouseCity" },
    { label: "전화번호", value: "warehouseTel" },
  ],
});

export default Warehouse;
