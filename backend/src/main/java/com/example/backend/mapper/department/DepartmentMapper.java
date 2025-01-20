package com.example.backend.mapper.department;

import com.example.backend.dto.department.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DepartmentMapper {
    @Select("""
            SELECT department_id departmentId, common_code commonCode, name
            FROM TB_DEPARTMST
            """)
    List<Department> listUp();

    @Select("""
        select department_code, department_name
        from  TB_DEPARTMST
""")
    List<Department> getCodeNames();
}
