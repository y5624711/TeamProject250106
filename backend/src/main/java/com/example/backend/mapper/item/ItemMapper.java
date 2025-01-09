package com.example.backend.mapper.item;

import com.example.backend.dto.item.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ItemMapper {
    @Insert("""
            INSERT INTO item
            (item_code, item_type, common_code, partner_id, manager_id, name, size, unit, in_price, out_price, tax, minimum_stock, active, note)
            VALUES (#{itemCode}, #{itemType}, #{commonCode}, #{partnerId}, #{managerId}, #{name}, #{size}, #{unit}, #{inPrice}, #{outPrice}, #{tax}, #{minimumStock}, #{active}, #{note})
            """)
    @Options(keyProperty = "itemId", useGeneratedKeys = true)
    int addItem(Item item);
}
