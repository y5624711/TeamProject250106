import React, { useEffect, useState } from "react";
import { Box, createListCollection, HStack, Stack } from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { SideBar } from "../../components/tool/SideBar.jsx";
import WarehouseList from "../../components/warehouse/WarehouseList.jsx";
import WarehouseSearch from "../../components/warehouse/WarehouseSearch.jsx";
import { Button } from "../../components/ui/button.jsx";
import { WarehouseAdd } from "../../components/warehouse/WarehouseAdd.jsx";
import { Checkbox } from "../../components/ui/checkbox.jsx";

function Warehouse(props) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [useColumn, setUseColumn] = useState(false);
  const [search, setSearch] = useState({
    active: useColumn,
    type: "all",
    keyword: "",
  });
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams] = useSearchParams();
  const [countWarehouse, setCountWarehouse] = useState("");
  const navigate = useNavigate();

  // 창고 정보 가져오기
  useEffect(() => {
    axios.get(`/api/warehouse/list?${searchParams.toString()}`).then((res) => {
      setWarehouseList(res.data.list);
      setCountWarehouse(res.data.count);
    });
    window.scrollTo(0, 0);
  }, [searchParams]);

  // 검색 버튼
  function handleSearchClick() {
    const searchInfo = {
      active: search.active,
      type: search.type,
      keyword: search.keyword,
    };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/warehouse/list?${searchQuery.toString()}`);
  }

  console.log(useColumn);

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          <HStack>
            <Box>창고 관리</Box>
            <Box>
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
          </HStack>
          {/*검색 jsx*/}
          <WarehouseSearch
            warehouseOptionList={warehouseOptionList}
            setSearch={setSearch}
            search={search}
            handleSearchClick={handleSearchClick}
          />
          <Checkbox
            onCheckedChange={() => {
              setUseColumn(!useColumn);
              setSearch({ ...search, active: useColumn });
              handleSearchClick();
            }}
          >
            삭제 내역 포함하기
          </Checkbox>
          {/*리스트 jsx*/}
          <WarehouseList
            countWarehouse={countWarehouse}
            warehouseList={warehouseList}
            useColumn={useColumn}
          />
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
