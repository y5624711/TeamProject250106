import React, { useEffect, useState } from "react";
import { StockSideBar } from "../../../components/tool/sidebar/StockSideBar.jsx";
import { Center, Heading, HStack, Spinner, Stack } from "@chakra-ui/react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../../components/ui/pagination.jsx";
import axios from "axios";
import { InventoryTable } from "../../../components/stock/warehouseStatus/InventoryTable.jsx";
import { SearchInventory } from "../../../components/stock/warehouseStatus/SearchInventory.jsx";
import { useSearchParams } from "react-router-dom";

function WarehouseStatus() {
  const [inventoryList, setInventoryList] = useState([]);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const [search, setSearch] = useState({ type: "all", keyword: "" });
  // const [sort, setSort] = useState({ column: "", order: "desc" });
  const pageParam = searchParams.get("page") ? searchParams.get("page") : "1";
  const page = Number(pageParam);

  useEffect(() => {
    axios
      .get("/api/inventory/list", { params: searchParams })
      .then((res) => {
        setInventoryList(res.data.list);
        console.log(res.data.list);
        setCount(res.data.count);
      })
      .finally(() => setLoading(false));
  }, [searchParams]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <HStack align="flex-start" w={"100%"}>
      <StockSideBar />
      <Stack flex={1} p={5}>
        {/*셀렉트 &&검색창*/}

        <Heading size={"xl"} p={2} mb={3}>
          위치별 재고현황
        </Heading>

        <SearchInventory
          search={search}
          setSearch={setSearch}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <InventoryTable
          inventoryList={inventoryList}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />

        <Center>
          <PaginationRoot
            count={count}
            pageSize={10}
            page={page}
            variant="solid"
          >
            <HStack>
              <PaginationPrevTrigger />
              <PaginationItems />
              <PaginationNextTrigger />
            </HStack>
          </PaginationRoot>
        </Center>
      </Stack>
    </HStack>
  );
}

export default WarehouseStatus;
