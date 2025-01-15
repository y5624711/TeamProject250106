package com.example.backend.service.franchise;

import com.example.backend.dto.franchise.Franchise;
import com.example.backend.mapper.franchise.FranchiseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class FranchiseService {

    final FranchiseMapper mapper;

    // 필드 유효성 확인
    public boolean validate(Franchise franchise) {
        boolean businessEmployeeNoValid = franchise.getBusinessEmployeeNo() != null && !franchise.getBusinessEmployeeNo().trim().isEmpty();
        boolean franchiseNameValid = franchise.getFranchiseName() != null && !franchise.getFranchiseName().trim().isEmpty();
        boolean franchiseCodeValid = franchise.getFranchiseCode() != null && !franchise.getFranchiseCode().trim().isEmpty();
        boolean franchiseRepValid = franchise.getFranchiseRep() != null && !franchise.getFranchiseRep().trim().isEmpty();
        boolean franchiseNoValid = franchise.getFranchiseNo() != null && !franchise.getFranchiseNo().trim().isEmpty();
        boolean franchiseTelValid = franchise.getFranchiseTel() != null && !franchise.getFranchiseTel().trim().isEmpty();
        boolean franchiseAddressValid = franchise.getFranchiseAddress() != null && !franchise.getFranchiseAddress().trim().isEmpty();
        boolean franchisePostValid = franchise.getFranchisePost() != null && !franchise.getFranchisePost().trim().isEmpty();
        boolean franchiseStateValid = franchise.getFranchiseState() != null && !franchise.getFranchiseState().trim().isEmpty();
        boolean franchiseCityValid = franchise.getFranchiseCity() != null && !franchise.getFranchiseCity().trim().isEmpty();

        return businessEmployeeNoValid && franchiseNameValid && franchiseCodeValid && franchiseRepValid
               && franchiseNoValid && franchiseTelValid && franchiseAddressValid && franchisePostValid && franchiseStateValid && franchiseCityValid;
    }

    // 가맹점 등록하기
    public boolean addFranchise(Franchise franchise) {
        int cnt = mapper.addFranchise(franchise);
        return cnt == 1;
    }

    // 가맹점 리스트 조회
    public List<Franchise> list() {
        return mapper.list();
    }

    // 특정 가맹점 조회
    public Franchise getFranchise(int franchiseKey) {
        return mapper.getFranchise(franchiseKey);
    }

    // 특정 가맹점 수정
    public boolean editFranchise(Franchise franchise) {
        int cnt = mapper.editFranchise(franchise);
        return cnt == 1;
    }

    // 특정 가맹점 삭제 (비활성화)
    public boolean deleteFranchise(int franchiseKey) {
        int cnt = mapper.deleteFranchise(franchiseKey);
        return cnt == 1;
    }
}
