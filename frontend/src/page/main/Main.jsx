import { Flex, Heading, Spinner, Stack, Text } from "@chakra-ui/react";
import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { InstlViewList } from "./InstlViewList.jsx";
import { InstkviewList } from "./InstkviewList.jsx";
import { BuyList } from "./BuyList.jsx";

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
      <MemberBox user={user} />

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
