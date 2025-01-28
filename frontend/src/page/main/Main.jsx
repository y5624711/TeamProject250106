import { Flex, Heading, Stack } from "@chakra-ui/react";
import { MainInstallList } from "../../components/standard/main/MainInstallList.jsx";
import { MainInstkList } from "../../components/standard/main/MainInstkList.jsx";
import { MainBuyList } from "../../components/standard/main/MainBuyList.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { InventoryGraph } from "../../components/standard/main/InventoryGraph.jsx";

export function Main() {
  const [inventoryList, setInventoryList] = useState([]);

  useEffect(() => {
    axios.get("/api/inventory/graphList").then((res) => {
      //데이터 추출
      const data = res.data.map((item) => ({
        name: item.commonCodeName,
        value: item.count,
      }));

      setInventoryList(data);
      console.log(res.data);
    });
  }, []);

  return (
    <Flex w="100vw" h="100%" p={5} gap={5}>
      <Stack w={"40%"} pt={5}>
        <Heading mx={"auto"}>재고 현황</Heading>
        <InventoryGraph inventoryList={inventoryList} />
      </Stack>
      <Stack w={"60%"} gap={10} pt={5}>
        {/*구매리스트*/}
        <MainBuyList />
        {/*입고리스트*/}
        <MainInstkList />
        {/*설치리스트*/}
        <MainInstallList />
      </Stack>
    </Flex>
  );
}
