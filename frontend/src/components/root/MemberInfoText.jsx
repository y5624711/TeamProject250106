import { useContext, useEffect, useState } from "react";
import { AuthenticationContext } from "../../context/AuthenticationProvider.jsx";
import axios from "axios";
import { Heading, HStack, Spinner, Text } from "@chakra-ui/react";

export function MemberInfoText() {
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
    <HStack gap={3}>
      <Heading whiteSpace={"nowrap"}>{user.employeeWorkPlaceName}</Heading>
      <Text fontWeight={"bold"} color={"gray.700"} whiteSpace={"nowrap"}>
        {user.employeeName} 님 환영합니다.
      </Text>
    </HStack>
  );
}
