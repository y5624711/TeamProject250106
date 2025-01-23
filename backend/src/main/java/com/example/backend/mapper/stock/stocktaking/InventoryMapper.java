package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InventoryMapper {
    @Select("""
            SELECT a.item_code,
                   b.common_code_name,
                   c.warehouse_name,
                   c.warehouse_city,
                   c.warehouse_address,
                   d.customer_name,
                   a.count
            FROM V_ITEM_CRNT a
                     JOIN TB_SYSCOMM b ON a.item_code = b.common_code
                     JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
                     JOIN TB_CUSTMST d ON a.item_code = d.item_code;
            """)
    List<Inventory> selectList();
}
