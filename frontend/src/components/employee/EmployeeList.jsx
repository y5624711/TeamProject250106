import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Checkbox,
  Heading,
  HStack,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
  Table,
} from "@chakra-ui/react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

export function EmployeeList({ onSelect, updateList }) {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  const [isActiveVisible, setIsActiveVisible] = useState(false);
  const [page, setPage] = useState(1);
  const [count, setCount] = useState();

  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = () => {
    setSearchParams({ page: page, sort: "desc" });
  };

  console.log("page 변경 확인", page);
  useEffect(() => {
    // 전체 임플로이 리스트 불러오기
    axios
      .get("/api/employee/list", {
        params: {
          page: page,
          isActiveVisible: isActiveVisible,
        },
      })
      .then((res) => {
        setMemberList(res.data);
        // setPage();
        // setCount();
      })
      .catch((err) => {
        console.log(err);
        console.log("직원 정보를 받는중 오류");
      });
    updateQuery();
  }, [updateList, page]);

  // 리스트 클릭시 , 해당 키 값의 상세 정보를 보여주기 위해서
  const handleSelectedItem = (no) => {
    onSelect(no);
  };
  const handleVisible = () => {
    setIsActiveVisible(!isActiveVisible);
  };
  //  페이지 버튼 클릭시
  const handlePageClick = (item) => {
    setPage(item);
    updateQuery();
  };

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
        <Box>검색 항목</Box>
        <Box>검색 내용</Box>
        <Button>검색</Button>
      </HStack>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>소속 구분</Table.ColumnHeader>
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
            .filter((item) =>
              isActiveVisible ? true : item.employeeActive === true,
            )
            .map((item, index) => (
              <Table.Row
                key={item.employeeKey}
                onClick={() => handleSelectedItem(item.employeeKey)}
              >
                <Table.Cell>{index + 1}</Table.Cell>
                {/*<Table.Cell> {item.employeeKey} </Table.Cell>*/}
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
        // onPageChange={}
        count={100}
        pageSize={10}
        defaultPage={1}
        variant={"solid"}
      >
        <HStack>
          <PaginationPrevTrigger>
            <FaArrowLeft />
          </PaginationPrevTrigger>

          <PaginationItem
            onClick={(e) => {
              handlePageClick(2);
            }}
          >
            2
          </PaginationItem>
          <PaginationItem>2</PaginationItem>
          <PaginationItem>3</PaginationItem>

          <PaginationNextTrigger>
            <FaArrowRight />
          </PaginationNextTrigger>
        </HStack>
      </PaginationRoot>
    </Box>
  );
}
