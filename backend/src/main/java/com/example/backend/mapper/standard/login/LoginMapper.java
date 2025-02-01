package com.example.backend.mapper.standard.login;

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

    @Select("""
            SELECT employee_name
            FROM TB_EMPMST
            WHERE employee_no = #{employeeNo}
            """)
    String selectByIdSearchName(String employeeNo);

    @Select("""
            SELECT a.employee_workplace_code
            FROM TB_EMPMST a
                     JOIN TB_CUSTMST b ON a.employee_workplace_code = b.customer_code
            WHERE a.employee_no = #{employeeNo}
            """)
    String selectCompanyByCode(String employeeNo);

    @Select("""
            SELECT c.business_code
            FROM TB_EMPMST a
                     JOIN TB_DEPARTMST b ON a.employee_workplace_code = b.department_code
                     JOIN TB_BIZMST c ON b.department_common_code = c.business_common_code
            WHERE a.employee_no = #{employeeNo}
            """)
    String selectBusinessByCode(String employeeNo);
}
