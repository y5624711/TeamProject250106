package com.example.backend.controller.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.service.businessAndDepartment.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {
    final BusinessService service;

    @GetMapping("list")
    private Map<String, Object> list() {
        return service.businessInfo();
    }

    @PutMapping("update")
    private ResponseEntity<Map<String, Object>> update(@RequestBody Business business) {
        if (service.validate(business)) {
            if (service.updateBusiness(business)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "코드가 등록 되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error", "text", "코드가 등록 되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(
                    Map.of("message",
                            Map.of("type", "warning", "text", "내용을 입력해 주세요")));
        }
    }
}
