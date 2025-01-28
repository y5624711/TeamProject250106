import { Box, Center } from "@chakra-ui/react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export function InventoryGraph({ inventoryList }) {
  if (inventoryList.length === 0) return null; // 데이터가 없으면 차트를 렌더링하지 않음

  function generateColors(length) {
    return Array.from(
      { length: length },
      (_, i) => `hsl(${180 + (i * 180) / length}, 40%, 60%)`,
    );
  }

  const COLORS = generateColors(inventoryList.length);

  return (
    <Box>
      <Center>
        <ResponsiveContainer height={400}>
          <PieChart>
            <Pie
              data={inventoryList}
              dataKey={"value"}
              nameKey={"name"}
              labelLine={false}
              innerRadius={20}
              outerRadius={150}
              cx="50%"
              cy="50%"
            >
              {inventoryList.map((list, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend verticalAlign={"bottom"} align={"center"} />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Center>
    </Box>
  );
}
