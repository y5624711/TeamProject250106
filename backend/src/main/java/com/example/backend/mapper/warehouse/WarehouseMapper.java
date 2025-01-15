package com.example.backend.mapper.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface WarehouseMapper {

    @Select("""
            SELECT warehouse_key, warehouse_name, warehouse_state, warehouse_city, warehouse_active
            FROM TB_WHMST
            """)
    List<Warehouse> listUp();
}
