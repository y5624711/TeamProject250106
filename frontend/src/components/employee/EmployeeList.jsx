import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  createListCollection,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Table,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";
import {
  PaginationItem,
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import log from "eslint-plugin-react/lib/util/log.js";
import { FaArrowDown } from "react-icons/fa6";

export function EmployeeList({ onSelect, updateList }) {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [count, setCount] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  // 상태 초기화: 쿼리 파라미터에서 값 가져오기
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [sort, setSort] = useState(searchParams.get("sort") || "all");
  const [isActiveVisible, setIsActiveVisible] = useState(
    searchParams.get("active") === "true",
  );
  const [keyword, setKeyword] = useState(searchParams.get("keyword") || "");
  const [type, setType] = useState(searchParams.get("type") || "all");
  const [order, setOrder] = useState(searchParams.get("order") || "desc");

  const updateQuery = () => {
    setSearchParams({
      page: page,
      sort: sort,
      order: order,
      active: isActiveVisible,
      keyword: keyword,
      type: type,
    });
  };

  useEffect(() => {
    // 전체 직원 리스트 불러오기
    if (Array.isArray(type)) {
      type.join("");
    }
    axios
      .get("/api/employee/list", {
        params: {
          page: page,
          isActiveVisible: isActiveVisible,
          keyword: keyword,
          type: type,
          sort: sort,
          order: order,
        },
      })
      .then((res) => {
        setMemberList(res.data.employeeList);
        setCount(res.data.totalCount);
      })
      .catch((err) => {
        console.log("직원 정보를 받는중 오류", err);
      });
    updateQuery();
  }, [updateList, page, searchParams]);

  // 리스트 클릭시 , 해당 키 값의 상세 정보를 보여주기 위해서
  const handleSelectedItem = (no) => {
    onSelect(no);
  };
  // active 보여주는거 정하는 버튼
  const handleVisible = () => {
    setIsActiveVisible(!isActiveVisible);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev); // 복사본 생성
      newParams.set("active", !isActiveVisible); // "active" 키에 새로운 값 설정
      return newParams;
    });
  };
  //  페이지 버튼 클릭시
  function handlePageChange(e) {
    setPage(e.page);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev); // 복사본 생성
      newParams.set("active", !isActiveVisible); // "active" 키에 새로운 값 설정
      return newParams;
    });
  }

  function handleSearchButton() {
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev); // 복사본 생성
      newParams.set("type", type);
      newParams.set("keyword", keyword); //
      // 검색하고 첫 페이지 보이게끔
      setPage(1);
      return newParams;
    });
  }

  const frameworks = createListCollection({
    items: [
      { label: "소속구분", value: "소속구분" },
      { label: "기업명", value: "기업명" },
      { label: "부서명", value: "부서명" },
      { label: "직원명", value: "직원명" },
      { label: "사번", value: "사번" },
      { label: "계약여부", value: "계약여부" },
    ],
  });

  // TODO :  나중에 테이블 다 생기면, 조인 해서 기업명, 부서명 등 가져와야함
  return (
    <Box>
      <Heading>
        인사관리
        <Button
          onClick={() => {
            handleVisible();
          }}
        >
          {" "}
          변경버튼 ㅋ-ㅋ
        </Button>{" "}
      </Heading>
      <HStack>
        <Box>
          <SelectRoot
            collection={frameworks}
            value={type}
            onValueChange={(e) => setType(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder={"선택 해 주세요"} />
            </SelectTrigger>
            <SelectContent>
              {frameworks.items.map((code) => (
                <SelectItem item={code} key={code.value}>
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Input
          placeholder={"검색어를 입력해주세요"}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />

        <Button onClick={handleSearchButton}>검색</Button>
      </HStack>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                소속 구분
                <Stack>
                  <FaArrowUp /> <FaArrowDown />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>기업명</Table.ColumnHeader>
            <Table.ColumnHeader>부서명</Table.ColumnHeader>
            <Table.ColumnHeader>직원명</Table.ColumnHeader>
            <Table.ColumnHeader>사번</Table.ColumnHeader>
            {isActiveVisible && (
              <Table.ColumnHeader>계약여부</Table.ColumnHeader>
            )}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {/* isActiveVisible 이 true면  다 통과시키는 구조 고 ,  아니면  active가 트루인것만 */}
          {memberList
            // .filter((item) =>
            //   isActiveVisible ? true : item.employeeActive === true,
            // )
            .map((item, index) => (
              <Table.Row
                key={item.employeeKey}
                onClick={() => handleSelectedItem(item.employeeKey)}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                <Table.Cell> {item.employeeWorkPlaceCode} </Table.Cell>
                <Table.Cell> {item.empl} </Table.Cell>
                <Table.Cell> {item.employeePassword} </Table.Cell>
                <Table.Cell> {item.employeeName} </Table.Cell>
                <Table.Cell> {item.employeeNo} </Table.Cell>

                {isActiveVisible && (
                  <Table.Cell>
                    {item.employeeActive === true ? "사용중" : "사용안함"}
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table.Root>
      <PaginationRoot
        onPageChange={handlePageChange}
        count={count}
        pageSize={10}
        page={page}
        defaultPage={1}
        variant={"solid"}
      >
        <HStack>
          <PaginationPrevTrigger>
            <FaArrowLeft />
          </PaginationPrevTrigger>
          <PaginationItems />
          <PaginationNextTrigger>
            <FaArrowRight />
          </PaginationNextTrigger>
        </HStack>
      </PaginationRoot>
    </Box>
  );
}
