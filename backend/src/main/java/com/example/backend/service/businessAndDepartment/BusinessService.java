package com.example.backend.service.businessAndDepartment;

import com.example.backend.dto.business.Business;
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

        List<String> empList = mapper.employeeSelect();


        return Map.of("회사", corp, "사원", empList);
    }
}
