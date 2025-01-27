import {
  Box,
  Flex,
  Heading,
  Spinner,
  Stack,
  Table,
  Text,
} from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";

function MemberBox({ user }) {
  return (
    <Stack
      w={"300px"}
      h={"20%"}
      bg={"gray.200"}
      display="flex" // Flex 레이아웃
      flexDirection="column" // 세로 정렬
      alignItems="center" // 수평 가운데 정렬
      justifyContent="center" // 수직 가운데 정렬
      gap={5}
    >
      <Heading fontSize={"30px"}>{user.employeeWorkPlaceName}</Heading>
      <Text fontSize={"16px"}>{user.employeeName} 님 환영합니다.</Text>
    </Stack>
  );
}

function BuyList() {
  return (
    <Box>
      <Heading>구매 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            <Table.ColumnHeader>Product</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell textAlign="end">3</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

function InstkviewList() {
  return (
    <Box>
      <Heading>입고 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            <Table.ColumnHeader>Product2</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell textAlign="end"></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

function InstlViewList() {
  return (
    <Box>
      <Heading>설치 현황</Heading>
      <Table.Root size="sm">
        <Table.Header>
          <Table.Row bg={"gray.100"}>
            <Table.ColumnHeader>Product2</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader>Category</Table.ColumnHeader>
            <Table.ColumnHeader textAlign="end">Price</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          <Table.Row>
            <Table.Cell>1</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell>2</Table.Cell>
            <Table.Cell textAlign="end"></Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table.Root>
    </Box>
  );
}

export function Main() {
  const { hasAccess, id } = useContext(AuthenticationContext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // id가 유효한 경우에만 요청 실행
    if (!id) {
      return;
    }

    axios
      .get(`/api/main/boardMain`, { params: { id } })
      .then((res) => res.data)
      .then((data) => {
        setUser(data.id);
        console.log(data.id);
        setLoading(false); // 로딩 상태 해제
      })
      .catch((e) => {
        console.error("Error fetching data:", e);
        setLoading(false); // 에러 발생 시에도 로딩 상태 해제
      });
  }, [id]); // id가 변경될 때만 실행

  if (loading) {
    return <Spinner />;
  }

  return (
    <Flex w="100vw" h="100%">
      <Box>
        <MemberBox user={user} />
      </Box>
      <Stack w={"60%"} mx={"auto"} gap={10}>
        {/*구매리스트*/}
        <BuyList />
        {/*입고리스트*/}
        <InstkviewList />
        {/*설치리스트*/}
        <InstlViewList />
      </Stack>
    </Flex>
  );
}
