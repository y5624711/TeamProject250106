package com.example.backend.mapper.department;

import com.example.backend.dto.department.Department;
import org.apache.ibatis.annotations.Select;

public interface DepartmentMapper {
    @Select("""
            SELECT *
            FROM department
            """)
    Department listUp(Integer page);
}
