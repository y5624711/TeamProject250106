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
    // if (Array.isArray(type)) {
    //   var realType = type.join("");
    // }

    // 전체 직원 리스트 불러오기
    axios
      .get("/api/employee/list", {
        params: {
          page: page,
          isActiveVisible: isActiveVisible,
          keyword: keyword,
          //  배열이면 , 삭제한값 <
          type: Array.isArray(type) ? type.join("") : type,
          sort: sort,
          order: order,
        },
      })
      .then((res) => {
        setMemberList(res.data.employeeList);
        setCount(res.data.totalCount);
        // 정렬된 첫 번째 값을 불러오기 위해서
        handleSelectedItem(res.data.employeeList[0].employeeKey);
      })
      .catch((err) => {
        console.log("직원 정보를 받는중 오류", err);
      });
    updateQuery();
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
      newParams.set("active", !isActiveVisible); // "active" 키에 새로운 값 설정
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
      { label: "기업명", value: "기업명" },
      { label: "부서명", value: "부서명" },
      { label: "직원명", value: "직원명" },
      { label: "사번", value: "사번" },
      { label: "계약여부", value: "계약여부" },
    ],
  });

  const handleSortControl = (sortName, orderName) => {
    setSearchParams((prev) => {
      setSort(sortName);
      setOrder(orderName);
      const newParams = { ...prev }; // 기존 파라미터 복사 (깊은 복사)
      newParams.order = orderName;
      return newParams; // 새로운 객체를 반환
    });
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
            <Table.ColumnHeader>
              <HStack>
                #
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("기본키", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("기본키", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                소속 구분
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("소속구분", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("소속구분", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                기업명{" "}
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("기업명", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("기업명", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                부서명{" "}
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("부서명", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("부서명", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                직원명
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("직원명", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("직원명", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            <Table.ColumnHeader>
              <HStack>
                사번{" "}
                <Stack>
                  <FaArrowUp
                    onClick={() => {
                      handleSortControl("사번", "asc");
                    }}
                  />
                  <FaArrowDown
                    onClick={() => {
                      handleSortControl("사번", "desc");
                    }}
                  />
                </Stack>
              </HStack>
            </Table.ColumnHeader>
            {isActiveVisible && (
              <Table.ColumnHeader>
                <HStack>
                  계약여부{" "}
                  <Stack>
                    <FaArrowUp
                      onClick={() => {
                        handleSortControl("계약여부", "asc");
                      }}
                    />
                    <FaArrowDown
                      onClick={() => {
                        handleSortControl("계약여부", "desc");
                      }}
                    />
                  </Stack>
                </HStack>
              </Table.ColumnHeader>
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
                <Table.Cell>
                  {/*  기업 명  {item.franchiseName??} */}
                </Table.Cell>
                <Table.Cell>
                  {/*  부서 명  {item.employeePassword} */}
                </Table.Cell>
                <Table.Cell> {item.employeeName} </Table.Cell>
                <Table.Cell> {item.employeeNo} </Table.Cell>

                {isActiveVisible && (
                  <Table.Cell>
                    {item.employeeActive === true ? "사용중" : "사용안함"}
                  </Table.Cell>
                )}
              </Table.Row>
            ))}
          {memberList.length === 0 && <Box> 조회 결과 x</Box>}
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
