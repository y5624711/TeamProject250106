package com.example.backend.service;

import com.example.backend.dto.CommonCode;
import com.example.backend.mapper.CommonMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CommonService {
    final CommonMapper mapper;

    public List<CommonCode> selectAllList() {
        return mapper.selectAll();
    }
}
