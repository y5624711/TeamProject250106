package com.example.backend.service.department;

import com.example.backend.dto.department.Department;
import com.example.backend.mapper.department.DepartmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    final DepartmentMapper mapper;

    public List<Department> list() {
        return mapper.listUp();
    }
}
