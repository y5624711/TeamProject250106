package com.example.backend.service.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.dto.employee.Employee;
import com.example.backend.mapper.businessAndDepartment.BusinessMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessService {
    final BusinessMapper mapper;

    public Map<String, Object> businessInfo() {
        Business corp = mapper.businessSelect();

        List<Employee> empList = mapper.listEmployeeSelect();


        return Map.of("회사", corp, "사원", empList);
    }

    public boolean validate(Business business) {
        Boolean name = !business.getBusinessName().trim().isEmpty();
        Boolean rep = !business.getBusinessRep().trim().isEmpty();
        Boolean no = !business.getBusinessNo().trim().isEmpty();
        Boolean tel = !business.getBusinessTel().trim().isEmpty();
        Boolean address = !business.getBusinessAddress().trim().isEmpty();

        return name && rep && no && tel && address;
    }

    public boolean updateBusiness(Business business) {
        int cnt = mapper.updateBusiness(business);
        return cnt == 1;
    }
}
