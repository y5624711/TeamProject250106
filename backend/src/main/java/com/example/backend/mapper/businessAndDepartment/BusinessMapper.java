package com.example.backend.mapper.businessAndDepartment;

import com.example.backend.dto.business.Business;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
    List<String> employeeSelect();
}
