package com.example.backend.service.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.mapper.state.retrieve.ReturnMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {
    final ReturnMapper mapper;

    //반환 관리 리스트
    public List<Return> returnList() {
        System.out.println("총 리스트" + mapper.getReturnList());
        return mapper.getReturnList();
    }
}
