package com.example.backend.service.department;

import com.example.backend.mapper.department.DepartmentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DepartmentService {

    final DepartmentMapper mapper;

    public void list(Integer page) {
        mapper.listUp(page);
    }
}
