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
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.warehouseKey}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.warehouseName}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.customerCode}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.customerEmployeeNo}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.warehouseState}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.warehouseCity}
          </Table.Cell>
          <Table.Cell textAlign="center" verticalAlign="middle">
            {warehouse.warehouseTel}
          </Table.Cell>
          {useColumn ? (
            <Table.Cell textAlign="center" verticalAlign="middle">
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
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.warehouseKey}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.warehouseName}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.customerCode}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.customerEmployeeNo}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.warehouseState}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.warehouseCity}
              </Table.Cell>
              <Table.Cell textAlign="center" verticalAlign="middle">
                {warehouse.warehouseTel}
              </Table.Cell>
              {useColumn ? (
                <Table.Cell textAlign="center" verticalAlign="middle">
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
