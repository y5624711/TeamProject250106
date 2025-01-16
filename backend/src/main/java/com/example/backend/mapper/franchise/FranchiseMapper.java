package com.example.backend.mapper.franchise;

import com.example.backend.dto.franchise.Franchise;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface FranchiseMapper {

    // 가맹점 등록하기
    @Insert("""
            INSERT INTO TB_FRNCHSMST 
            (business_employee_no, business_employee_name, franchise_code, franchise_name, franchise_rep, franchise_no, franchise_tel, franchise_address, franchise_address_detail, franchise_post, franchise_state, franchise_city, franchise_note)
            VALUES 
            (#{businessEmployeeNo}, #{businessEmployeeName}, #{franchiseCode}, #{franchiseName}, #{franchiseRep}, #{franchiseNo}, #{franchiseTel}, #{franchiseAddress}, #{franchiseAddressDetail}, #{franchisePost}, #{franchiseState}, #{franchiseCity}, #{franchiseNote})
            """)
    @Options(keyProperty = "franchiseKey", useGeneratedKeys = true)
    int addFranchise(Franchise franchise);

    // 가맹점 리스트 조회
    @Select("""
            SELECT franchise_key, franchise_name, franchise_rep, franchise_state, franchise_city, business_employee_name
            FROM TB_FRNCHSMST
            """)
    List<Franchise> list();

    // 페이징을 위한 메서드 (현재 페이지에 맞는 데이터 가져오기)
    @Select("""
            <script>
                SELECT franchise_key, franchise_name, franchise_rep, franchise_state, franchise_city, business_employee_name
                FROM TB_FRNCHSMST
                <where>
                    <if test="category != null and category != 'all'">
                        AND franchiseState = #{category}
                    </if>
                    <if test="keyword != null and keyword != ''">
                        AND franchiseName LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </where>
                 ORDER BY franchise_key DESC
                LIMIT #{offset}, 10
            </script>
            """)
    List<Franchise> selectPage(Integer offset, String category, String keyword);

    // 총 데이터 개수 (페이지네이션을 위해 사용)
    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_FRNCHSMST
                <where>
                    <if test="category != null and category != 'all'">
                        AND franchiseState = #{category}
                    </if>
                    <if test="keyword != null and keyword != ''">
                        AND franchiseName LIKE CONCAT('%', #{keyword}, '%')
                    </if>
                </where>
            </script>
            """)
    Integer countAll(String category, String keyword);

    // 특정 가맹점 조회
    @Select("""
            SELECT *
            FROM TB_FRNCHSMST
            WHERE franchise_key = #{franchiseKey}
            """)
    Franchise getFranchise(int franchiseKey);

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
            SET franchise_active = false
            WHERE franchise_key = #{franchiseKey}
            """)
    int deleteFranchise(int franchiseKey);
}