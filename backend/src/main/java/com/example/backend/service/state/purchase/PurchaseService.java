package com.example.backend.service.state.purchase;

import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.mapper.state.purchase.PurchaseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PurchaseService {

    final PurchaseMapper mapper;

    // 필드 유효성 확인
    public boolean validate(Purchase purchase) {
        boolean businessEmployeeNoValid = purchase.getBusinessEmployeeNo() != null && !purchase.getBusinessEmployeeNo().trim().isEmpty();
        boolean businessEmployeeNameValid = purchase.getBusinessEmployeeName() != null && !purchase.getBusinessEmployeeName().trim().isEmpty();
        boolean itemCommonCodeValid = purchase.getItemCommonCode() != null && !purchase.getItemCommonCode().trim().isEmpty();
        boolean customerCodeValid = purchase.getCustomerCode() != null && !purchase.getCustomerCode().trim().isEmpty();
        boolean amountValid = purchase.getAmount() != null && purchase.getAmount() > 0;
        boolean purchaseRequestDateValid = purchase.getPurchaseRequestDate() != null;

        return businessEmployeeNoValid && businessEmployeeNameValid && itemCommonCodeValid && customerCodeValid && amountValid && purchaseRequestDateValid;
    }

    // 구매 요청
    public boolean purchaseRequest(Purchase purchase) {
        int cnt = mapper.purchaseRequest(purchase);
        return cnt == 1;
    }
}
