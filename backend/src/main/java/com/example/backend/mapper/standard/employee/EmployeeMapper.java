package com.example.backend.mapper.standard.employee;


import com.example.backend.dto.standard.employee.Employee;
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
    SELECT
        E.employee_key,
        E.employee_name,
        E.employee_tel,
        E.employee_no,
        E.employee_workplace_code,
        E.employee_common_code,
        E.employee_active,
        E.employee_note,
        CASE
            WHEN E.employee_common_code = 'CUS' THEN C.customer_name
            ELSE NULL
        END AS employee_workplace_name,
        CASE
            WHEN E.employee_common_code = 'EMP' THEN D.department_tel
            WHEN E.employee_common_code = 'CUS' THEN C.customer_tel
        END AS employee_workplace_tel,
        CASE
            WHEN E.employee_common_code = 'EMP' THEN D.department_name
            ELSE NULL
        END AS employee_department_name
    FROM TB_EMPMST E
        LEFT JOIN TB_DEPARTMST D
            ON E.employee_common_code = 'EMP'
            AND E.employee_workplace_code = D.department_code
        LEFT JOIN TB_CUSTMST C
            ON E.employee_common_code = 'CUS'
            AND E.employee_workplace_code = C.customer_code
    WHERE 1=1
        
    <if test="isActiveVisible == false">   
        AND employee_active = true
    </if>

    <if test="keyword != null and keyword.trim() != ''">
        <if test="type == 'all'">
            AND (
                (E.employee_common_code = 'CUS' AND C.customer_name LIKE CONCAT('%', #{keyword}, '%'))
                OR employee_name LIKE CONCAT('%', #{keyword}, '%')
                OR employee_no LIKE CONCAT('%', #{keyword}, '%')
                OR employee_workplace_code LIKE CONCAT('%', #{keyword}, '%')
            )
        </if>
        <if test="type != 'all'">
            <choose>
                <when test="type == 'employee_workplace_name'">
                    AND E.employee_common_code = 'CUS' 
                    AND C.customer_name LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <otherwise>
                    AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                </otherwise>
            </choose>
        </if>
    </if>

    <choose>
        <when test="convertedSort != null and convertedSort != '' 
                    and (convertedSort == 'employee_name' 
                    or convertedSort == 'employee_tel' 
                    or convertedSort == 'employee_no' 
                    or convertedSort == 'employee_active' 
                    or convertedSort == 'employee_workplace_name' 
                    or convertedSort == 'employee_workplace_tel' 
                    or convertedSort == 'employee_workplace_code')">
            ORDER BY ${convertedSort}
        </when>
        <otherwise>
            ORDER BY employee_key 
        </otherwise>
    </choose>
    <if test="order != null and (order == 'asc' or order == 'desc')">
        ${order}
    </if>

    LIMIT #{offset}, 10
    </script>
""")
    List<Employee> getAllEmployees(
            @Param("offset") int offset,
            @Param("isActiveVisible") boolean isActiveVisible,
            @Param("keyword") String keyword,
            @Param("type") String type,
            @Param("convertedSort") String convertedSort,
            @Param("order") String order
    );


    @Select("""
            SELECT  
                E.employee_key,
                E.employee_name,
                E.employee_tel,
                E.employee_no,
                E.employee_workplace_code,
                E.employee_common_code,
                E.employee_password,
                E.employee_active,
                E.employee_note,
                CASE
                    WHEN E.employee_common_code = 'EMP' THEN D.department_name
                    ELSE NULL
                END AS  department_name
            FROM TB_EMPMST E
            LEFT JOIN TB_DEPARTMST D 
                ON E.employee_workplace_code = D.department_code
                 AND E.employee_common_code = 'EMP'
            WHERE E.employee_key = #{viewKey}
            """
    )
    Employee getOneEmployeeByKey(int viewKey);


    @Update("""
                UPDATE TB_EMPMST
                SET                
                    employee_password = #{employeePassword},
                    employee_tel = #{employeeTel},
                    employee_note = #{employeeNote},
                    employee_name = #{employeeName} ,
                    employee_active=#{employeeActive}
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
    SELECT COUNT(*)
    FROM TB_EMPMST E
        LEFT JOIN TB_DEPARTMST D
            ON E.employee_common_code = 'EMP'
            AND E.employee_workplace_code = D.department_code
        LEFT JOIN TB_CUSTMST C
            ON E.employee_common_code = 'CUS'
            AND E.employee_workplace_code = C.customer_code
    <where>
        <if test="isActiveVisible != null and !isActiveVisible">
            employee_active = true
        </if>

        <if test="type == 'all'">
            AND (
                employee_name LIKE CONCAT('%', #{keyword}, '%')
                OR customer_name LIKE CONCAT('%', #{keyword}, '%')
                OR employee_no LIKE CONCAT('%', #{keyword}, '%')
                OR employee_workplace_code LIKE CONCAT('%', #{keyword}, '%')
            )
        </if>

        <if test="type != null and type != 'all'">
            <choose>
                <when test="type == 'employee_workplace_name'">
                    AND C.customer_name LIKE CONCAT('%', #{keyword}, '%')
                </when>
                <otherwise>
                    AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                </otherwise>
            </choose>
        </if>
    </where>
    </script>
""")
    int countAllEmployee(@Param("isActiveVisible") Boolean isActiveVisible,
                         @Param("keyword") String keyword,
                         @Param("type") String type);


    @Select("""
                <script>
               SELECT COALESCE(MAX(CAST(SUBSTRING(employee_no, 7) AS UNSIGNED)), 0) AS maxNumber
                FROM TB_EMPMST
                WHERE employee_no LIKE CONCAT(#{employeeCommonCode}, '%')
                AND employee_no REGEXP '^[A-Za-z]+[0-9]+$'
                </script>
            """)
    Integer viewMaxEmployeeNo(String employeeCommonCode);

    @Select("""
            SELECT employee_workplace_code
            FROM TB_EMPMST
            WHERE employee_no=#{loginNo}
            """)
    String checkUserCompany(String loginNo);
}


