package com.example.backend.mapper.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InoutHistoryMapper {

    @Select("""
            SELECT *
            FROM TB_INOUT_HIS
            """)
    List<InoutHistory> list();

    @Insert("""
            INSERT INTO TB_INOUT_HIS()
            VALUES()
            """)
    int add(InoutHistory InoutHistory);

    @Select("""
            SELECT *
            FROM TB_INOUT_HIS
            WHERE inout_history_key=${inoutHistoryKey}
            """)
    InoutHistory view(Integer inoutHistoryKey);
}
