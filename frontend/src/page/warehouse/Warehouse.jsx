import React, { useEffect, useState } from "react";
import {
  Box,
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { SideBar } from "../../components/tool/SideBar.jsx";
import { Button } from "../../components/ui/button.jsx";
import WarehouseList from "../../components/warehouse/WarehouseList.jsx";

function Warehouse(props) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams] = useSearchParams();
  const [countWarehouse, setCountWarehouse] = useState("");

  useEffect(() => {
    axios.get(`/api/warehouse/management`).then((res) => {
      setWarehouseList(res.data.list);
      // console.log(res.data);
    });
    window.scrollTo(0, 0);
  }, []);

  function handleSearchClick() {
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/warehouse/list?${searchQuery.toString()}`);
  }

  return (
    <Box>
      <HStack align="flex-start">
        <SideBar />
        <Stack>
          창고 관리
          <Box>
            <Stack justify={"top"} direction={"row"}>
              <Box>
                <SelectRoot
                  collection={warehouseOptionList}
                  defaultValue={["all"]}
                  width="120px"
                >
                  <SelectTrigger>
                    <SelectValueText />
                  </SelectTrigger>
                  <SelectContent>
                    {warehouseOptionList.items.map((items) => (
                      <SelectItem item={items} key={items.value}>
                        {items.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </SelectRoot>
              </Box>

              <Box>
                <Input
                  placeholder="키워드를 입력해주세요"
                  width="400px"
                  onChange={(e) =>
                    setSearch({ ...search, keyword: e.target.value })
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearchClick();
                    }
                  }}
                ></Input>
              </Box>
              <Box>
                <Button>검색</Button>
              </Box>
            </Stack>
          </Box>
          <WarehouseList warehouseList={warehouseList} />
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
