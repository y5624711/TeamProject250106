package com.example.backend.service.standard.employee;


import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.dto.standard.employee.EmployeeResponse;
import com.example.backend.mapper.standard.employee.EmployeeMapper;
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
        String workPlace= employee.getEmployeeWorkPlaceCode().substring(0,3);
        // 0 또는 숫자 조회
        Integer maxNo = mapper.viewMaxEmployeeNo(workPlace);

        //  부족한 자리수 만큼  0 채우기
        String newNumber = String.format("%07d", (maxNo == null) ? 1 : maxNo + 1);


        String insertEmployeeNo = workPlace+"EMP" + newNumber;
        employee.setEmployeeNo(insertEmployeeNo);

        int cnt = mapper.addEmployee(employee);

        return cnt == 1;
    }

    public EmployeeResponse getAllEmployee(int page, Boolean isActiveVisible, String keyword, String type, String convertedSort, String order) {

        // 총 갯수
        int count = mapper.countAllEmployee(isActiveVisible, keyword, type);


        int offset = (page - 1) * 10;

        // emp 이면  business 테이블 조회 , >
        // cus 이면  customer 테이블 조회
        List<Employee> employeeList = mapper.getAllEmployees(offset, isActiveVisible, keyword, type, convertedSort, order);

        EmployeeResponse employeeResponse = new EmployeeResponse();
        employeeResponse.setEmployeeList(employeeList);
        employeeResponse.setTotalCount(count);
        return employeeResponse;
    }

    // 인사관리 리스트 클릭시 상세정보 가져오는 서비스
    public Employee getOneEmployeeByKey(int viewKey) {

        return mapper.getOneEmployeeByKey(viewKey);

    }

    public boolean editEmployeeByKey(Employee employee) {

        int cnt = mapper.editEmployeeByKey(employee);
        return cnt == 1;
    }

    public boolean deleteEmployeeByKey(int employeeKey) {

        int cnt = mapper.deleteEmployeeByKey(employeeKey);
        return cnt == 1;
    }

//    public int viewMaxEmployeeNo() {
//
//        return mapper.viewMaxEmployeeNo(employee.getEmployeeCommonCode());
//    }

}
