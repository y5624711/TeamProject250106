package com.example.backend.mapper.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.dto.department.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface BusinessMapper {


    @Select("""
            SELECT *
            FROM TB_BIZMST;
            """)
    Business businessSelect();

    @Select("""
            <script>
            SELECT *
            FROM TB_DEPARTMST
            WHERE
                <if test="active == false">
                    department_active=TRUE
                </if>
                <if test="active == true">
                    department_active=false
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

    @Update("""
            UPDATE TB_BIZMST
            SET business_name=#{businessName},
                business_rep=#{businessRep},
                business_no=#{businessNo},
                business_tel=#{businessTel},
                business_fax=#{businessFax},
                business_address=#{businessAddress}
            WHERE business_key =#{businessKey};
            """)
    int updateBusiness(Business business);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_DEPARTMST
            WHERE
                <if test="active == false">
                    department_active=TRUE
                </if>
                <if test="active == true">
                    department_active=false
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
}
