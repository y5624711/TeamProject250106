package com.example.backend.mapper.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
import org.apache.ibatis.annotations.*;

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
            VALUES (#{commonCode},#{commonCodeName},#{commonCodeNote})
            """)
    int insertCommonCode(CommonCode commonCode);

    @Select("""
            <script>
                SELECT *
                FROM TB_ITEMCOMM
                <trim prefix="WHERE" prefixOverrides="AND">
                    <if test="active == false">
                        item_common_code_active = TRUE
                    </if>
                    <if test="active == true">
                        1=1
                    </if>
                    <if test="keyword != null and keyword != ''">
                        <choose>
                            <when test="type == 'all'">
                                AND (
                                    item_common_code LIKE CONCAT('%', #{keyword}, '%')
                                    OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </when>
                            <when test="type == 'itemCommonCode'">
                                AND item_common_code LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'itemCommonName'">
                                AND item_common_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                        </choose>
                    </if>
                </trim>
            
                <trim prefix="ORDER BY">
                    <choose>
                        <when test="sort != null and sort != ''">
                            <choose>
                                <when test="sort == 'itemCommonCodeKey'">item_common_code_key</when>
                                <when test="sort == 'itemCommonCode'">item_common_code</when>
                                <when test="sort == 'itemCommonName'">item_common_name</when>
                                <otherwise>item_common_code_key</otherwise>
                            </choose>
                            ${order}
                        </when>
                        <otherwise>
                            item_common_code_key ASC
                        </otherwise>
                    </choose>
                </trim>
                LIMIT #{offset}, 10
            </script>
            """)
    List<ItemCommonCode> getItemCommonCodeList(Integer offset, Boolean active, String sort, String order, String type, String keyword);

    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_ITEMCOMM
                <where>
                    <if test="active == false">
                        item_common_code_active = TRUE
                    </if>
                    <if test="active == true">
                        1=1
                    </if>
                    <if test="keyword != null and keyword != ''">
                        <choose>
                            <when test="type == 'all'">
                                AND (
                                    item_common_code LIKE CONCAT('%', #{keyword}, '%')
                                    OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </when>
                            <when test="type == 'itemCommonCode'">
                                AND item_common_code LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'itemCommonName'">
                                AND item_common_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                        </choose>
                    </if>
                </where>
            </script>
            """)
    Integer countAll(Boolean active, String type, String keyword);

    @Select("""
            SELECT COUNT(*)
            FROM TB_ITEMCOMM
            WHERE item_common_code = #{itemCommonCode}
               OR item_common_name = #{itemCommonName}
            """)
    int countByCodeOrName(String itemCommonCode, String itemCommonName);

//    @Select("""
//            SELECT item_common_name
//            FROM TB_ITEMCOMM
//            """)
//    List<String> getItemCommonName();

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

    @Update("""
            UPDATE TB_ITEMCOMM
            SET item_common_code_active = 0
            WHERE item_common_code_key = #{itemCommonCodeKey}
            """)
    int deleteItemCommonCode(int itemCommonCodeKey);

    @Update("""
            UPDATE TB_ITEMCOMM
            SET item_common_code = #{itemCommonCode.itemCommonCode},
            item_common_name = #{itemCommonCode.itemCommonName},
            item_common_code_note = #{itemCommonCode.itemCommonCodeNote}
            WHERE item_common_code_key = #{itemCommonCodeKey}
            """)
    int editItemCommonCode(int itemCommonCodeKey, ItemCommonCode itemCommonCode);
}
