package com.example.backend.mapper.login;

import com.example.backend.dto.standard.employee.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LoginMapper {
    @Select("""
            SELECT employee_no, employee_password
            FROM TB_EMPMST
            WHERE employee_no  = #{employeeNo}
            """)
    Employee selectById(String employeeNo);

    @Select("""
            SELECT employee_common_code
            FROM TB_EMPMST
            WHERE employee_no = #{employeeNo}
            """)
    List<String> selectAuthByCommonCode(String employeeNo);
}
