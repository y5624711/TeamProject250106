package com.example.backend.mapper;

import com.example.backend.dto.Branch;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface BranchMapper {

    @Insert("""
            INSERT INTO branch (
                branch_id, common_code, manager_id, branch_name, post, address, details, 
                city1, city2, representative, tel, fax, size, active, note)
            VALUES (#{branchId}, #{commonCode}, #{managerId}, #{branchName}, #{post}, #{address}, #{details}, 
                #{city1}, #{city2}, #{representative}, #{tel}, #{fax}, #{size}, #{active}, #{note})
            """)
    int insert(Branch branch);
}