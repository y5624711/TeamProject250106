package com.example.backend.controller.employee;

import com.example.backend.dto.employee.Employee;
import com.example.backend.service.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {
     final EmployeeService service;


     @GetMapping("/list")  //  모든 멤버 출력
     public List<Employee> getAllEmployees() {

        List<Employee> allList = service.getAllEmployee();

        return allList;
     }

     // 회원 등록
    @PostMapping("add")
    public void addEmployee(@RequestBody Employee employee) {
        System.out.println("account = " + employee);
        service.addEmployee(employee);
    }
}
