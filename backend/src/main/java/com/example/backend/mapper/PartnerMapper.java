package com.example.backend.mapper;

import com.example.backend.dto.Partner;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.time.LocalDate;

@Mapper
public interface PartnerMapper {

    @Insert("""
            INSERT INTO partner
            (partner_id, common_code, product_code, manager_id, partner_name, post, 
             address, details, city1, city2, representative, tel, fax, active, note)
            VALUES (#{partnerId}, #{commonCode}, #{productCode}, #{managerId}, 
                    #{partnerName}, #{post}, #{address}, #{details}, #{city1}, 
                    #{city2}, #{representative}, #{tel}, #{fax}, #{active}, #{note})
            """)
    int add(Partner partner);

    @Select("""
            SELECT start_date
            FROM partner
            WHERE partner_id = #{partnerId}
            """)
    LocalDate getStartDate(Integer partnerId);

    @Update("""
            UPDATE partner
            SET end_date = #{endDate}
            WHERE partner_id = #{partnerId}
            """)
    int updateEndDate(Partner partner);
}
