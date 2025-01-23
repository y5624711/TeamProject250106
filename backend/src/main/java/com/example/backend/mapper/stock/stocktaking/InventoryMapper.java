package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InventoryMapper {
    @Select("""
            SELECT *
            FROM V_ITEM_CRNT
            """)
    List<Inventory> selectList();
}
