package com.example.backend.mapper.department;

import com.example.backend.dto.department.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface DepartmentMapper {
    @Select("""
            <script>
            SELECT *
            FROM TB_DEPARTMST
            WHERE
                <if test="active == false">
                    department_active = 1
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND(<trim prefixOverrides="OR">
                    <if test="searchType == 'number'"  >
                        department_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'name'"  >
                        OR department_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>)
            ORDER BY ${sortColum} ${sortOrder}
            LIMIT #{offset},10
            </script>
            """)
    List<Department> listDepartmentSelect(Integer offset,
                                          String searchType,
                                          String keyword,
                                          Boolean active,
                                          String sortColum,
                                          String sortOrder);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_DEPARTMST
            WHERE
                <if test="active == false">
                    department_active=TRUE
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND(<trim prefixOverrides="OR">
                    <if test="searchType == 'number'"  >
                        department_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'name'"  >
                        OR department_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>)
            </script>
            """)
    Integer departmentCountAll(String searchType, String keyword, Boolean active);

    @Update("""
            UPDATE TB_DEPARTMST
            SET department_name = #{departmentName},
                department_tel = #{departmentTel},
                department_fax = #{departmentFax},
                department_active = #{departmentActive},
                department_note = #{departmentNote}
            WHERE department_key = #{departmentKey}
            """)
    int updateDepartment(Department department);
}
