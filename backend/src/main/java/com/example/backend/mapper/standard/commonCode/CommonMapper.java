package com.example.backend.mapper.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommonMapper {

    @Select("""
                <script>
                    SELECT *
                    FROM TB_SYSCOMM
                    WHERE 1=1
                    <if test="active == false">
                        AND common_code_active = TRUE
                    </if>
                    <if test="keyword != null and keyword.trim() != ''">
                        <if test="type == 'all'">
                            AND (
                                common_code LIKE CONCAT('%', #{keyword}, '%')
                                OR common_code_name LIKE CONCAT('%', #{keyword}, '%')
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
                        ORDER BY common_code_key DESC
                        </otherwise>
                    </choose>
                    LIMIT #{offset}, 10
                </script>
            """)
    List<CommonCode> getCommonCodeList(Integer offset, Boolean active, String sort, String order, String type, String keyword);

    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_SYSCOMM
                WHERE 1=1
                <if test="active == false">
                    AND common_code_active = TRUE
                </if>
                <if test="keyword != null and keyword.trim() != ''">
                    <if test="type == 'all'">
                        AND (
                            common_code LIKE CONCAT('%', #{keyword}, '%')
                            OR common_code_name LIKE CONCAT('%', #{keyword}, '%')
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
            FROM TB_SYSCOMM
            WHERE common_code_active = false
                 AND (common_code = #{commonCode} OR common_code_name = #{commonName})
            """)
    int countByCodeOrName(String commonCode, String commonName);

    @Insert("""
            INSERT INTO TB_SYSCOMM
            (common_code_key, common_code, common_code_name, common_code_note,common_code_type)
            VALUES (#{commonCodeKey}, #{commonCode}, #{commonName}, #{commonCodeNote}, #{commonCodeType})
            """)
    @Options(keyProperty = "commonCodeKey", useGeneratedKeys = true)
    int addCommonCode(CommonCode commonCode);

    @Select("""
            SELECT *
            FROM TB_SYSCOMM
            WHERE common_code_key = #{commonCodeKey}
            """)
    List<CommonCode> getCommonCodeView(int commonCodeKey);

    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code_active = 0
            WHERE common_code_key = #{commonCodeKey}
            """)
    int deleteCommonCode(int commonCodeKey);

    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code = #{commonCode.commonCode},
            common_code_name = #{commonCode.commonCodeName},
            common_code_note = #{commonCode.commonCodeNote}
            WHERE common_code_key = #{commonCodeKey}
            """)
    int editCommonCode(int commonCodeKey, CommonCode commonCode);

    @Select("""
            SELECT common_code_key
            FROM TB_SYSCOMM
            WHERE common_code_active = false
            """)
    List<Integer> deletedCommonCode();


}
