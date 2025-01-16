package com.example.backend.service.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.mapper.businessAndDepartment.BusinessMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessService {
    final BusinessMapper mapper;


    public Business businessInfo() {
        return mapper.businessSelect();
    }

    public Map<String, Object> businessEmpList(Integer page, String searchType, String keyword, Boolean active) {
        int offset = (page - 1) * 10;

        if (searchType.isEmpty()) searchType = "number";
        if (keyword.isEmpty()) keyword = "";

        return Map.of("list", mapper.listEmployeeSelect(offset, searchType, keyword, active),
                "count", mapper.empCountAll(searchType, keyword, active));
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
