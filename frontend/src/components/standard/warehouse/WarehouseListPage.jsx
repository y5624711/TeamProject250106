import React from "react";
import { Table } from "@chakra-ui/react";
import { MdCheckBox, MdCheckBoxOutlineBlank } from "react-icons/md";

function WarehouseListPage({
  useColumn,
  warehouse,
  setIsDetailDialogOpen,
  setSelectedWarehouseKey,
}) {
  return (
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
          ) : null}
        </>
      )}
    </>
  );
}

export default WarehouseListPage;
