package com.example.backend.service.department;

import com.example.backend.dto.department.Department;
import com.example.backend.mapper.department.DepartmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class DepartmentService {

    final DepartmentMapper mapper;

    public Map<String, Object> businessDepartmentList(Integer page,
                                                      String searchType,
                                                      String keyword,
                                                      Boolean active,
                                                      String sortColum,
                                                      String sortOrder) {
        int offset = (page - 1) * 10;

        if (searchType.isEmpty()) searchType = "number";
        if (keyword.isEmpty()) keyword = "";


        return Map.of("list", mapper.listDepartmentSelect(offset, searchType, keyword, active, sortColum, sortOrder),
                "count", mapper.departmentCountAll(searchType, keyword, active));
    }

    public boolean validateDepartment(Department department) {
        Boolean name = !department.getDepartmentName().trim().isEmpty();
        Boolean tel = !department.getDepartmentTel().trim().isEmpty();

        return name && tel;
    }

    public boolean updateDepartment(Department department) {
        System.out.println("department = " + department);
        int cnt = mapper.updateDepartment(department);
        return cnt == 1;
    }
}
