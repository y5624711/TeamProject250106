import React, { useState } from "react";
import { Box, Stack, Table } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { WarehouseDetail } from "./WarehouseDetail.jsx";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function WarehouseList({ warehouseList, countWarehouse, useColumn }) {
  const navigate = useNavigate();
  const [isDetailDialogOpen, setIsDetailDialogOpen] = useState(false);
  const [selectedWarehouseKey, setSelectedWarehouseKey] = useState(null);

  return (
    <Box>
      <Stack>
        <Box>
          <Table.Root interactive>
            <Table.Header>
              <Table.Row>
                <Table.ColumnHeader width="100px">#</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">창고명</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">담당 업체</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">업체 직원</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">광역 시도</Table.ColumnHeader>
                <Table.ColumnHeader width="150px">시군</Table.ColumnHeader>
                <Table.ColumnHeader width="200px">전화번호</Table.ColumnHeader>
                {useColumn ? (
                  <Table.ColumnHeader>사용 여부</Table.ColumnHeader>
                ) : null}
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {warehouseList.map((warehouse) => (
                <>
                  {useColumn ? (
                    <Table.Row
                      style={{ height: "50px" }}
                      key={warehouse.warehouseKey}
                      onDoubleClick={() => {
                        setIsDetailDialogOpen(true);
                        setSelectedWarehouseKey(warehouse.warehouseKey);
                      }}
                    >
                      <Table.Cell>{warehouse.warehouseKey}</Table.Cell>
                      <Table.Cell>{warehouse.warehouseName}</Table.Cell>
                      <Table.Cell>{warehouse.customerCode}</Table.Cell>
                      <Table.Cell>{warehouse.customerEmployeeNo}</Table.Cell>
                      <Table.Cell>{warehouse.warehouseState}</Table.Cell>
                      <Table.Cell>{warehouse.warehouseCity}</Table.Cell>
                      <Table.Cell>{warehouse.warehouseTel}</Table.Cell>
                      {useColumn ? (
                        <Table.Cell>
                          {warehouse.warehouseActive ? (
                            <MdCheckBox size="25px" />
                          ) : (
                            <MdCheckBoxOutlineBlank size="25px" />
                          )}
                        </Table.Cell>
                      ) : null}
                    </Table.Row>
                  ) : (
                    <>
                      {warehouse.warehouseActive ? (
                        <Table.Row
                          style={{ height: "50px" }}
                          key={warehouse.warehouseKey}
                          onDoubleClick={() => {
                            setIsDetailDialogOpen(true);
                            setSelectedWarehouseKey(warehouse.warehouseKey);
                          }}
                        >
                          <Table.Cell>{warehouse.warehouseKey}</Table.Cell>
                          <Table.Cell>{warehouse.warehouseName}</Table.Cell>
                          <Table.Cell>{warehouse.customerCode}</Table.Cell>
                          <Table.Cell>
                            {warehouse.customerEmployeeNo}
                          </Table.Cell>
                          <Table.Cell>{warehouse.warehouseState}</Table.Cell>
                          <Table.Cell>{warehouse.warehouseCity}</Table.Cell>
                          <Table.Cell>{warehouse.warehouseTel}</Table.Cell>
                          {useColumn ? (
                            <Table.Cell>
                              {warehouse.warehouseActive ? (
                                <MdCheckBox size="25px" />
                              ) : (
                                <MdCheckBoxOutlineBlank size="25px" />
                              )}
                            </Table.Cell>
                          ) : null}
                        </Table.Row>
                      ) : null}
                    </>
                  )}
                </>
              ))}
            </Table.Body>
          </Table.Root>
        </Box>
        <WarehouseDetail
          warehouseKey={selectedWarehouseKey}
          isOpened={isDetailDialogOpen}
          onClosed={() => setIsDetailDialogOpen(false)}
        />
      </Stack>
    </Box>
  );
}

export default WarehouseList;
