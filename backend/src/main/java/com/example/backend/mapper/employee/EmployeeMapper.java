package com.example.backend.mapper.employee;


import com.example.backend.dto.employee.Employee;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

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
}
