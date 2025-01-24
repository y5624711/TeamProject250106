package com.example.backend.service.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.mapper.standard.franchise.FranchiseMapper;
import com.example.backend.mapper.state.instk.InstkMapper;
import com.example.backend.mapper.state.retrieve.ReturnMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class ReturnService {
    final ReturnMapper mapper;
    final FranchiseMapper franchiseMapper;
    final InstkMapper instkMapper;

    //반환 관리 리스트
    public Map<String, Object> returnList(Integer page, String state, String type, String keyword, String sort, String order) {
        // 날짜순은 두개 합쳐야함
        if ("date".equals(sort)) {
            sort = "COALESCE(return_approve_date, return_request_date)";
        }

//        System.out.println("sort: " + sort);

        //        System.out.println("리스트: " + mapper.getReturnList());
        Integer offset = (page - 1) * 10;

        //리스트
        List<Return> returnList = mapper.getReturnList(state, offset, type, keyword, sort, order);
//        System.out.println("returnList" + returnList);

        //총 수
        Integer count = mapper.countAll(state, type, keyword);


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
//        System.out.println("프랜차이즈 이름, 코드: " + requestInfo.getFranchiseName() + franchiseCode);
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

    //반품 요청 승인 + 가입고 신청
    public boolean addApprove(Return approveInfo) {
        //1. 요청의 승인여부 변경
        mapper.changeConsent(approveInfo.getReturnRequestKey());

        //2. 발주 번호 생성
        //2-1 기존 발주번호 중 최대값 조회
        Integer max = mapper.viewMaxReturnNo();
        //2-2 최대에서 1을 더하고 부족한 자리만큼 0을 채움
        String newNo = String.format("%013d", (max == null) ? 1 : max + 1);
        approveInfo.setReturnNo(newNo);

        //3. 요청 내용 테이블에 추가
        int cnt = mapper.addApprove(approveInfo);

        //4. 가입고 BUY_IN 테이블에 삽입
        instkMapper.addBuyIn(approveInfo);


        return cnt == 1;
    }

    //반품 반려
    public boolean disapproveReturn(String returnRequestKey) {
        //return_consent = false
        return mapper.disapproveReturn(returnRequestKey) == 1;
    }

    // 가맹점 코드로 시리얼번호 조회
    public List<Return> getSerialNoList(String franchiseCode) {
        return mapper.getSerialNoList(franchiseCode);
    }
}
