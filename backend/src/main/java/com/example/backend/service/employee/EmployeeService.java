package com.example.backend.service.employee;


import com.example.backend.dto.employee.Employee;
import com.example.backend.mapper.employee.EmployeeMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class EmployeeService {
        final EmployeeMapper mapper;
    public boolean addEmployee(Employee employee) {

           int cnt= mapper.addEmployee(employee);

           return cnt==1;
    }

    public List<Employee> getAllEmployee() {

        return  mapper.getAllEmployees();
    }
}
