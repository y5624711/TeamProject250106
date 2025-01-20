package com.example.backend.mapper.standard.business;

import com.example.backend.dto.standard.business.Business;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface BusinessMapper {


    @Select("""
            SELECT *
            FROM TB_BIZMST;
            """)
    Business businessSelect();


    @Update("""
            UPDATE TB_BIZMST
            SET business_name=#{businessName},
                business_rep=#{businessRep},
                business_no=#{businessNo},
                business_tel=#{businessTel},
                business_fax=#{businessFax},
                business_address=#{businessAddress}
            WHERE business_key =#{businessKey};
            """)
    int updateBusiness(Business business);


}
