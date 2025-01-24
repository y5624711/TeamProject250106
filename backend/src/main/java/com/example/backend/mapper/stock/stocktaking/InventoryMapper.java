package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InventoryMapper {
    @Select("""
            SELECT a.item_code,
                   a.warehouse_code,
                   b.common_code_name,
                   d.warehouse_name,
                   d.warehouse_city,
                   d.warehouse_address,
                   d.warehouse_address_detail,
                   c.customer_name,
                   a.count
            FROM V_ITEM_CRNT a
                     JOIN TB_SYSCOMM b ON a.item_code = b.common_code
                     JOIN TB_CUSTMST c ON a.item_code = c.item_code
                     JOIN TB_WHMST d ON c.customer_code = d.customer_code;
            
            """)
    List<Inventory> selectList();

    @Select("""
            SELECT COUNT(*)
            FROM V_ITEM_CRNT
            """)
    int countAll();
}
