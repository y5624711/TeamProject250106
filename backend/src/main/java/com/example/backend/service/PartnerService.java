package com.example.backend.service;

import com.example.backend.dto.Partner;
import com.example.backend.mapper.PartnerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PartnerService {
    final PartnerMapper mapper;

    //협력업체 등록
    public void add(Partner partner) {
        mapper.add(partner);

        partner.setStartDate(mapper.getStartDate(partner.getPartnerId()));

        //계약 종료 날짜 set
        partner.setEndDate(partner.getStartDate().plusYears(2));
        mapper.updateEndDate(partner);

    }
}
