import React, { useEffect, useState } from "react";
import axios from "axios";
import { Box, Heading, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export function EmployeeList() {
  const navigate = useNavigate();
  const [memberList, setMemberList] = useState([]);
  useEffect(() => {
    // 전체 어카운트 리스트 불러오기
    axios.get("/api/employee/list").then((res) => {
      setMemberList(res.data);
    });
  }, []);

  const sidebarItems = [
    { label: "회원 조회", path: "/account/list" },
    { label: "회원 등록", path: "/account/add" },
  ];

  return (
    <Box>
      <Heading> 낄낄</Heading>
      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeader>dla</Table.ColumnHeader>
            <Table.ColumnHeader>분류 코드</Table.ColumnHeader>
            <Table.ColumnHeader>분류 코드 아이디</Table.ColumnHeader>
            <Table.ColumnHeader>비번</Table.ColumnHeader>
            <Table.ColumnHeader>사용 여부</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {memberList.map((item) => (
            <Table.Row>
              <Table.Cell> {item.employeeKey} </Table.Cell>
              <Table.Cell> {item.employeeCommonCode} </Table.Cell>
              <Table.Cell> {item.empl} </Table.Cell>
              <Table.Cell> {item.password} </Table.Cell>
              <Table.Cell>
                {item.active === true ? "사용중" : "사용안함"}
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
