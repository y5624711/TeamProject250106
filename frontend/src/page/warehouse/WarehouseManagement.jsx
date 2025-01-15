import React, { useEffect, useState } from "react";
import {
  createListCollection,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
} from "@chakra-ui/react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

function WarehouseManagement(props) {
  const [value, setValue] = useState([]);
  const [search, setSearch] = useState("");
  const [warehouseList, setWarehouseList] = useState([]);
  const [searchParams] = useSearchParams();
  const [countWarehouse, setCountWarehouse] = useState("");

  useEffect(() => {
    axios.get(`/api/warehouse/list?${searchParams.toString()}`).then((res) => {
      setWarehouseList(res.data.list);
      setCountWarehouse(res.data.countWarehouse);
      // console.log(res.data);
    });
    window.scrollTo(0, 0);
  }, [searchParams]);

  function handleSearchClick() {
    const searchInfo = { type: search.type, keyword: search.keyword };
    const searchQuery = new URLSearchParams(searchInfo);
    navigate(`/warehouse/list?${searchQuery.toString()}`);
  }

  return (
    <div>
      창고관리
      <div>
        <HStack>
          <SelectRoot collection={warehouseOptionList} size="sm" width="240px">
            <SelectTrigger>
              <SelectValueText placeholder="Select movie" />
            </SelectTrigger>
            <SelectContent>
              {warehouseOptionList.items.map((items) => (
                <SelectItem item={items} key={items.value}>
                  {items.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>

          <Input
            placeholder="키워드를 입력해주세요"
            width="320px"
            onChange={(e) => setSearch({ ...search, keyword: e.target.value })}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearchClick();
              }
            }}
          ></Input>
        </HStack>
      </div>
    </div>
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

export default WarehouseManagement;
