package com.example.backend.mapper.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.dto.employee.Employee;
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
            FROM TB_EMPMST
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'number'"  >
                        employee_no LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'number' or searchType == 'name'"  >
                        OR employee_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>
            ORDER BY employee_key DESC
            LIMIT #{offset},10
            </script>
            """)
    List<Employee> listEmployeeSelect(Integer offset, String searchType, String keyword);

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
            FROM TB_EMPMST
            WHERE
                <trim prefixOverrides="OR">
                    <if test="searchType == 'number'"  >
                        employee_no LIKE CONCAT('%',#{keyword},'%')
                    </if>
                    <if test="searchType == 'name'"  >
                        OR employee_name LIKE CONCAT('%',#{keyword},'%')
                    </if>
                </trim>
            </script>
            """)
    Integer empCountAll(String searchType, String keyword);
}
