package com.example.backend.mapper.item;

import com.example.backend.dto.item.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface ItemMapper {
    @Insert("""
            INSERT INTO item
            (item_code, item_type, item_name, common_code, partner_id, manager_id, size, unit, in_price, out_price, tax, minimum_stock, active, note)
            VALUES (#{itemCode}, #{itemType},#{itemName}, #{commonCode}, #{partnerId}, #{managerId}, #{size}, #{unit}, #{inPrice}, #{outPrice}, #{tax}, #{minimumStock}, #{active}, #{note})
            """)
    @Options(keyProperty = "itemId", useGeneratedKeys = true)
    int addItem(Item item);
}
