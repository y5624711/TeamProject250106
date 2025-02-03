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
            (franchise_code, franchise_name, franchise_rep, franchise_no, franchise_tel, franchise_address, franchise_address_detail, franchise_post, franchise_state, franchise_city, franchise_note)
            VALUES
            (#{franchiseCode}, #{franchiseName}, #{franchiseRep}, #{franchiseNo}, #{franchiseTel}, #{franchiseAddress}, #{franchiseAddressDetail}, #{franchisePost}, #{franchiseState}, #{franchiseCity}, #{franchiseNote})
            """)
    @Options(keyProperty = "franchiseKey", useGeneratedKeys = true)
    int addFranchise(Franchise franchise);

    // 가맹점 리스트 불러오기
    @Select("""
            <script>
            SELECT franchise_key, franchise_name, franchise_rep, franchise_no, franchise_tel, franchise_state, franchise_city, franchise_active
            FROM TB_FRNCHSMST
            WHERE
                <if test="active != null and !active">
                    franchise_active = TRUE
                </if>
                <if test="active == null or active">
                    1=1
                </if>
                <if test="keyword != null and keyword.trim() != ''">
                    AND (
                        <trim prefixOverrides="OR">
                            <if test="type=='all' or type=='franchiseName'">
                                OR franchise_name LIKE CONCAT('%', #{keyword}, '%')
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
                        </trim>
                    )
                </if>
            ORDER BY
                    <choose>
                        <when test="sort == 'franchiseName'">franchise_name</when>
                        <when test="sort == 'franchiseRep'">franchise_rep</when>
                        <when test="sort == 'franchiseNo'">franchise_no</when>
                        <when test="sort == 'franchiseTel'">franchise_tel</when>
                        <when test="sort == 'franchiseState'">franchise_state</when>
                        <when test="sort == 'franchiseCity'">franchise_city</when>
                        <otherwise>franchise_key</otherwise> <!-- 기본값 -->
                    </choose>
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
            SET franchise_code = #{franchiseCode}, franchise_name = #{franchiseName}, franchise_rep = #{franchiseRep},
                franchise_no = #{franchiseNo}, franchise_tel = #{franchiseTel}, franchise_address = #{franchiseAddress}, franchise_address_detail = #{franchiseAddressDetail},
                franchise_post = #{franchisePost}, franchise_state = #{franchiseState}, franchise_city = #{franchiseCity}, franchise_active = #{franchiseActive}, franchise_note = #{franchiseNote}
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

    // 가맹정 이름으로 코드 조회 (jm)
    @Select("""
            SELECT franchise_code
            FROM TB_FRNCHSMST
            WHERE franchise_name = #{franchiseName}
            """)
    String getFranchiseCode(String franchiseName);
}