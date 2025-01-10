package com.example.backend.service.branch;

import com.example.backend.dto.branch.Branch;
import com.example.backend.mapper.branch.BranchMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class BranchService {

    final BranchMapper mapper;

    public boolean validate(Branch branch) {
        boolean branchNameValid = branch.getBranchName() != null && !branch.getBranchName().trim().isEmpty();
        boolean postValid = branch.getPost() != null && !branch.getPost().trim().isEmpty();
        boolean addressValid = branch.getAddress() != null && !branch.getAddress().trim().isEmpty();
        boolean detailsValid = branch.getDetails() != null && !branch.getDetails().trim().isEmpty();
        boolean city1Valid = branch.getCity1() != null && !branch.getCity1().trim().isEmpty();
        boolean city2Valid = branch.getCity2() != null && !branch.getCity2().trim().isEmpty();
        boolean representativeValid = branch.getRepresentative() != null && !branch.getRepresentative().trim().isEmpty();
        boolean telValid = branch.getTel() != null && !branch.getTel().trim().isEmpty();
        boolean faxValid = branch.getFax() != null && !branch.getFax().trim().isEmpty();
        boolean sizeValid = branch.getSize() != null && !branch.getSize().trim().isEmpty();

        // 모든 필드가 유효한지 확인
        return branchNameValid && postValid && addressValid && detailsValid && city1Valid && city2Valid
               && representativeValid && telValid && faxValid && sizeValid;
    }

    public boolean add(Branch branch) {
        int cnt = mapper.insert(branch);
        return cnt == 1;
    }
}
