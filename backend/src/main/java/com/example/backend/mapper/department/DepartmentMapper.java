package com.example.backend.mapper.department;

import com.example.backend.dto.department.Department;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface DepartmentMapper {
    @Select("""
            SELECT department_id departmentId, common_code commonCode, name
            FROM department
            """)
    List<Department> listUp();
}
