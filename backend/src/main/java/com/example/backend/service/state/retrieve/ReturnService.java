package com.example.backend.service.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.mapper.standard.employee.EmployeeMapper;
import com.example.backend.mapper.standard.franchise.FranchiseMapper;
import com.example.backend.mapper.state.instk.InstkMapper;
import com.example.backend.mapper.state.retrieve.ReturnMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {
    final ReturnMapper mapper;
    final FranchiseMapper franchiseMapper;
    final InstkMapper instkMapper;
    final EmployeeMapper employeeMapper;

    //반환 관리 리스트
    public Map<String, Object> returnList(Integer page, String state, String type, String keyword, String sort, String order, Authentication auth) {
//        System.out.println("return sort: " + sort);
//        System.out.println("return order: " + order);

        // 날짜순은 3개 합쳐야함 : 승인/반려가 없으면
        if ("date".equals(sort)) {
            sort = "COALESCE(return_approve_date, disapprove_date, return_request_date)";
        } else if ("customerEmployeeName".equals(sort)) {
            sort = "COALESCE(customerEmployeeName, disapproveEmployeeName)";
        }
        Integer offset = (page - 1) * 10;

        //리스트
        //본사일 경우 리스트 모두 보임
        //협력사일 경우 자기 회사만
        String userCompany = employeeMapper.checkUserCompany(auth.getName());
//        System.out.println("회사코드: " + userCompany);

        List<Return> returnList = mapper.getReturnList(state, offset, type, keyword, sort, order, userCompany);
//        System.out.println("returnList: " + returnList);
        //총 수
        Integer count = mapper.countAll(state, type, keyword, userCompany);

        return Map.of("returnList", returnList, "count", count);
    }

    //시리얼 번호로 정보 조회
    public List<Return> getStandardInfo(String serialNo) {
//        System.out.println("service: " + mapper.getRequestInfo(serialNo));
        return mapper.getStandardInfo(serialNo);
    }

    //반품 요청 정보 저장
    public boolean addRequest(Return requestInfo) {
        //프랜차이즈 이름-> 코드
        String franchiseCode = franchiseMapper.getFranchiseCode(requestInfo.getFranchiseName());
        if (franchiseCode == null || franchiseCode.isEmpty()) {
            return false;
        }
        requestInfo.setFranchiseCode(franchiseCode);
        //요청 정보 작성
        int count = mapper.addRequest(requestInfo);

        return count == 1;
    }

    //요청 정보 조회 (1개)
    public List<Return> getRequestInfo(String returnRequestKey) {
//        System.out.println("key: " + returnRequestKey);
//        System.out.println("반환: " + mapper.getRequestInfo(returnRequestKey));
        return mapper.getRequestInfo(returnRequestKey);
    }

    //반품 요청 승인 + 가입고 요청
    public boolean addApprove(Return approveInfo) {
        //1. 요청의 승인여부 변경
        mapper.changeConsent(approveInfo.getReturnRequestKey());

        //2. 발주 번호 생성
        //2-1 기존 발주번호 중 최대값 조회
        Integer max = mapper.viewMaxReturnNo();
        //2-2 최대에서 1을 더하고 부족한 자리만큼 0을 채움
        String newNo = String.format("%03d", (max == null) ? 1 : max + 1);
        String newReturnNo = "RTN" + newNo;
        approveInfo.setReturnNo(newReturnNo);
//        System.out.println("max: " + max);
//        System.out.println("dto: " + approveInfo.getReturnNo());

        //3. 요청 내용 테이블에 추가
        int cnt = mapper.addApprove(approveInfo);

        //4. 가입고 BUY_IN 테이블에 삽입
        instkMapper.addBuyIn(approveInfo);


        return cnt == 1;
    }

    //반품 반려
    public boolean disapproveReturn(Return disapproveInfo) {
        //return_consent = false
        int t1 = mapper.disapproveReturn(disapproveInfo.getReturnRequestKey());

        //DISPR에 정보 추가
        int t2 = mapper.addDisapprove(disapproveInfo);

        return t1 == 1 && t2 == 1;
    }

    // 가맹점 코드로 시리얼번호 조회
    public List<Return> getSerialNoList(String franchiseCode) {
//        System.out.println("service: " + mapper.getSerialNoList(franchiseCode));
        return mapper.getSerialNoList(franchiseCode);
    }

    //검수기사 목록 반환
    public List<Map<String, Object>> getConfigurerList(String returnRequestKey) {
//        System.out.println("업체 당 기사 목록: " + mapper.getConfigurerList(returnRequestKey));
        return mapper.getConfigurerList(returnRequestKey);
    }

    //요청자 자격
    public boolean checkCustomer(String loginNo) {
//        System.out.println("사용여부 권한자 확인");

        String userCompany = employeeMapper.checkUserCompany(loginNo);

        // "CUS"로 시작하면 true, 그렇지 않으면 false 반환
        return userCompany != null && userCompany.startsWith("CUS");
    }

    //승인자 (제한)자격
    public boolean checkApproveEmployee(String loginNo, String CustomerCode) {
//        System.out.println("수정권한자 확인");
        //1. 본사 사람인가? 2. 해당 협석사 직원인가?
        String userCompany = employeeMapper.checkUserCompany(loginNo);
//        System.out.println("유저 소속: " + userCompany);

        return userCompany.equals(CustomerCode) || userCompany.startsWith("BIZ");
    }
}
