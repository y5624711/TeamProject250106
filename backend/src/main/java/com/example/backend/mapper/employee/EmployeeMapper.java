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
        <script>
        SELECT * 
        FROM TB_EMPMST
        WHERE 1=1
        <if test="isActiveVisible == false">
            AND employee_active = true
        </if>
        LIMIT #{offset}, 10
        </script>
        """)
    List<Employee> getAllEmployees(@Param("offset") int offset, @Param("isActiveVisible") boolean isActiveVisible);


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


    @Update("""
    UPDATE TB_EMPMST
    SET employee_active=false
        where employee_key = #{employeeKey}
""")
    int deleteEmployeeByKey(int employeeKey);

    @Select("""
    <script>
    SELECT COUNT(employee_key)
    FROM TB_EMPMST
    <where>
        <if test="isActiveVisible != null and !isActiveVisible">
            employee_active = true
        </if>
    </where>
          </script>
""")
    int countAllEmployee(@Param("isActiveVisible") Boolean isActiveVisible);
}
