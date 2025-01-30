import React, { useEffect, useState } from "react";
import {
  Box,
  createListCollection,
  Heading,
  HStack,
  Stack,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { StandardSideBar } from "../../../components/tool/sidebar/StandardSideBar.jsx";
import WarehouseList from "../../../components/standard/warehouse/WarehouseList.jsx";
import WarehouseSearch from "../../../components/standard/warehouse/WarehouseSearch.jsx";
import { Button } from "../../../components/ui/button.jsx";
import { WarehouseAdd } from "../../../components/standard/warehouse/WarehouseAdd.jsx";
import { Checkbox } from "../../../components/ui/checkbox.jsx";

function Warehouse(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [search, setSearch] = useState({
    type: "all",
    keyword: "",
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams] = useSearchParams();
  const [countWarehouse, setCountWarehouse] = useState("");
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1,
  );

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/list?${searchParams.toString()}`).then((res) => {
      setWarehouseList(res.data.list);
      setCountWarehouse(res.data.count);
    });
    window.scrollTo(0, 0);
  }, [searchParams]);

  useEffect(() => {
    const page = parseInt(searchParams.get("page")) || 1;
    setCurrentPage(page);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/warehouse/list?${searchQuery.toString()}`);
  }

  function handlePageChangeClick(e) {
    const pageNumber = { page: e.page };
    const pageQuery = new URLSearchParams(pageNumber);
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(
      `/warehouse/list?${searchQuery.toString()}&${pageQuery.toString()}`,
    );
  }

  return (
    <Box>
      <HStack align="flex-start" w="100%">
        <StandardSideBar />
        <Stack flex={1} p={5}>
          <Heading size={"xl"} p={2} mb={3}>
            기준정보 관리 {">"} 창고 관리
          </Heading>
          {/*검색 jsx*/}
          <WarehouseSearch
            warehouseOptionList={warehouseOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <Checkbox>전체 조회</Checkbox>
          {/*리스트 jsx*/}
          <WarehouseList
            countWarehouse={countWarehouse}
            warehouseList={warehouseList}
            currentPage={currentPage}
            handlePageChangeClick={handlePageChangeClick}
          />
          <Box display="flex" justifyContent="flex-end" mb={4}>
            <Button width="85px" onClick={() => setIsAddDialogOpen(true)}>
              새 창고 등록
            </Button>
          </Box>
          {/*등록 jsx*/}
          <WarehouseAdd
            isOpen={isAddDialogOpen}
            onClose={() => setIsAddDialogOpen(false)}
            onConfirm={() => setIsAddDialogOpen(false)}
            title="새 창고 등록"
          />
        </Stack>
      </HStack>
    </Box>
  );
}

const warehouseOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "창고", value: "warehouse" },
    { label: "담당 업체", value: "customer" },
    { label: "업체 직원", value: "employee" },
    { label: "광역 시도", value: "warehouseState" },
    { label: "시군", value: "warehouseCity" },
  ],
});

export default Warehouse;
