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

    public List<Employee> getAllEmployee(int page, Boolean isActiveVisible) {

        // 총 갯수
        int count = mapper.countAllEmployee(isActiveVisible);

        int selectPage=page;

        int offset= (page-1) *10 +1;
        System.out.println("count = " + count);




        return  mapper.getAllEmployees(offset ,isActiveVisible);
    }

    // 인사관리 리스트 클릭시 상세정보 가져오는 서비스
    public Employee getOneEmployeeByKey(int viewKey) {

        return  mapper.getOneEmployeeByKey(viewKey);

    }

    public boolean editEmployeeByKey(Employee employee) {

        int cnt =mapper.editEmployeeByKey(employee);
        return   cnt==1;
    }

    public boolean deleteEmployeeByKey(int employeeKey) {

        int cnt = mapper.deleteEmployeeByKey(employeeKey);
        return cnt==1;
    }
}
