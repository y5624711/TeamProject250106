package com.example.backend.service.business;

import com.example.backend.dto.business.Business;
import com.example.backend.mapper.business.BusinessMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BusinessService {
    final BusinessMapper mapper;


    public Business businessInfo() {
        return mapper.businessSelect();
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
