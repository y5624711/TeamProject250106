import { Box, Spinner, Table } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import axios from "axios";

export function BusinessEmployeeList() {
  const [employee, setEmployee] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    axios
      .get("/api/business/list")
      .then((res) => res.data)
      .then((data) => {
        setEmployee(data["사원"]);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <Box>
      <Table.Root>
        <Table.Header>
          <Table.Row whiteSpace={"nowrap"}>
            <Table.ColumnHeader>ID</Table.ColumnHeader>
            <Table.ColumnHeader>사원번호</Table.ColumnHeader>
            <Table.ColumnHeader>이름</Table.ColumnHeader>
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {employee.map((list, index) => (
            <Table.Row key={list.employeeKey || index}>
              <Table.Cell>{list.employeeKey}</Table.Cell>
              <Table.Cell>{list.employeeNo}</Table.Cell>
              <Table.Cell>{list.employeeName}</Table.Cell>
              <Table.Cell></Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
