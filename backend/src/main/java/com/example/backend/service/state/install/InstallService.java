package com.example.backend.service.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.mapper.state.install.InstallMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InstallService {

    final InstallMapper mapper;

    // 가맹점명, 품목, 수량 입력됐는지 검증
    public boolean requestValidate(Install install) {
        boolean franchiseName = install.getFranchiseName().trim().length() > 0;
        boolean itemCommonName = install.getItemCommonName().trim().length() > 0;
        boolean amount = install.getInstallRequestAmount() > 0;

        return franchiseName && itemCommonName && amount;
    }

    // 설치 신청 가능한 가맹점, 가맹점 주소 가져오기
    public List<Map<String, String>> getInstallFranchiseList() {
        return mapper.getInstallFranchiseList();
    }

    // 설치 가능한 품목명, 품목 코드 가져오기
    public List<Map<String, Object>> getInstallItemList() {
        return mapper.getInstallItemList();
    }

    // 설치 신청
    public boolean installRequest(Install install, Authentication authentication) {
        install.setBusinessEmployeeNo(authentication.getName());
        int cnt = mapper.installRequest(install);
        return cnt == 1;
    }

    // 설치 신청에 대한 정보 가져오기
    public List<Install> getInstallRequestView(int installKey) {
        return mapper.getInstallRequestView(installKey);
    }

    // 설치 기사 사번으로 이름 가져오기
    public List<Map<String, Object>> getCustomerEmployee(int installKey) {
        return mapper.getCustomerEmployee(installKey);
    }

    // 설치 예정일, 설치 기사, 사번 입력됐는지 검증
    public boolean approveValidate(Install install) {
        boolean schedule = install.getInstallScheduleDate() != null;
        boolean installer = install.getCustomerInstallerName().trim().length() > 0;
        boolean installerNo = install.getCustomerInstallerNo().trim().length() > 0;

        return schedule && installer && installerNo;
    }

    // 커스텀 예외 클래스 생성
    public class InstallApproveException extends RuntimeException {
        public InstallApproveException(String message) {
            super(message);
        }
    }

    // 설치 승인
    @Transactional
    public void installApprove(Install install) {
        try {
            // 1. 시리얼 번호 수량만큼 시리얼 번호 가져오기
            // 신청 수량 가져오기
            int num = install.getInstallRequestAmount();
            // 설치 신청에서 수량만큼 시리얼 번호 가져오기
            List<String> serialList = mapper.getSerials(install.getItemCommonCode(), num);
            if (serialList.size() < num) {
                throw new InstallApproveException("가능한 품목 수량이 부족합니다." + " 가능한 수량: " + serialList.toArray().length);
            }

            // 2. 출고 번호 등록
            String outputCode = "OUT";
            // 0 또는 숫자 조회
            Integer maxNo = mapper.viewMaxOutputNo(outputCode);
            //  부족한 자리수 만큼  0 채우기
            String newNumber = String.format("%010d", (maxNo == null) ? 1 : maxNo + 1);
            install.setOutputNo(outputCode + newNumber);

            // 가져온 시리얼 번호 리스트를 출고번호와 함께 TB_INSTL_SUB에 삽입
            for (String serial : serialList) {
                install.setSerialNo(serial);
                mapper.addSerialToApprove(install);
                // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 0으로 업데이트
                int updatedRows = mapper.updateItemSubActiveFalse(serial);
                if (updatedRows <= 0) {
                    throw new InstallApproveException("시리얼 번호를 등록할 수 없습니다.");
                }
            }

            // 설치 승인 테이블에 추가
            int approve = mapper.installApprove(install);
            if (approve <= 0) {
                throw new InstallApproveException("발주 번호를 등록할 수 없습니다.");
            }

            // 3. 신청 테이블의 승인 여부 true 처리
            int updateRequestConsent = mapper.updateRequestConsent(install.getInstallRequestKey());
            if (updateRequestConsent <= 0) {
                throw new InstallApproveException("설치 승인이 실패했습니다.");
            }
        } catch (Exception e) {
            throw new InstallApproveException(e.getMessage());
        }
    }

    // 설치 승인에 대한 정보 가져오기
    public Install getInstallApproveView(int installKey) {
        Install install = mapper.getInstallApproveView(installKey);
        return install;
    }

    // 설치 완료
    @Transactional
    public boolean installConfiguration(Install install) {
        try {
            // ITEM_INSTL_SUB에서 해당 발주 번호의 시리얼 번호 가져오기
            List<String> serialList = mapper.getConfigurationSerials(install.getOutputNo());

            // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 1으로 업데이트
            for (String serial : serialList) {
                int updatedSerial = mapper.updateItemSubActiveTrue(serial);
                if (updatedSerial <= 0) {
                    throw new IllegalStateException("시리얼 번호 활성 상태 업데이트 오류: " + serial);
                }
                // 시리얼 번호 상세에 현재 위치 가맹점으로 변경
                int updateResult = mapper.updateSerialCurrent(serial);
                if (updateResult != 1) {
                    throw new IllegalStateException("시리얼 번호 현재 위치 업데이트 실패");
                }
            }

            // 승인 테이블에 상태 true로 변경
            int approveConsent = mapper.updateApproveConsent(install.getOutputNo());
            if (approveConsent <= 0) {
                throw new IllegalStateException("승인 상태 변경 오류: " + approveConsent);
            }
            return true;
        } catch (Exception e) {
            System.out.println("설치 확인 처리 중 오류 발생: " + e.getMessage());
            return false;
        }
    }

    // 품목 입출력 테이블에 데이터 추가
    @Transactional
    public boolean addOutHistory(Install install) {
        try {
            // 시리얼 번호 문자열 -> 리스트로 변환
            List<String> serialList = Arrays.asList(install.getSerialNumbers().split("\\s*,\\s*"));

            for (String serial : serialList) {
                try {
                    // 시리얼 번호로 창고 코드 가져오기
                    String warehouseCode = mapper.getWarehouseCode(serial);
                    if (warehouseCode == null || warehouseCode.trim().isEmpty()) {
                        throw new IllegalStateException("입고된 기록을 찾을 수 없습니다. 시리얼 번호: " + serial);
                    }
                    install.setWarehouseCode(warehouseCode);
                    install.setSerialNo(serial);

                    // 품목 입출 내역 추가
                    int outHistoryResult = mapper.addOutHistory(install);
                    if (outHistoryResult != 1) {
                        throw new IllegalStateException("품목 입출 내역 추가 실패. 시리얼 번호: " + serial);
                    }
                } catch (Exception innerException) {
                    // 개별 시리얼 번호 처리 중 오류 발생 시 로깅 및 중단
                    System.err.println("시리얼 번호 처리 중 오류 발생: " + serial + " - " + innerException.getMessage());
                    throw innerException; // 필요 시 상위로 예외 전달
                }
            }

            return true;
        } catch (Exception e) {
            // 전체 처리 중 오류 발생
            System.err.println("입출고 내역 처리 중 오류 발생: " + e.getMessage());
            return false;
        }
    }

    // 설치 신청, 승인 리스트 가져오기
    public Map<String, Object> getInstallList(Integer page, String sort, String order, String state, String type, String keyword) {
        Integer offset = (page - 1) * 10;
        return Map.of("list", mapper.getInstallList(offset, sort, order, state, type, keyword),
                "count", mapper.countAll(state, type, keyword));
    }

    // 설치 신청 반려
    public boolean installDisapprove(int installKey) {
        int cnt = mapper.installDisapprove(installKey);
        return cnt == 1;
    }

    public Install getInstallApproveData(int installKey) {
        return mapper.getInstallApproveData(installKey);
    }
}