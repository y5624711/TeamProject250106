package com.example.backend.controller.state.purchase;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.service.state.purchase.PurchaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final PurchaseService service;

    // 품목 구분 코드 리스트 가져오기
    @GetMapping("commonCode")
    public List<Map<String, Object>> getItemCommonCodeList() {
        return service.getItemCommonCodeList();
    }

    // 해당 품목을 담당하는 협력 업체 이름, 가격 가져오기
    @GetMapping("customer/{itemCommonCode}")
    public List<Item> getCustomerName(@PathVariable String itemCommonCode) {
        return service.getCustomerName(itemCommonCode);
    }

    // 구매 신청
    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> purchaseRequest(@RequestBody Purchase purchase) {
        if (service.validate(purchase)) {
            if (service.purchaseRequest(purchase)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "성공적으로 구매 신청이 되었습니다."), "franchiseKey", purchase.getPurchaseRequestKey()));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "구매 신청에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }

    // 구매 관리 리스트
    @GetMapping("/list")
    public List<Purchase> list() {
        return service.purchaseList();
    }

    // 구매 승인 팝업 보기
    @GetMapping("approve/{purchaseRequestKey}")
    public Purchase viewPurchaseApprove(@PathVariable int purchaseRequestKey) {
        return service.viewPurchaseApprove(purchaseRequestKey);
    }

    // 구매 승인
    @PostMapping("/approve/{purchaseRequestKey}")
    public ResponseEntity<Map<String, Object>> approvePurchase(@RequestBody Purchase purchase) {
        if (service.purchaseApprove(purchase)) {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "구매 신청이 승인되었습니다."), "purchaseNo", purchase.getPurchaseNo()));
        } else {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "구매 신청 승인에 실패하였습니다.")));
        }
    }

    // 구매 승인 반려
    @PutMapping("/disapprove/{purchaseRequestKey}")
    public ResponseEntity<Map<String, Object>> disapprovePurchase(@PathVariable String purchaseRequestKey) {
        if (service.disapprovePurchase(purchaseRequestKey)) {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "구매 신청이 반려되었습니다.")));
        } else {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "구매 신청 반려에 실패하였습니다.")));
        }
    }
}
