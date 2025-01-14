package com.example.backend.mapper.employee;


import com.example.backend.dto.employee.Employee;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface EmployeeMapper {

    @Insert("""
        INSERT INTO TB_EMPMST(account_id, password, common_code)
        VALUES (#{accountId}, #{password}, #{commonCode})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "accountKey")
    int addAccount(Employee member);


    @Select("""
        select * from TB_EMPMST
""")
    List<Employee> getAllAccounts();
}
