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
    public List<Install> getInstallRequestList() {
        return mapper.getInstallRequestList();
    }

    // 설치 요청에 대한 정보 가져오기
    public List<Install> getInstallRequestView(int installKey) {
        return mapper.getInstallRequestView(installKey);
    }

    // 설치 기사 사번으로 이름 가져오기
    public String getCustomerInstaller(String customerInstallerNo) {
        return mapper.getCustomerInstaller(customerInstallerNo);
    }

    // 설치 승인
    public boolean installApprove(Install install) {
        try {
            // 출고 번호 등록
            String outputCode = "OUT";
            // 0 또는 숫자 조회
            Integer maxNo = mapper.viewMaxOutputNo(outputCode);
            //  부족한 자리수 만큼  0 채우기
            String newNumber = String.format("%010d", (maxNo == null) ? 1 : maxNo + 1);
            install.setOutputNo(outputCode + newNumber);

            // 설치 승인 테이블에 추가
            int approve = mapper.installApprove(install);
            if (approve <= 0) {
                throw new IllegalStateException("설치 승인 데이터 삽입 실패");
            }

            // 요청 수량 가져오기
            int num = install.getInstallRequestAmount();
            // 설치 요청에서 수량만큼 시리얼 번호 가져오기
            List<String> serialList = mapper.getSerials(install.getItemCommonCode(), num);
            if (serialList.size() < num) {
                throw new IllegalArgumentException("시리얼 번호 수량이 부족합니다." + "num: " + num + ", serial: " + serialList);
            }

            // 가져온 시리얼 번호 리스트를 TB_INSTL_SUB에 삽입
            for (String serial : serialList) {
                install.setSerialNo(serial);
                mapper.addSerialToApprove(install);
                // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 0으로 업데이트
                int updatedRows = mapper.updateItemSubActive(serial);
                if (updatedRows <= 0) {
                    throw new IllegalStateException("시리얼 번호 활성 상태 업데이트 실패: " + serial);
                }
            }
            return true;
        } catch (Exception e) {
            System.out.println("설치 승인 처리 중 오류 발생: " + e.getMessage());
            return false;
        }
    }

    // 설치 승인 테이블에서 요청 리스트 가져오기
    public List<Install> getInstallApproveList() {
        return mapper.getInstallApproveList();
    }
}
