package com.example.backend.controller.department;

import com.example.backend.service.department.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentService service;

    @GetMapping("list")
    public void list(Integer page) {
        service.list(page);
    }
}
