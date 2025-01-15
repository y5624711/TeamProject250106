package com.example.backend.mapper.employee;


import com.example.backend.dto.employee.Employee;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface EmployeeMapper {

    // 추가 버튼
    @Insert("""
        INSERT INTO TB_EMPMST(employee_common_code ,employee_workplace_code,
                          employee_no, employee_name,
                          employee_tel,employee_note)
        VALUES (#{employeeCommonCode},#{employeeWorkPlaceCode},#{employeeNo}, #{employeeName}, #{employeeTel}, #{employeeNote})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "employeeKey")
    int addEmployee(Employee member);


    @Select("""
        select * from TB_EMPMST
""")
    List<Employee> getAllEmployees();

    @Select("""
        select * from TB_EMPMST
        WHERE employee_key = #{viewKey}
""")
    Employee getOneEmployeeByKey(int viewKey);


    @Update("""
    UPDATE TB_EMPMST
    SET 
        employee_common_code = #{employeeCommonCode},
        employee_workplace_code = #{employeeWorkPlaceCode},
        employee_no = #{employeeNo},
        employee_password = #{employeePassword},
        employee_tel = #{employeeTel},
        employee_note = #{employeeNote},
        employee_name = #{employeeName}
    WHERE employee_key = #{employeeKey}
""")
    int editEmployeeByKey(Employee employee);
}
