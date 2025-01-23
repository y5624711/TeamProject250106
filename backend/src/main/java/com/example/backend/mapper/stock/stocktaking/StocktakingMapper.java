package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StocktakingMapper {

    @Select("""
            SELECT *
            FROM TB_STKTK
            """)
    List<Stocktaking> list();

    @Select("""
            SELECT s.stocktaking_key,
                   s.item_code,
                   s.warehouse_code,
                   s.location_key,
                   s.customer_employee_no,
                   s.count_current,
                   s.count_configuration,
                   s.stocking_date,
                   w.warehouse_name,
                   w.customer_code,
                   itcm.item_common_name itemName
            FROM TB_STKTK s 
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
            WHERE stocktaking_key=#{stocktakingKey}
            """)
    Stocktaking view(Integer stocktakingKey);
}
