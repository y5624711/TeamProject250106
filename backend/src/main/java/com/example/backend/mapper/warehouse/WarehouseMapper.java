package com.example.backend.mapper.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WarehouseMapper {

    @Select("""
            SELECT *
            FROM TB_WHMST
            """)
    List<Warehouse> list();

    @Select("""
            SELECT *
            FROM TB_WHMST
            WHERE warehouse_key=#{warehouseKey}
            """)
    Warehouse view(Integer warehouseKey);

    @Insert("""
            INSERT INTO TB_WHMST (warehouse_code, warehouse_name, customer_code, warehouse_address, warehouse_address_detail, warehouse_post,warehouse_state,warehouse_city,customer_employee_no, warehouse_tel, warehouse_active, warehouse_note)
            VALUES(#{warehouseCode}, #{warehouseName}, #{customerCode}, #{warehouseAddress}, #{warehouseAddressDetail}, #{warehousePost}, #{warehouseState}, #{warehouseCity}, #{customerEmployeeNo}, #{warehouseTel}, #{warehouseActive}, #{warehouseNote})
            """)
    int add(Warehouse warehouse);
}
