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

    // 필드 유효성 확인 (사번, 이름은 로그인 정보를 가져오기 때문에 굳이 확인할 필요 없어서 뺌)
    public boolean validate(Purchase purchase) {
        boolean itemCommonCodeValid = purchase.getItemCommonCode() != null && !purchase.getItemCommonCode().trim().isEmpty();
        boolean customerCodeValid = purchase.getCustomerCode() != null && !purchase.getCustomerCode().trim().isEmpty();
        boolean amountValid = purchase.getAmount() != null && purchase.getAmount() > 0;
        boolean purchaseRequestDateValid = purchase.getPurchaseRequestDate() != null;

        return itemCommonCodeValid && customerCodeValid && amountValid && purchaseRequestDateValid;
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

    // 구매 승인 팝업 보기
    public Purchase viewPurchaseApprove(int purchaseRequestKey) {
        return mapper.viewPurchaseApprove(purchaseRequestKey);
    }
}
