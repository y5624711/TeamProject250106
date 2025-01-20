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
                    WHERE 1=1
                    <if test="active == false">
                        AND item_common_code_active = TRUE
                    </if>
                    <if test="keyword != null and keyword.trim() != ''">
                        <if test="type == 'all'">
                            AND (
                                item_common_code LIKE CONCAT('%', #{keyword}, '%')
                                OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                            )
                        </if>
                        <if test="type != 'all'">
                            AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                    </if>
                    <choose>
                        <when test="sort != null and sort != ''">
                            ORDER BY `${sort}` ${order}
                        </when>
                        <otherwise>
                        ORDER BY item_common_code_key DESC
                        </otherwise>
                    </choose>
                    LIMIT #{offset}, 10
                </script>
            """)
    List<ItemCommonCode> getItemCommonCodeList(Integer offset, Boolean active, String sort, String order, String type, String keyword);

    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_ITEMCOMM
                WHERE 1=1
                <if test="active == false">
                    AND item_common_code_active = TRUE
                </if>
                <if test="keyword != null and keyword.trim() != ''">
                    <if test="type == 'all'">
                        AND (
                            item_common_code LIKE CONCAT('%', #{keyword}, '%')
                            OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                        )
                    </if>
                    <if test="type != 'all'">
                        AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </if>
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
