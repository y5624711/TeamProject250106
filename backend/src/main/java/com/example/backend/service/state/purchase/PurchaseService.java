package com.example.backend.service.state.purchase;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.mapper.state.purchase.PurchaseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

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

        return itemCommonCodeValid && customerCodeValid && amountValid;
    }

    // 품목 구분 코드 리스트 가져오기
    public List<Map<String, Object>> getItemCommonCodeList() {
        return mapper.getItemCommonCodeList();
    }

    // 해당 품목을 담당하는 협력 업체 이름, 가격 가져오기
    public List<Item> getCustomerName(String itemCommonCode) {
        return mapper.getCustomerName(itemCommonCode);
    }

    // 구매 신청
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

    // 구매 승인
    public boolean purchaseApprove(Purchase purchase) {
        // 상태 현황 업데이트
        mapper.updatePurchaseConsent(purchase.getPurchaseRequestKey());

        // 기존 발주 번호에서 최대 번호를 조회
        Long maxNo = mapper.viewMaxPurchaseNo();

        // 최대 번호가 없으면 1, 있으면 1을 더한 값을 10자리 형식으로 생성
        String newNumber = String.format("%013d", (maxNo == null) ? 1 : maxNo + 1);

        // 생성된 새로운 발주 번호를 purchase 객체에 설정
        purchase.setPurchaseNo(newNumber);

        int cnt = mapper.purchaseApprove(purchase);
        return cnt == 1;
    }
}
