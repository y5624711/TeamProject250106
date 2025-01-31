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
                         SELECT\s
                         E.employee_key,
                         E.employee_name,
                         E.employee_tel,
                         E.employee_no,
                         E.employee_workplace_code,
                         E.employee_common_code,
                         E.employee_active,
                         E.employee_note,
                         CASE
                              WHEN E.employee_common_code = 'EMP' THEN D.department_name
                              WHEN E.employee_common_code = 'CUS' THEN C.customer_name
                                ELSE NULL
                              END AS employee_workplace_name,
                        CASE
                            WHEN E.employee_common_code = 'EMP' THEN D.department_tel
                            WHEN E.employee_common_code = 'CUS' THEN C.customer_tel
                             END AS employee_workplace_tel ,
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
                                  WHERE                           1=1
            
                         <!-- isActiveVisible이 false일 경우 employee_active = true 조건 추가 -->
                         <if test="isActiveVisible == false">   \s
                             AND employee_active = true
                         </if>
            
                         <!-- keyword가 공백이 아니면 LIKE 조건 추가 -->
                         <if test="keyword != null and keyword.trim() != ''">
                             <if test="type == 'all'">
                                 AND (
                                     employee_name LIKE CONCAT('%', #{keyword}, '%')
                                     OR employee_no LIKE CONCAT('%', #{keyword}, '%')
                                     OR employee_workplace_code LIKE CONCAT('%', #{keyword}, '%')
                                 )
                             </if>
                             <if test="type != 'all'">
                                 AND #{type} LIKE CONCAT('%', #{keyword}, '%')
                             </if>
            
                         </if>
           
                         <!-- 정렬 조건   -->
                        
                         <choose>
                             <when test="convertedSort != null and convertedSort != ''\s
                                               and (convertedSort == 'employee_name'\s
                                               or convertedSort == 'employee_tel'\s
                                               or convertedSort == 'employee_no'\s
                                               or convertedSort == 'employee_active'\s
                                               or convertedSort == 'employee_workplace_name'\s
                                                 or convertedSort == 'employee_workplace_tel'\s
                                               or convertedSort == 'employee_workplace_code')">
                                ORDER BY  ${convertedSort}
                             </when>
                             <otherwise>
                              ORDER BY   employee_key
                             </otherwise>
                         </choose>
                        <if test="order != null and (order == 'ASC' or order == 'DESC')">
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
                SELECT COUNT(*)
               FROM TB_EMPMST E
                         LEFT JOIN TB_DEPARTMST D
                         ON E.employee_common_code = 'EMP'
                         AND E.employee_workplace_code = D.department_code
                         LEFT JOIN TB_CUSTMST C
                         ON E.employee_common_code = 'CUS'
                         AND E.employee_workplace_code = C.customer_code
                        
                <where>
                    <!-- isActiveVisible이 false라면 employee_active = true 조건 추가 -->
                    <if test="isActiveVisible != null and !isActiveVisible">
                        employee_active = true
                    </if>
            
                    <!-- type이 'all'이면 모든 데이터 가져오기 -->
                    <if test="type == 'all'">
                        <!-- 아무 조건도 추가하지 않음 -->
                    </if>
            
                    <!-- type이 특정 컬럼일 경우 해당 컬럼에서 keyword 포함 여부 검사 -->
                    <if test="type != null and type != 'all'">
                        AND ${type} LIKE CONCAT('%', #{keyword}, '%')
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

}


