package com.example.backend.mapper.standard.main;

import com.example.backend.dto.standard.employee.Employee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface MainMapper {

    @Select("""
            SELECT *
            FROM TB_EMPMST
            WHERE employee_no = #{id}
            """)
    Employee selectEmployeeById(String id);

    @Select("""
            SELECT business_name
            FROM TB_BIZMST
            """)
    String selectBiz();

    @Select("""
            SELECT customer_name
            FROM TB_CUSTMST
            WHERE customer_code = #{code}
            """)
    String selectCusByCode(String code);

    @Select("""
            <script>
            SELECT
                a.employee_key,
                a.employee_name,
                a.employee_common_code,
                CASE
                    WHEN #{str} = 'BIZ' THEN c.business_name
                    WHEN #{str} = 'CUS' THEN d.customer_name
                    ELSE NULL
                END AS employeeWorkPlaceName,
                a.employee_no,
                a.employee_password,
                a.employee_tel,
                a.employee_note
            FROM
                TB_EMPMST a
                LEFT JOIN  TB_DEPARTMST b
                    ON #{str} = 'BIZ'
                    AND a.employee_workplace_code = b.department_code
                LEFT JOIN TB_BIZMST c
                    ON #{str} = 'BIZ'
                    AND c.business_common_code = b.department_common_code
                LEFT JOIN TB_CUSTMST d
                    ON #{str} = 'CUS'
                    AND a.employee_workplace_code = d.customer_code
            
            WHERE 
                a.employee_no = #{id}
            </script>
            """)
    Employee test(String str, String id);

}
