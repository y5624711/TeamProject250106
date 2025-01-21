package com.example.backend.service.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.mapper.state.install.InstallMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InstallService {

    final InstallMapper mapper;

    // 설치 요청
    public boolean installRequest(Install install) {
        // 임시로 가맹점 코드 입력 -> 가맹점 명을 통해 클라이언트에서 가맹점 코드로 처리 필요
        install.setFranchiseCode("FC12345678901");
        // 임시로 신청자 직원 사번 입력 -> 로그인한 사용자의 사번으로 설정
        install.setBusinessEmployeeNo("EMP0000000001");
        int cnt = mapper.installRequest(install);
        return cnt == 1;
    }

    // 설치 가능한 품목명, 품목 코드 가져오기
    public List<Map<String, String>> getInstallItemList() {
        return mapper.getInstallItemList();
    }

    // 설치 요청 테이블에서 요청 가져오기
    public List<Install> getInstallRequest() {
        return mapper.getInstallRequest();
    }
}
