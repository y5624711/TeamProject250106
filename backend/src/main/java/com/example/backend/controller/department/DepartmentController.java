package com.example.backend.controller.department;

import com.example.backend.dto.department.Department;
import com.example.backend.service.department.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentService service;

    @GetMapping("list")
    public List<Department> list() {
        return service.list();
    }

    @GetMapping("codenames")
    public List<Department> getCodeNames(){
        return service.getCodeNames();
    }
}
