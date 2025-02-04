package com.example.backend.controller.state.purchase;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.mapper.standard.login.LoginMapper;
import com.example.backend.service.state.purchase.PurchaseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/purchase")
public class PurchaseController {

    private final PurchaseService service;
    private final LoginMapper loginMapper;

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

    // 구매 요청
    @PostMapping("/request")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> purchaseRequest(@RequestBody Purchase purchase, Authentication auth) {
        // "CUS"로 시작하면 요청 제한
//        String company = auth.getName();
//        if (company == null || !company.startsWith("CUS")) {
//            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(Map.of("message", Map.of("type", "error", "text", "협력 업체는 구매 요청을 할 수 없습니다.")));
//        }
        if (service.validate(purchase)) {
            if (service.purchaseRequest(purchase, auth)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "성공적으로 구매 요청이 되었습니다."), "franchiseKey", purchase.getPurchaseRequestKey()));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message", Map.of("type", "warning", "text", "구매 요청에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }

    // 구매 관리 리스트 (권한)
    @GetMapping("/list")
    public Map<String, Object> purchaseList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "state", defaultValue = "all") String state,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order,
            Authentication auth) {
        return service.purchaseList(page, type, keyword, state, sort, order, auth);
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
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "구매 요청이 승인되었습니다."), "purchaseNo", purchase.getPurchaseNo()));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message", Map.of("type", "warning", "text", "구매 요청 승인에 실패하였습니다.")));
        }
    }

    // 구매 승인 반려
    @PutMapping("/disapprove/{purchaseRequestKey}")
    public ResponseEntity<Map<String, Object>> disapprovePurchase(@PathVariable String purchaseRequestKey) {
        if (service.disapprovePurchase(purchaseRequestKey)) {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "구매 요청이 반려되었습니다.")));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message", Map.of("type", "warning", "text", "구매 요청 반려에 실패하였습니다.")));
        }
    }
}
