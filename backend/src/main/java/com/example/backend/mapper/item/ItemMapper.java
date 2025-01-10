package com.example.backend.mapper.item;

import com.example.backend.dto.item.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ItemMapper {
    @Insert("""
            INSERT INTO item
            (item_code, item_type, item_name, common_code, partner_id, manager_id, size, unit, in_price, out_price, tax, minimum_stock, note)
            VALUES (#{itemCode}, #{itemType},#{itemName}, #{commonCode}, #{partnerId}, #{managerId}, #{size}, #{unit}, #{inPrice}, #{outPrice}, #{tax}, #{minimumStock},  #{note})
            """)
    @Options(keyProperty = "itemId", useGeneratedKeys = true)
    int addItem(Item item);

    @Select("""
            SELECT *
            FROM item
            """)
    List<Item> getListItem();
}
