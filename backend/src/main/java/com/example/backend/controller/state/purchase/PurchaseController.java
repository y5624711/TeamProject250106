package com.example.backend.controller.state.purchase;

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

    // 구매 요청
    @PostMapping("/request")
    public ResponseEntity<Map<String, Object>> purchaseRequest(@RequestBody Purchase purchase) {
        if (service.validate(purchase)) {
            if (service.purchaseRequest(purchase)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success", "text", "성공적으로 구매 요청이 되었습니다."), "franchiseKey", purchase.getPurchaseRequestKey()));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "구매 요청에 실패하였습니다.")));
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
}
