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

    public void add(Partner partner) {
//        mapper.add(partner);
        //sql 추가부터
    }
}
