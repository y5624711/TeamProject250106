package com.example.backend.mapper.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
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
}
