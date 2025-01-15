package com.example.backend.mapper.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.dto.employee.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface BusinessMapper {


    @Select("""
            SELECT *
            FROM TB_BIZMST;
            """)
    Business businessSelect();

    @Select("""
            SELECT *
            FROM TB_EMPMST
            ORDER BY employee_key;
            """)
    List<Employee> listEmployeeSelect();

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
