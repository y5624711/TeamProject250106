package com.example.backend.service.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.mapper.standard.franchise.FranchiseMapper;
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
    final FranchiseMapper franchiseMapper;

    //반환 관리 리스트
    public List<Return> returnList() {
//        System.out.println("리스트: " + mapper.getReturnList());
        return mapper.getReturnList();
    }

    //시리얼 번호로 정보 조회
    public List<Return> getStandardInfo(String serialNo) {
//        System.out.println("service: " + mapper.getRequestInfo(serialNo));
        return mapper.getStandardInfo(serialNo);
    }

    public void addRequest(Return requestInfo) {
        //프랜차이즈 이름-> 코드
        String franchiseCode = franchiseMapper.getFranchiseCode(requestInfo.getFranchiseName());
//        System.out.println("프랜차이즈 이름, 코드: " + requestInfo.getFranchiseName() + franchiseCode);
        requestInfo.setFranchiseCode(franchiseCode);

        mapper.addRequest(requestInfo);
    }

    public List<Return> getRequestInfo(String returnRequestKey) {
        System.out.println("반환: " + mapper.getRequestInfo(returnRequestKey));
        return mapper.getRequestInfo(returnRequestKey);
    }
}
