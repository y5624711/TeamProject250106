package com.example.backend.mapper.standard.franchise;

import com.example.backend.dto.standard.franchise.Franchise;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FranchiseMapper {

    // 중복 체크
    @Select("""
             SELECT COUNT(*)
             FROM TB_FRNCHSMST
             WHERE franchise_code = #{franchiseCode}
             OR franchise_name = #{franchiseName}
             OR franchise_no = #{franchiseNo}
             OR franchise_tel = #{franchiseTel}
            """)
    int duplicateFranchise(Franchise franchise);

    // 가맹점 코드 생성하기
    @Select("""
            <script>
            SELECT COALESCE(MAX(CAST(SUBSTRING(franchise_code, 4) AS UNSIGNED)), 0) AS maxNumber
            FROM TB_FRNCHSMST
            WHERE franchise_code LIKE 'FRN%'
            AND franchise_code REGEXP '^[A-Za-z]+[0-9]+$'
            </script>
            """)
    Long viewMaxFranchiseCode(String franchiseCode);

    // 가맹점 등록하기
    @Insert("""
            INSERT INTO TB_FRNCHSMST
            (business_employee_no, business_employee_name, franchise_code, franchise_name, franchise_rep, franchise_no, franchise_tel, franchise_address, franchise_address_detail, franchise_post, franchise_state, franchise_city, franchise_note)
            VALUES
            (#{businessEmployeeNo}, #{businessEmployeeName}, #{franchiseCode}, #{franchiseName}, #{franchiseRep}, #{franchiseNo}, #{franchiseTel}, #{franchiseAddress}, #{franchiseAddressDetail}, #{franchisePost}, #{franchiseState}, #{franchiseCity}, #{franchiseNote})
            """)
    @Options(keyProperty = "franchiseKey", useGeneratedKeys = true)
    int addFranchise(Franchise franchise);

    // 가맹점 리스트 불러오기
    @Select("""
            <script>
                SELECT franchise_key, franchise_name, franchise_rep, franchise_no, franchise_tel, franchise_state, franchise_city, franchise_active, business_employee_no, business_employee_name
                FROM TB_FRNCHSMST
                WHERE <if test="active == false">franchise_active = TRUE</if> <!-- 체크박스 해지한 경우 TRUE인것만 보여주기 -->
                      <if test="active == true">1=1</if> <!-- 체크박스 체크한 경우 전체 보여주기 -->
                      <if test="keyword != null and keyword.trim() != ''">
                    AND (
                        <trim prefixOverrides="OR">
                            <if test="type=='all' or type=='franchiseName'">
                                  franchise_name LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseRep'">
                               OR franchise_rep LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                             <if test="type=='all' or type=='franchiseNo'">
                               OR franchise_no LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseTel'">
                               OR franchise_tel LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseState'">
                               OR franchise_state LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseCity'">
                               OR franchise_city LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='businessEmployeeNo'">
                               OR business_employee_no LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='businessEmployeeName'">
                               OR business_employee_name LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                        </trim>
                    )
                </if>
            ORDER BY\s
                    <choose>
                        <when test="sort == 'franchise_name'">franchise_name</when>
                        <when test="sort == 'franchise_rep'">franchise_rep</when>
                        <when test="sort == 'franchise_no'">franchise_no</when>
                        <when test="sort == 'franchise_tel'">franchise_tel</when>
                        <when test="sort == 'franchise_state'">franchise_state</when>
                        <when test="sort == 'franchise_city'">franchise_city</when>
                        <when test="sort == 'business_employee_no'">business_employee_no</when>
                        <when test="sort == 'business_employee_name'">business_employee_name</when>
                        <otherwise>franchise_key</otherwise> <!-- 기본값 -->
                    </choose>\s
                    ${order}
                LIMIT #{offset}, 10
            </script>
            """)
    List<Franchise> getFranchiseList(Boolean active, Integer offset, String type, String keyword, String sort, String order);

    // 총 데이터 개수 (페이지네이션을 위해 사용)
    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_FRNCHSMST
                WHERE <if test="active == false">franchise_active = TRUE</if>
                      <if test="active == true">1=1</if>
                <if test="keyword != null and keyword.trim() != ''">
                    AND (
                        <trim prefixOverrides="OR">
                            <if test="type=='all' or type=='franchiseName'">
                                  franchise_name LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseRep'">
                               OR franchise_rep LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                             <if test="type=='all' or type=='franchiseNo'">
                               OR franchise_no LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseTel'">
                               OR franchise_tel LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseState'">
                               OR franchise_state LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='franchiseCity'">
                               OR franchise_city LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='businessEmployeeNo'">
                               OR business_employee_no LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                            <if test="type=='all' or type=='businessEmployeeName'">
                               OR business_employee_name LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                        </trim>
                    )
                </if>
            </script>
            """)
    Integer countFranchiseList(Boolean active, String type, String keyword);

    // 특정 가맹점 조회
    @Select("""
            SELECT *
            FROM TB_FRNCHSMST
            WHERE franchise_key = #{franchiseKey}
            """)
    Franchise viewFranchise(int franchiseKey);

    // 특정 가맹점 수정
    @Update("""
            UPDATE TB_FRNCHSMST
            SET business_employee_no = #{businessEmployeeNo}, business_employee_name = #{businessEmployeeName}, franchise_code = #{franchiseCode}, franchise_name = #{franchiseName}, franchise_rep = #{franchiseRep},
                franchise_no = #{franchiseNo}, franchise_tel = #{franchiseTel}, franchise_address = #{franchiseAddress}, franchise_address_detail = #{franchiseAddressDetail},
                franchise_post = #{franchisePost}, franchise_state = #{franchiseState}, franchise_city = #{franchiseCity}, franchise_note = #{franchiseNote}
                WHERE franchise_key = #{franchiseKey}
            """)
    int editFranchise(Franchise franchise);

    // 특정 가맹점 삭제 (비활성화)
    @Update("""
            UPDATE TB_FRNCHSMST
            SET franchise_active = FALSE
            WHERE franchise_key = #{franchiseKey}
            """)
    int deleteFranchise(int franchiseKey);
}