package com.example.backend.mapper.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import org.apache.ibatis.annotations.Insert;
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

    @Insert("""
            INSERT INTO commonCode
            (common_code,name,note)
            VALUES (#{common_code},#{name},#{note})
            """)
    int insertCommonCode(CommonCode commonCode);
}
