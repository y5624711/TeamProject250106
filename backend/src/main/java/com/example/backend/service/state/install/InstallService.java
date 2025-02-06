package com.example.backend.service.state.install;

import com.example.backend.dto.state.install.Install;
import com.example.backend.mapper.state.install.InstallMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Slf4j
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

    // 설치 요청 가능한 가맹점, 가맹점 주소 가져오기
    public List<Map<String, String>> getInstallFranchiseList() {
        return mapper.getInstallFranchiseList();
    }

    // 설치 가능한 품목명, 품목 코드 가져오기
    public List<Map<String, Object>> getInstallItemList() {
        return mapper.getInstallItemList();
    }

    // 설치 요청
    public boolean installRequest(Install install, Authentication authentication) {
        install.setBusinessEmployeeNo(authentication.getName());
        int cnt = mapper.installRequest(install);
        return cnt == 1;
    }

    // 설치 요청에 대한 정보 가져오기
    public Install getInstallRequestView(int installKey) {
        return mapper.getInstallRequestView(installKey);
    }

    // 설치 기사 사번으로 이름 가져오기
    public List<Map<String, Object>> getCustomerEmployee(int installKey) {
        return mapper.getCustomerEmployee(installKey);
    }

    // 설치 승인 권한
    public boolean approveAuth(Authentication authentication, Install install) {
        if (authentication.getName().startsWith("CUS")) {
            // 로그인한 사용자의 회사 정보 가져오기
            String loginCompany = mapper.selectCompanyById(authentication.getName());
            // 설치 요청 키로 담당업체 코드 가져오기
            String cusCompany = mapper.getCustomerCodeByKey(install.getInstallRequestKey());
            // 로그인한 회사와 설치 요청의 담당업체가 일치하는지 확인
            return loginCompany.equals(cusCompany);
        } else {
            return true;
        }
    }

    // 설치 예정일, 설치 기사, 사번 입력됐는지 검증
    public boolean approveValidate(Install install) {
        boolean schedule = install.getInstallScheduleDate() != null;
        boolean installer = install.getCustomerInstallerName().trim().length() > 0;
        boolean installerNo = install.getCustomerInstallerNo().trim().length() > 0;

        return schedule && installer && installerNo;
    }

    // 커스텀 예외 클래스 생성
    public class InstallApproveException extends RuntimeException {  // <-- 반드시 RuntimeException 상속
        public InstallApproveException(String message) {
            super(message);
        }
    }

    // 시리얼 번호 개수 확인
    public boolean approveSerial(Install install) {
        int num = install.getInstallRequestAmount();
        List<String> serialList = mapper.getSerials(install.getItemCommonCode(), num);
        return num > serialList.size();
    }

    // 설치 승인
    @Transactional
    public void installApprove(Install install) {
        try {
            // 요청 수량만큼 시리얼 번호 가져오기
            int num = install.getInstallRequestAmount();
            List<String> serialList = mapper.getSerials(install.getItemCommonCode(), num);

            if (serialList.size() < num) {
                throw new InstallApproveException("요청 수량이 많습니다. 사용 가능한 시리얼 번호: " + serialList.size());
            }

            // 출고 번호 생성
            String outputCode = "OUT";
            Integer maxNo = mapper.viewMaxOutputNo(outputCode);
            String newNumber = String.format("%03d", (maxNo == null) ? 1 : maxNo + 1);
            install.setOutputNo(outputCode + newNumber);

            // 시리얼 번호 등록
            for (String serial : serialList) {
                install.setSerialNo(serial);
                // INSTL_SUB에 데이터 추가
                mapper.addSerialToApprove(install);
                // ITEMSUB 시리얼 번호 active 0으로 변경
                int updatedRows = mapper.updateItemSubActiveFalse(serial);
                if (updatedRows <= 0) {
                    throw new InstallApproveException("설치 승인 실패: 시리얼 번호 [" + serial + "] 등록 중 오류 발생");
                }
            }

            // 설치 승인 테이블에 추가
            int approve = mapper.installApprove(install);
            if (approve <= 0) {
                throw new InstallApproveException("설치 승인 실패: 발주 번호 등록 실패");
            }

            // 요청 승인 여부 업데이트
            int updateRequestConsent = mapper.updateRequestConsent(install.getInstallRequestKey());
            if (updateRequestConsent <= 0) {
                throw new InstallApproveException("설치 승인 실패: 요청 테이블 승인 처리 실패");
            }

        } catch (InstallApproveException e) {
            throw e;  // 서비스에서 발생한 예외를 그대로 컨트롤러로 전달
        } catch (RuntimeException e) {
            throw new InstallApproveException("설치 승인 중 알 수 없는 오류 발생: " + e.getMessage());
        }
    }


    // 설치 승인에 대한 정보 가져오기
    public Install getInstallApproveView(int installKey) {
        Install install = mapper.getInstallApproveView(installKey);
        return install;
    }

    // 설치 완료 권한 검증
    public boolean configurationAuth(Authentication authentication, Install install) {
        if (authentication.getName().startsWith("CUS")) {
            return authentication.getName().equals(install.getCustomerInstallerNo());
        } else {
            return true;
        }
    }

    // 설치 완료
    @Transactional
    public boolean installConfiguration(Install install) {
        try {
            // ITEM_INSTL_SUB에서 해당 발주 번호의 시리얼 번호 가져오기
            List<String> serialList = mapper.getConfigurationSerials(install.getOutputNo());

            // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 1로 업데이트
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

                // 시리얼 번호에 맞는 location 키 가져오가
                List<Integer> locationKeyList = mapper.getLocationKeyList(serial);
                for (Integer locationKey : locationKeyList) {
                    // 시리얼 번호에 맞는 location 비활성화
                    Integer updateLocation = mapper.updateLocaionActive(locationKey);
                    if (updateLocation != 1) {
                        throw new IllegalStateException("로케이션 비활성화 실패");
                    }
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

    // 설치 요청, 승인 리스트 가져오기
    public Map<String, Object> getInstallList(Integer page, String sort, String order, String state, String type, String keyword, Authentication authentication) {
        Integer offset = (page - 1) * 10;

        String userId = authentication.getName();
        String company = null;
        if (userId.startsWith("CUS")) {
            company = mapper.selectCompanyById(userId);
        }

        return Map.of("list", mapper.getInstallList(offset, sort, order, state, type, keyword, company),
                "count", mapper.countAll(state, type, keyword, company));
    }

    // 반려에 대한 권한 검증
    public boolean disApproveAuth(Authentication authentication, Install install) {
        if (authentication.getName().startsWith("CUS")) {
            // 로그인한 사용자의 회사 정보 가져오기
            String loginCompany = mapper.selectCompanyById(authentication.getName());
            // 설치 요청 키로 담당업체 코드 가져오기
            String cusCompany = mapper.getCustomerCodeByKey(install.getInstallRequestKey());
            // 로그인한 회사와 설치 요청의 담당업체가 일치하는지 확인
            return loginCompany.equals(cusCompany);
        } else {
            return true;
        }
    }

    @Transactional
    public boolean installDisapprove(Install install) {
        try {
            // 승인 테이블에 반려 상태 업데이트
            int updateDisapprove = mapper.updateDisapprove(install);

            // 반려 테이블에 추가
            int addDisapprove = mapper.installDisapprove(install);

            // 하나라도 실패하면 예외 발생 → 트랜잭션 롤백
            if (updateDisapprove != 1 || addDisapprove != 1) {
                throw new IllegalStateException("반려 처리 중 오류 발생");
            }
            return true;

        } catch (Exception e) {
            throw new IllegalStateException("반려 처리 중 오류 발생", e);
        }
    }


    // 설치 승인 후 추가 데이터(승인 날짜, 출고 번호, 시리얼) 가져오기
    public Install getInstallApproveData(int installKey) {
        return mapper.getInstallApproveData(installKey);
    }

    // 설치 반려 후 추가 데이터(반려 날짜, 반려자, 반려 비고) 가져오기
    public Install getInstalldisApproveData(int installKey) {
        return mapper.getInstalldisApproveData(installKey);
    }

}