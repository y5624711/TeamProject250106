package com.example.backend.mapper.standard;


import com.example.backend.dto.standard.employee.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

@Mapper
public interface InfoMapper {

    @Select("""
            <script>
            SELECT
                a.employee_key,
                a.employee_name,
                a.employee_common_code,
                CASE
                    WHEN  a.employee_common_code = 'BIZ' THEN c.business_name
                    WHEN  a.employee_common_code = 'EMP' THEN c.business_name
                    WHEN  a.employee_common_code = 'CUS' THEN d.customer_name
                    ELSE NULL
                END AS employeeWorkPlaceName,
                a.employee_no,
                a.employee_password,
                a.employee_tel,
                a.employee_note
            FROM
                TB_EMPMST a
                LEFT JOIN  TB_DEPARTMST b
                ON (a.employee_common_code = 'BIZ' OR a.employee_common_code = 'EMP')
                AND a.employee_workplace_code = b.department_code
                LEFT JOIN TB_BIZMST c
                ON (a.employee_common_code = 'BIZ' OR a.employee_common_code = 'EMP')
                AND c.business_common_code = b.department_common_code
                LEFT JOIN TB_CUSTMST d
                    ON a.employee_common_code = 'CUS'
                    AND a.employee_workplace_code = d.customer_code
            
            WHERE 
                a.employee_no = #{id}
            </script>
            """)
    Employee selectById(String id);

    @Update("""
            UPDATE TB_EMPMST
            SET employee_name = #{employeeName},
                employee_password=#{employeePassword},
                employee_tel=#{employeeTel},
                employee_note=#{employeeNote}
            WHERE employee_no = #{employeeNo}
            """)
    int updateUserById(Employee employee);
}
