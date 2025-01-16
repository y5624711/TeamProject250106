import React, { useEffect, useState } from "react";
import { Box, createListCollection, HStack, Stack } from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { SideBar } from "../../components/tool/SideBar.jsx";
import WarehouseList from "../../components/warehouse/WarehouseList.jsx";
import WarehouseView from "../../components/warehouse/WarehouseView.jsx";
import WarehouseSearch from "../../components/warehouse/WarehouseSearch.jsx";
import { Button } from "../../components/ui/button.jsx";

function Warehouse(props) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams] = useSearchParams();
  const [countWarehouse, setCountWarehouse] = useState("");
  const [selectedWarehouseKey, setSelectedWarehouseKey] = useState(1);

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/management`).then((res) => {
      setWarehouseList(res.data.list);
      // console.log(res.data);
    });
    window.scrollTo(0, 0);
  }, []);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/warehouse/management?${searchQuery.toString()}`);
  }

  const handleShowDetail = (warehouseKey) => {
    setSelectedWarehouseKey(warehouseKey);
    console.log(warehouseKey);
  };

  // 추가 버튼
  function handleAddClick() {}

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          창고 관리
          {/*검색 jsx*/}
          <WarehouseSearch
            warehouseOptionList={warehouseOptionList}
            setSearch={setSearch}
            handleSearchClick={handleSearchClick}
          />
          {/*리스트 jsx*/}
          <WarehouseList
            warehouseList={warehouseList}
            onShowDetail={handleShowDetail}
          />
        </Stack>
        <Stack>
          <Button onClick={handleAddClick} width="85px">
            창고 추가
          </Button>
          {/*상세 jsx*/}
          <WarehouseView warehouseKey={selectedWarehouseKey} />
        </Stack>
      </HStack>
    </Box>
  );
}

const warehouseOptionList = createListCollection({
  items: [
    { label: "전체", value: "all" },
    { label: "창고명", value: "warehouseName" },
    { label: "담당 업체", value: "customer" },
    { label: "업체 직원", value: "customerEmployee" },
    { label: "광역 시도", value: "warehouseState" },
    { label: "시군", value: "warehouseCity" },
    { label: "사용 여부", value: "warehouseActive" },
  ],
});

export default Warehouse;
