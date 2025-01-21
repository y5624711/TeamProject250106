package com.example.backend.mapper.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReturnMapper {


    @Select("""
            SELECT *
            FROM TB_RTN_REQ rr
            LEFT JOIN TB_RTN_APPR ra
            ON ra.return_request_key = rr.return_request_key
            """)
    List<Return> getReturnList();
}
