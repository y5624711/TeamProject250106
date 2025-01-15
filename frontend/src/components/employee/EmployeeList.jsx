import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Checkbox, Heading, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function EmployeeList({ onSelect, updateList }) {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    // 전체 임플로이 리스트 불러오기
    axios
      .get("/api/employee/list")
      .then((res) => {
        setMemberList(res.data);
      })
      .catch((err) => {
        console.log(err);
        console.log("직원 정보를 받는중 오류");
      });
  }, [updateList]);

  // 리스트 클릭시 , 해당 키 값의 상세 정보를 보여주기 위해서
  const handleSelectedItem = (no) => {
    onSelect(no);
  };

  const sidebarItems = [
    { label: "회원 조회", path: "/account/list" },
    { label: "회원 등록", path: "/account/add" },
  ];

  // TODO :  나중에 테이블 다 생기면, 조인 해서 기업명, 부서명 등 가져와야함
  return (
    <Box>
      <Heading> 리스트</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>#</Table.ColumnHeader>
            <Table.ColumnHeader>소속 구분</Table.ColumnHeader>
            <Table.ColumnHeader>기업명</Table.ColumnHeader>
            <Table.ColumnHeader>부서명</Table.ColumnHeader>
            <Table.ColumnHeader>직원명</Table.ColumnHeader>
            <Table.ColumnHeader>사번</Table.ColumnHeader>
            <Table.ColumnHeader>계약여부</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.map((item) => (
            <Table.Row
              key={item.employeeKey}
              onClick={() => handleSelectedItem(item.employeeKey)}
            >
              <Table.Cell> {item.employeeKey} </Table.Cell>
              <Table.Cell> {item.employeeWorkPlaceCode} </Table.Cell>
              <Table.Cell> {item.empl} </Table.Cell>
              <Table.Cell> {item.employeePassword} </Table.Cell>
              <Table.Cell> {item.employeeName} </Table.Cell>
              <Table.Cell> {item.employeeNo} </Table.Cell>

              <Table.Cell>
                {item.employeeActive === true ? "사용중" : "사용안함"}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell></Table.Cell>
          </Table.Row>
        </Table.Footer>
      </Table.Root>
    </Box>
  );
}
