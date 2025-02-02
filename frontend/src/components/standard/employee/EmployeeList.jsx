import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  createListCollection,
  Flex,
  HStack, IconButton,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Checkbox } from "../../ui/checkbox.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../../ui/pagination.jsx";
import { FaArrowDown } from "react-icons/fa6";
import { EmployeeAddDialog } from "./EmployeeAddDialog.jsx";
import { EmployeeViewDialog } from "./EmployeeViewDialog.jsx";
import { Switch } from "../../ui/switch.jsx";
import * as PropTypes from "prop-types";
import { SortColumnHeader } from "./SortColumnHeader.jsx";
import {BsArrowCounterclockwise} from "react-icons/bs";



export function EmployeeList({ onSelect, updateList, viewKey, onChange }) {
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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isviewModalOpen, setIsviewModalOpen] = useState(false);

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
    axios
      .get("api/employee/list", {
        params: {
          page: page,
          isActiveVisible: isActiveVisible,
          keyword: keyword,
          //  배열이면 , 삭제한값
          type: Array.isArray(type) ? type.join("") : type,
          sort: sort,
          order: order,
        },
      })
      .then((res) => {
        setMemberList(res.data.employeeList);
        setCount(res.data.totalCount);
        // 정렬된 첫 번째 값을 불러오기 위해서
      })
      .catch((err) => {
        console.log("직원 정보를 받는중 오류", err);
      });
    // updateQuery();
  }, [updateList, searchParams]);

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
      newParams.set("page", page); // "active" 키에 새로운 값 설정
      return newParams;
    });
  }

  function handleSearchButton() {
    setPage(1); // 페이지를 1로 초기화

    setSearchParams((prev) => {
      const newParams = { ...prev }; // 기존 파라미터 복사 (깊은 복사)
      newParams.type = type; // type 값 업데이트
      newParams.keyword = keyword; // keyword 값 업데이트

      return newParams; // 새로운 객체를 반환
    });
  }

  const frameworks = createListCollection({
    items: [
      { label: "소속구분", value: "소속구분" },
      { label: "기업", value: "기업명" },
      { label: "부서", value: "부서명" },
      { label: "직원", value: "직원명" },
      { label: "사번", value: "사번" },
      // { label: "계약여부", value: "계약여부" },
    ],
  });

  const handleSortControl = (sortName) => {
    const convertedOrderName =
      searchParams.get("order") === "ASC" ? "DESC" : "ASC";

    setSearchParams((prev) => {
      setSort(sortName);
      setOrder(convertedOrderName);
      const newParams = { ...prev }; // 기존 파라미터 복사 (깊은 복사)
      newParams.sort = sortName;
      newParams.order = convertedOrderName;
      return newParams; // 새로운 객체를 반환
    });
  };
  const handleModalControl = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleviewModalControl = () => {
    setIsviewModalOpen(!isviewModalOpen);
  };

  const handleResetClick = () => {
    setSearchParams({}); // 검색 파라미터 초기화
    setPage(1); // 페이지 1로 초기화
    setSort("all"); // 기본 정렬 설정
    setIsActiveVisible(false); // 기본 활성 상태 설정
    setKeyword(""); // 검색어 초기화
    setType("all"); // 기본 타입 설정
    setOrder("desc"); // 기본 정렬 순서 설정
  };

  return (
    <Box  p={5} >
      <HStack
        justifyContent="center" w={"100%"}
        style={{
          alignItems: "flex-start",
        }}
      >
        <Box>
          <SelectRoot
            collection={frameworks}
            value={type}
            width="150px"
            position="relative"
            onValueChange={(e) => setType(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder={"전체"} />
            </SelectTrigger>
            <SelectContent
              style={{
                width: "150px",
                top: "40px",
                position: "absolute",
              }}
            >
              {frameworks.items.map((code) => (
                <SelectItem item={code} key={code.value}>
                  {code.label}
                </SelectItem>
              ))}
            </SelectContent>
          </SelectRoot>
        </Box>
        <Input
          w={"50%"}
          placeholder={"검색어를 입력해 주세요."}
          value={keyword}
          onChange={(e) => {
            setKeyword(e.target.value);
          }}
        />
        <IconButton
          transform="translateX(-130%) "
          style={{ cursor: "pointer" }}
          variant={"ghost"}
          onClick={handleResetClick}
        >
          <BsArrowCounterclockwise size="25px" />
        </IconButton>
        <Button onClick={handleSearchButton} transform="translateX(-75%)"
        >검색</Button>
      </HStack>
      <Checkbox
        my={3}
        checked={isActiveVisible}
        onCheckedChange={(e) => handleVisible()}
      >
        미사용 포함 조회
      </Checkbox>
      <Table.Root interactive>
        <Table.Header>
          <SortColumnHeader
            handleSortControl={handleSortControl}
            searchParams={searchParams}
          />
        </Table.Header>
        <Table.Body>
          {memberList.map((item, index) => (
            <Table.Row
              key={item.employeeKey}
              onDoubleClick={() => {
                handleSelectedItem(item.employeeKey);
                handleviewModalControl();
              }}
              bg={item.employeeActive ? "white" : "gray.100"}
            >
              <Table.Cell textAlign="center">{index + 1}</Table.Cell>
              <Table.Cell textAlign="center"> {item.employeeWorkPlaceCode} </Table.Cell>
              <Table.Cell textAlign="center">
                {item.employeeCommonCode === "CUS"
                  ? item.employeeWorkPlaceName
                  : "(주)중앙컴퍼니"}
              </Table.Cell  >
              <Table.Cell textAlign="center">{item.employeeWorkPlaceTel}</Table.Cell>
              {/*<Table.Cell textAlign="center">*/}
              {/*  /!*협력업체는 부서가 없어서 *!/*/}
              {/*  {item.employeeCommonCode === "CUS"*/}
              {/*    ? ""*/}
              {/*    : item.employeeWorkPlaceName}*/}
              {/*</Table.Cell >*/}
              {/*<Table.Cell textAlign="center">*/}
              {/*  {item.employeeCommonCode === "CUS"*/}
              {/*    ? ""*/}
              {/*    : item.employeeWorkPlaceTel}*/}
              {/*</Table.Cell>*/}
              <Table.Cell textAlign="center"> {item.employeeName} </Table.Cell>
              <Table.Cell textAlign="center"> {item.employeeTel} </Table.Cell>
              <Table.Cell textAlign="center"> {item.employeeNo} </Table.Cell>
            </Table.Row>
          ))}
          {memberList.length === 0 && <Box> 조회 결과 x</Box>}
        </Table.Body>
        <Table.Footer></Table.Footer>
      </Table.Root>
      <Flex  justify="space-between" mt={"20px"}>
        <Box/>

          <Box>
            <PaginationRoot
              onPageChange={handlePageChange}
              count={count}
              pageSize={10}
              page={page}
              defaultPage={page}
              variant={"solid"}
            >
              <PaginationPrevTrigger>
                <FaArrowLeft />
              </PaginationPrevTrigger>
              <PaginationItems />
              <PaginationNextTrigger>
                <FaArrowRight />
              </PaginationNextTrigger>
            </PaginationRoot>
          </Box>

          <Button
            display="flex" justifyContent="flex-end"
            onClick={() => {
              setIsModalOpen(true);
            }}
          >
            직원 등록
          </Button>
      </Flex>
      <EmployeeAddDialog
        isModalOpen={isModalOpen}
        modalChange={handleModalControl}
        viewKey={viewKey}
        onChange={onChange}
        onSelect={onSelect}
      />

      <EmployeeViewDialog
        isModalOpen={isviewModalOpen}
        modalChange={handleviewModalControl}
        viewKey={viewKey}
        onChange={onChange}
        onSelect={onSelect}
      />
    </Box>
  );
}
