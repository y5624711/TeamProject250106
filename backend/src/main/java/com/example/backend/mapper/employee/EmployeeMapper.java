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


//    @Select("""
//    <script>
//    SELECT *
//    FROM TB_EMPMST
//    WHERE 1=1
//    <!-- isActiveVisible이 false일 경우 employee_active = true 조건 추가 -->
//    <if test="isActiveVisible == false">
//        AND employee_active = true
//    </if>
//
//    <!-- keyword가 공백이 아니면 LIKE 조건 추가 -->
//    <if test="keyword != null and keyword.trim() != ''">
//        <if test="type == 'all'">
//            AND (employee_name LIKE CONCAT('%', #{keyword}, '%')
//                 OR employee_common_code LIKE CONCAT('%', #{keyword}, '%')
//                 OR employee_name LIKE CONCAT('%', #{keyword}, '%'))
//                OR employee_no LIKE CONCAT('%', #{keyword}, '%')
//                OR employee_workplace_code LIKE CONCAT('%', #{keyword}, '%')
//        </if>
//        <if test="type != 'all'">
//            AND ${type} LIKE CONCAT('%', #{keyword}, '%')
//        </if>
//        <if test="convertedSort!='all'">
//            order by #{convertedSort}  #{order}
//        </if>
//    </if>
//
//    LIMIT #{offset}, 10
//    </script>
//""")
//    List<Employee> getAllEmployees(@Param("offset") int offset,
//                                   @Param("isActiveVisible") boolean isActiveVisible,
//                                   @Param("keyword") String keyword,
//                                   @Param("type") String type, String convertedSort, String order);

    @Select("""
    <script>
    SELECT * 
    FROM TB_EMPMST
    WHERE 1=1

    <!-- isActiveVisible이 false일 경우 employee_active = true 조건 추가 -->
    <if test="isActiveVisible == false">
        AND employee_active = true
    </if>

    <!-- keyword가 공백이 아니면 LIKE 조건 추가 -->
    <if test="keyword != null and keyword.trim() != ''">
        <if test="type == 'all'">
            AND (
                employee_name LIKE CONCAT('%', #{keyword}, '%')
                OR employee_common_code LIKE CONCAT('%', #{keyword}, '%')
                OR employee_no LIKE CONCAT('%', #{keyword}, '%')
                OR employee_workplace_code LIKE CONCAT('%', #{keyword}, '%')
            )
        </if>
        <if test="type != 'all'">
            AND ${type} LIKE CONCAT('%', #{keyword}, '%')
        </if>
    </if>

    <!-- 정렬 조건 추가 -->
    <if test="convertedSort != null and convertedSort != '' and order != null and order != ''">
        <choose>
            <!-- 정렬 컬럼이 허용된 값인지 확인 -->
            <when test="convertedSort == 'employee_name' or convertedSort == 'employee_no' or convertedSort == 'employee_workplace_code'">
                ORDER BY ${convertedSort} 
                <choose>
                    <when test="order.toUpperCase() == 'ASC'">
                        ASC
                    </when>
                    <when test="order.toUpperCase() == 'DESC'">
                        DESC
                    </when>
                    <otherwise>
                        ASC <!-- 기본값 설정 -->
                    </otherwise>
                </choose>
            </when>
            <otherwise>
                ORDER BY employee_name ASC <!-- 기본 정렬 -->
            </otherwise>
        </choose>
    </if>

    <!-- 기본 정렬이 없을 경우를 대비 -->
    <if test="convertedSort == null or convertedSort == ''">
        ORDER BY employee_name ASC
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
    SELECT COUNT(employee_key)
    FROM TB_EMPMST
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
}
