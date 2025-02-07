package com.example.backend.mapper.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface CommonMapper {

    @Select("""
            <script>
                SELECT sc.*, COUNT(c.customer_key) AS usedCommonCodeByCustomer
                FROM TB_SYSCOMM sc
                LEFT OUTER JOIN TB_CUSTMST c ON sc.common_code = c.item_code AND customer_active = 1
                WHERE 1=1
                <if test="active == false">
                    AND common_code_active = TRUE
                </if>
            <if test="filter != null">
                <choose>
                    <when test="filter == 'standard'">
                        AND common_code_type = 'STANDARD'
                    </when>
                    <when test="filter == 'state'">
                        AND common_code_type = 'STATE'
                    </when>
                    <when test="filter == 'item'">
                        AND common_code_type = 'ITEM'
                    </when>
                    <otherwise>
                        <!-- 'all' 또는 기타 값인 경우 조건 추가하지 않음 -->
                    </otherwise>
                </choose>
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
                GROUP BY sc.common_code_key
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
    List<CommonCode> getCommonCodeList(Integer offset, Boolean active, String sort, String order, String type,
                                       String keyword, String filter);

    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_SYSCOMM
                WHERE 1=1
                <if test="active == false">
                    AND common_code_active = TRUE
                </if>
                <if test="filter != null">
                    <choose>
                        <when test="filter == 'standard'">
                            AND common_code_type = 'STANDARD'
                        </when>
                        <when test="filter == 'state'">
                            AND common_code_type = 'STATE'
                        </when>
                        <when test="filter == 'item'">
                            AND common_code_type = 'ITEM'
                        </when>
                        <otherwise>
                            <!-- 'all' 또는 기타 값인 경우 조건 추가하지 않음 -->
                        </otherwise>
                    </choose>
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
    Integer countAll(Boolean active, String type, String keyword, String filter);

    @Select("""
            SELECT COUNT(*)
            FROM TB_SYSCOMM
            WHERE common_code_active = true
                 AND (common_code = #{commonCode} OR common_code_name = #{commCodeName})
            """)
    int countByCodeOrName(String commonCode, String commCodeName);

    @Insert("""
            INSERT INTO TB_SYSCOMM
            (common_code_key, common_code, common_code_name, common_code_note,common_code_type)
            VALUES (#{commonCodeKey}, #{commonCode}, #{commonCodeName}, #{commonCodeNote}, #{commonCodeType})
            """)
    @Options(keyProperty = "commonCodeKey", useGeneratedKeys = true)
    int addCommonCode(CommonCode commonCode);

    @Select("""
            SELECT sc.*, COUNT(c.customer_key) AS usedCommonCodeByCustomer
            FROM TB_SYSCOMM sc
            LEFT OUTER JOIN TB_CUSTMST c ON sc.common_code = c.item_code
            WHERE common_code_key = #{commonCodeKey}
            """)
    CommonCode getCommonCodeView(int commonCodeKey);
    
    @Update("""
            UPDATE TB_SYSCOMM
            SET common_code = #{commonCode.commonCode},
            common_code_name = #{commonCode.commonCodeName},
            common_code_active = #{commonCode.commonCodeActive},
            common_code_note = #{commonCode.commonCodeNote},
            common_code_type = #{commonCode.commonCodeType}
            WHERE common_code_key = #{commonCodeKey}
            """)
    int editCommonCode(int commonCodeKey, CommonCode commonCode);

    @Select("""
            SELECT common_code
            from TB_SYSCOMM
            where common_code_name=#{commonCodeName}
            """)
    String viewCommonCodeByCodeName(String itemCommonName);
}
