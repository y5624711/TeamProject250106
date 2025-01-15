package com.example.backend.mapper.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface CommonMapper {
    @Select("""
            SELECT *
            FROM TB_SYSCOMM
            ORDER BY common_code_key
            """)
    List<CommonCode> selectAll();

    @Insert("""
            INSERT INTO TB_SYSCOMM
            (common_code, common_code_name, common_code_note)
            VALUES (#{common_code},#{common_code_name},#{common_code_note})
            """)
    int insertCommonCode(CommonCode commonCode);

    @Select("""
            SELECT *
            FROM TB_ITEMCOMM
            ORDER BY item_common_code_key
            """)
    List<ItemCommonCode> getItemCommonCodeList();
}
