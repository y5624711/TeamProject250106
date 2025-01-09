package com.example.backend.mapper;

import com.example.backend.dto.CommonCode;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommonMapper {
    @Select("""
            SELECT *
            FROM commonCode
            ORDER BY common_code
            """)
    List<CommonCode> selectAll();
}
