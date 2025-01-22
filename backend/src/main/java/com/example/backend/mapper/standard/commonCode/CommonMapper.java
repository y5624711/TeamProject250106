package com.example.backend.mapper.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.dto.standard.commonCode.ItemCommonCode;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommonMapper {
    @Select("""
            <script>
            SELECT *
            FROM TB_SYSCOMM
            WHERE
                <if test="active == false">
                    common_code_active = 1
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND(<trim prefixOverrides="OR">
                    <if test="type == 'all' or type == 'number'"  >
                        common_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="type == 'all' or type == 'name'"  >
                        OR common_code_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>)
            ORDER BY ${sort} ${order}
            LIMIT #{offset},10
            </script>
            """)
    List<CommonCode> getSysCommonCodeList(int offset,
                                          String type,
                                          String keyword,
                                          String sort,
                                          String order,
                                          Boolean active);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_SYSCOMM
            WHERE
                <if test="active == false">
                    common_code_active = 1
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND(<trim prefixOverrides="OR">
                   <if test="type == 'all' or type == 'number'"  >
                        common_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="type == 'all' or type == 'name'"  >
                        OR common_code_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>)
            </script>
            """)
    Integer countAllSysCommonCode(Boolean active, String type, String keyword);


    @Insert("""
            INSERT INTO TB_SYSCOMM
            (common_code, common_code_name, common_code_note)
            VALUES (#{commonCode},#{commonCodeName},#{commonCodeNote})
            """)
    int insertCommonCode(CommonCode commonCode);

    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code_name = #{commonCodeName},
                common_code_note = #{commonCodeNote}
            WHERE common_code_key = #{commonCodeKey}
            """)
    int updateSysCode(CommonCode commonCode);

    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code_active = false
            WHERE common_code_key=#{commonCodeKey}
            """)
    int deleteSysCode(Integer commonCodeKey);

    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code_active=true
            WHERE common_code_key=#{commonCodeKey}
            """)
    int reUseSysCode(Integer commonCodeKey);

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
            WHERE item_common_code_active = false
                 AND (item_common_code = #{itemCommonCode} OR item_common_name = #{itemCommonName})
            """)
    int countByCodeOrName(String itemCommonCode, String itemCommonName);

    @Insert("""
            INSERT INTO TB_ITEMCOMM
            (item_common_code_key, item_common_code, item_common_name, item_common_code_note,common_code_type)
            VALUES (#{itemCommonCodeKey}, #{itemCommonCode}, #{itemCommonName}, #{itemCommonCodeNote}, #{commonCodeType})
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

    @Select("""
            SELECT item_common_code_key
            FROM TB_ITEMCOMM
            WHERE item_common_code_active = false
            """)
    List<Integer> deletedItemCommonCode();


    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_SYSCOMM
            <where>
                common_code_active = true
                <if test="commonCode != null and commonCode != ''">
                    AND common_code = #{commonCode}
                </if>
                <if test="commonCodeName != null and commonCodeName != ''">
                 AND common_code_name = #{commonCodeName}
                </if>
            </where>
            </script>
            """)
    int checkSameName(String commonCode, String commonCodeName);
}
