package com.example.backend.controller.standard.business;

import com.example.backend.dto.standard.business.Business;
import com.example.backend.service.standard.business.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {
    final BusinessService service;


    @GetMapping("view")
    public Business view() {
        return service.businessInfo();
    }


    @PutMapping("update")
    public ResponseEntity<Map<String, Object>> update(@RequestBody Business business) {
        if (service.validate(business)) {
            if (service.updateBusiness(business)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "저장되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error", "text", "저장에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.ok().body(
                    Map.of("message",
                            Map.of("type", "warning", "text", "필수 항목이 입력되지 않았습니다.")));
        }
    }


}
