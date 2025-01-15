package com.example.backend.mapper.franchise;

import com.example.backend.dto.franchise.Franchise;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface FranchiseMapper {

    // 가맹점 등록하기
    @Insert("""
            INSERT INTO TB_FRNCHSMST (business_employee_no, franchise_code, franchise_name, franchise_rep, 
                franchise_no, franchise_tel, franchise_address, franchise_address_detail, 
                franchise_post, franchise_state, franchise_city, franchise_active, franchise_note)
            VALUES (#{businessEmployeeNo}, #{franchiseCode}, #{franchiseName}, #{franchiseRep}, 
                #{franchiseNo}, #{franchiseTel}, #{franchiseAddress}, #{franchiseAddressDetail}, 
                #{franchisePost}, #{franchiseState}, #{franchiseCity}, #{franchiseActive}, #{franchiseNote})
            """)
    @Options(keyProperty = "franchiseKey", useGeneratedKeys = true)
    int addFranchise(Franchise franchise);

    // 가맹점 리스트 조회
    @Select("""
            SELECT franchise_key, franchise_name, franchise_rep, franchise_state, franchise_city, business_employee_no, franchise_active 
            FROM TB_FRNCHSMST
            """)
    List<Franchise> list();

    // 특정 가맹점 조회
    @Select("""
            SELECT 
                franchise_key, business_employee_no, franchise_code, franchise_name, franchise_rep, 
                franchise_no, franchise_tel, franchise_address, franchise_address_detail, 
                franchise_post, franchise_state, franchise_city, franchise_active, franchise_note
            FROM TB_FRNCHSMST
            WHERE franchise_key = #{franchiseKey}
            """)
    Franchise getFranchise(int franchiseKey);
}