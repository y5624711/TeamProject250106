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
            SELECT *
            FROM TB_STKTK
            WHERE stocktaking_key=#{stocktakingKey}
            """)
    Stocktaking view(Integer stocktakingKey);
}
