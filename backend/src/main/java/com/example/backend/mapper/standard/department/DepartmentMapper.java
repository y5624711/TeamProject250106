package com.example.backend.mapper.standard.department;

import com.example.backend.dto.standard.department.Department;
import org.apache.ibatis.annotations.Insert;
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
                    <if test="searchType == 'all' or searchType == 'number'"  >
                        department_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'name'"  >
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
                    <if test="searchType == 'all' or searchType == 'number'"  >
                        department_code LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'all' or searchType == 'name'"  >
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
                department_note = #{departmentNote}
            WHERE department_key = #{departmentKey}
            """)
    int updateDepartment(Department department);

    @Select("""
            <script>
            SELECT COALESCE(MAX(CAST(SUBSTRING(department_code,4)AS UNSIGNED )),0) AS maxNumber
            FROM TB_DEPARTMST
            WHERE department_code LIKE CONCAT(#{departmentCommonCode},'%')
            AND department_code REGEXP '[A-Za-z]+[0-9]+$'
            </script>
            """)
    Integer viewMaxDepartmentNo(String departmentCommonCode);

    @Insert("""
            INSERT INTO TB_DEPARTMST(department_common_code,
                                     department_code,
                                     department_name,
                                     department_tel,
                                     department_fax,
                                     department_note)
            VALUES(#{departmentCommonCode},
                   #{departmentCode},
                   #{departmentName},
                   #{departmentTel},
                   #{departmentFax},
                   #{departmentNote})
            """)
    int addDepartment(Department department);

    @Update("""
            UPDATE TB_DEPARTMST
            SET department_active = false,
                department_code = ''
            WHERE department_key = #{departmentKey}
            """)
    int deleteDepartment(Integer departmentKey);

    @Update("""
            UPDATE TB_DEPARTMST
            SET department_active = true
            WHERE department_key = #{departmentKey}
            """)
    int reUseDepartment(Integer departmentKey);

    @Select("""
            SELECT COUNT(*)
            FROM TB_DEPARTMST
            WHERE department_name = #{departmentName}
            AND department_active = '1';
            """)
    int checkSameName(String departmentName);

    List<Department> listUp();

    @Select("""
                    select department_code, department_name
                    from  TB_DEPARTMST
            """)
    List<Department> getCodeNames();
}
