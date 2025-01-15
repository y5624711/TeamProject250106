package com.example.backend.controller.businessAndDepartment;

import com.example.backend.service.businessAndDepartment.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {
    final BusinessService service;

    @GetMapping("list")
    private Map<String, Object> list() {
        return service.businessInfo();
    }
}
