package com.example.backend.service.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.mapper.state.install.InstallMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.jdbc.DataSourceTransactionManagerAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InstallService {

    final InstallMapper mapper;
    private final DataSourceTransactionManagerAutoConfiguration dataSourceTransactionManagerAutoConfiguration;

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
            // 요청 수량 가져오기
            int num = install.getInstallRequestAmount();
            // 설치 요청에서 수량만큼 시리얼 번호 가져오기
            List<String> serialList = mapper.getSerials(install.getItemCommonCode(), num);
            if (serialList.size() < num) {
                throw new IllegalArgumentException("시리얼 번호 수량이 부족합니다." + "num: " + num + ", serial: " + serialList);
            }

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
                throw new IllegalStateException("설치 승인 데이터 삽입 오류");
            }

            // 가져온 시리얼 번호 리스트를 TB_INSTL_SUB에 삽입
            for (String serial : serialList) {
                install.setSerialNo(serial);
                mapper.addSerialToApprove(install);
                // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 0으로 업데이트
                int updatedRows = mapper.updateItemSubActive(serial);
                if (updatedRows <= 0) {
                    throw new IllegalStateException("시리얼 번호 활성 상태 업데이트 오류: " + serial);
                }
            }

            // 요청 테이블의 승인 여부 false 처리
            int updateRequestConsent = mapper.updateRequestConsent(install.getInstallRequestKey());
            if (updateRequestConsent <= 0) {
                throw new IllegalStateException("승인 여부 변경 오류");
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

    // 설치 승인에 대한 정보 가져오기
    public Install getInstallApproveView(int installKey) {
        Install install = mapper.getInstallApproveView(installKey);
        return install;
    }

    // 설치 확인
    public boolean installConfiguration(Install install) {
        try {
            // 해당 시리얼 번호의 비고 내용 추가
            if (install.getSerialNo() != null || !install.getSerialNo().trim().isEmpty()) {
                int serialNote = mapper.addSerialNote(install.getSerialNo(), install.getSerialNote());
                if (serialNote <= 0) {
                    throw new IllegalStateException("해당 시리얼 번호에 대한 비고 처리 오류: " + serialNote);
                }
            }

            System.out.println(install.getOutputNo());
            // 설치(검수)테이블에 추가
            int configuration = mapper.addConfiguration(install);
            if (configuration <= 0) {
                throw new IllegalStateException("설치(검수) 테이블에 추가 오류: " + configuration);
            }
            return true;
        } catch (Exception e) {
            System.out.println("설치 확인 처리 중 오류 발생: " + e.getMessage());
            return false;
        }
    }

    // 품목 입출력 테이블에 데이터 추가
    public boolean addOutHistory(Install install) {
        try {
            // 시리얼 번호로 입출력 테이블에서 입고된 기록 가져오기(창고 코드)
            String warehouseCode = mapper.getWarehouseCode(install.getSerialNo());
            if (warehouseCode == null || warehouseCode.trim().isEmpty()) {
                throw new IllegalStateException("입고된 기록을 찾을 수 없습니다.");
            }
            install.setWarehouseCode(warehouseCode);

            // 시리얼 번호 상세에 현재 위치 가맹점으로 변경
            int updateResult = mapper.updateSerialCurrent(install.getSerialNo());
            if (updateResult != 1) {
                throw new IllegalStateException("시리얼 번호 상세 업데이트 실패");
            }

            // 품목 입출 내역에 추가
            int outHistoryResult = mapper.addOutHistory(install);
            if (outHistoryResult != 1) {
                throw new IllegalStateException("품목 입출 내역 추가 실패");
            }

            return true;
        } catch (Exception e) {
            // 로깅 추가
            System.out.println("입출고 내역 처리 중 오류 발생: " + e.getMessage());
            return false;
        }
    }
}
