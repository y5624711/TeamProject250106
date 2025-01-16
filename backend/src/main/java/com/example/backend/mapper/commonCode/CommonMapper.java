package com.example.backend.mapper.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
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

    @Select("""
            SELECT item_common_code
            FROM TB_ITEMCOMM
            """)
    List<String> getItemCommonCode();

    @Select("""
            SELECT item_common_name
            FROM TB_ITEMCOMM
            """)
    List<String> getItemCommonName();

    @Insert("""
            INSERT INTO TB_ITEMCOMM
            (item_common_code_key, item_common_code, item_common_name, item_common_code_note)
            VALUES (#{itemCommonCodeKey}, #{itemCommonCode}, #{itemCommonName}, #{itemCommonCodeNote})
            """)
    @Options(keyProperty = "itemCommonCodeKey", useGeneratedKeys = true)
    int addItemCommonCode(ItemCommonCode itemCommonCode);

    @Select("""
            SELECT *
            FROM TB_ITEMCOMM
            WHERE item_common_code_key = #{itemCommonCodeKey}
            """)
    List<ItemCommonCode> getItemCommonCodeView(int itemCommonCodeKey);
}
