import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  createListCollection,
  Heading,
  HStack,
  Input,
  SelectContent,
  SelectItem,
  SelectRoot,
  SelectTrigger,
  SelectValueText,
  Stack,
  Table,
} from "@chakra-ui/react";
import { Checkbox } from "../ui/checkbox.jsx";
import { useNavigate, useSearchParams } from "react-router-dom";
import { FaArrowLeft, FaArrowRight, FaArrowUp } from "react-icons/fa";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPrevTrigger,
  PaginationRoot,
} from "../ui/pagination.jsx";
import { FaArrowDown } from "react-icons/fa6";
import { EmployeeAddDialog } from "./EmployeeAddDialog.jsx";
import { EmployeeViewDialog } from "./EmployeeViewDialog.jsx";

EmployeeViewDialog.propTypes = {};

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
      .get("/api/employee/list", {
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
  const handleModalControl = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleviewModalControl = () => {
    setIsviewModalOpen(!isviewModalOpen);
  };
  return (
    <Box h={"100vh"}>
      <Heading>
        인사관리
        <Button
          onClick={() => {
            handleVisible();
          }}
        >
          자세히보기
        </Button>
        <Button
          onClick={() => {
            setIsModalOpen(true);
          }}
        >
          추가버튼
        </Button>
      </Heading>
      <HStack
        style={{
          alignItems: "flex-start",
        }}
      >
        <Box>
          <SelectRoot
            collection={frameworks}
            value={type}
            onValueChange={(e) => setType(e.value)}
          >
            <SelectTrigger>
              <SelectValueText placeholder={"선택해 주세요"} />
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
                기업 전화번호
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
                부서 번호
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
                직원전화번호
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
          {memberList.map((item, index) => (
            <Table.Row
              key={item.employeeKey}
              onClick={() => {
                handleSelectedItem(item.employeeKey);
                handleviewModalControl();
              }}
            >
              <Table.Cell>{index + 1}</Table.Cell>
              <Table.Cell> {item.employeeWorkPlaceCode} </Table.Cell>
              <Table.Cell>
                {item.employeeCommonCode === "CUS"
                  ? item.employeeWorkPlaceName
                  : "(주)중앙컴퍼니"}
              </Table.Cell>
              <Table.Cell>{item.employeeWorkPlaceTel}</Table.Cell>
              <Table.Cell>
                {/*협력업체는 부서가 없어서 */}
                {item.employeeCommonCode === "CUS"
                  ? ""
                  : item.employeeWorkPlaceName}
              </Table.Cell>
              <Table.Cell>
                {item.employeeCommonCode === "CUS"
                  ? ""
                  : item.employeeWorkPlaceTel}
              </Table.Cell>
              <Table.Cell> {item.employeeName} </Table.Cell>
              <Table.Cell> {item.employeeTel} </Table.Cell>
              <Table.Cell> {item.employeeNo} </Table.Cell>
              {/*사용여부 버튼 누른지 아닌지 확인*/}
              {isActiveVisible && (
                <Table.Cell textAlign="center">
                  <Checkbox checked={item.employeeActive} />
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
        defaultPage={page}
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
