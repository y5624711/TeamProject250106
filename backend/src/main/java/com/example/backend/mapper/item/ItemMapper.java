package com.example.backend.mapper.item;

import com.example.backend.dto.item.Item;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper {
    @Insert("""
            INSERT INTO item
            (item_code, partner_id, manager_id, item_name, size, unit, in_price, out_price, tax, minimum_stock, note)
            VALUES (#{itemCode}, #{partnerId}, #{managerId}, #{itemName}, #{size}, #{unit}, #{inPrice}, #{outPrice}, #{tax}, #{minimumStock},  #{note})
            """)
    @Options(keyProperty = "itemId", useGeneratedKeys = true)
    int addItem(Item item);

    @Select("""
            SELECT item_code, item_code_name
            FROM itemCommonCode
            """)
    List<Map<String, String>> getItemCommonCode();

    @Select("""
            SELECT *
            FROM item
            """)
    List<Item> getItemList();
}
