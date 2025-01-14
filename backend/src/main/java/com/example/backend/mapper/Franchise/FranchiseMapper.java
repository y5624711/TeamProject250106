package com.example.backend.mapper.Franchise;

import com.example.backend.dto.Franchise.Franchise;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface FranchiseMapper {

    // 가맹점 등록하기
    @Insert("""
            INSERT INTO TB_FRNCHSMST (business_employee_no, franchise_name, franchise_code, franchise_rep, 
                franchise_no, franchise_tel, franchise_address, franchise_address_detail, 
                franchise_post, franchise_state, franchise_city, franchise_active, franchise_note)
            VALUES (#{businessEmployeeNo}, #{franchiseName}, #{franchiseCode}, #{franchiseRep}, 
                #{franchiseNo}, #{franchiseTel}, #{franchiseAddress}, #{franchiseAddressDetail}, 
                #{franchisePost}, #{franchiseState}, #{franchiseCity}, #{franchiseActive}, #{franchiseNote})
            """)
    int insert(Franchise franchise);
}