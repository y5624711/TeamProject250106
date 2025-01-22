package com.example.backend.service.state.purchase;

import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.mapper.state.purchase.PurchaseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class PurchaseService {

    final PurchaseMapper mapper;

    // 필드 유효성 확인
    public boolean validate(Purchase purchase) {
        boolean employeeNoValid = purchase.getEmployeeNo() != null && !purchase.getEmployeeNo().trim().isEmpty();
        boolean employeeNameValid = purchase.getEmployeeName() != null && !purchase.getEmployeeName().trim().isEmpty();
        boolean itemCommonCodeValid = purchase.getItemCommonCode() != null && !purchase.getItemCommonCode().trim().isEmpty();
        boolean customerCodeValid = purchase.getCustomerCode() != null && !purchase.getCustomerCode().trim().isEmpty();
        boolean amountValid = purchase.getAmount() != null && purchase.getAmount() > 0;
        boolean purchaseRequestDateValid = purchase.getPurchaseRequestDate() != null;

        return employeeNoValid && employeeNameValid && itemCommonCodeValid && customerCodeValid && amountValid && purchaseRequestDateValid;
    }

    // 구매 요청
    public boolean purchaseRequest(Purchase purchase) {
        int cnt = mapper.purchaseRequest(purchase);
        return cnt == 1;
    }

    // 구매 관리 리스트
    public List<Purchase> purchaseList() {
        return mapper.purchaseList();
    }
}
