import { Box, Flex, Heading, Stack } from "@chakra-ui/react";
import { MainInstallList } from "../../components/standard/main/MainInstallList.jsx";
import { MainInstkList } from "../../components/standard/main/MainInstkList.jsx";
import { MainBuyList } from "../../components/standard/main/MainBuyList.jsx";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function InventoryGraph() {
  const data01 = [
    {
      name: "Group A",
      value: 400,
    },
    {
      name: "Group B",
      value: 300,
    },
    {
      name: "Group C",
      value: 300,
    },
    {
      name: "Group D",
      value: 200,
    },
    {
      name: "Group E",
      value: 278,
    },
    {
      name: "Group F",
      value: 189,
    },
  ];
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return (
    <Box>
      <Heading>재고 현황</Heading>
      <ResponsiveContainer mx={"auto"} height={300}>
        <PieChart>
          <Pie
            data={data01}
            dataKey="value"
            nameKey="name"
            innerRadius={20}
            outerRadius={130}
            cx="50%"
            cy="50%"
            fill="#82ca9d"
            label
          >
            {data01.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
}

export function Main() {
  return (
    <Flex w="100vw" h="100%" p={5} gap={5}>
      <Stack w={"40%"}>
        <InventoryGraph />
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
