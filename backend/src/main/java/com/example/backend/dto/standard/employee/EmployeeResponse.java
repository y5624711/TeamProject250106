package com.example.backend.dto.standard.employee;

import lombok.Data;

import java.util.List;

@Data
public class EmployeeResponse {
    private List<Employee> employeeList;  // 직원 리스트
    private int totalCount;               // 총 데이터 수

}
