package com.example.backend.controller.Franchise;

import com.example.backend.dto.Franchise.Franchise;
import com.example.backend.service.Franchise.FranchiseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/franchise")
public class FranchiseController {

    final FranchiseService service;

    // 가맹점 등록하기
    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Franchise franchise) {
        if (service.validate(franchise)) {
            if (service.add(franchise)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "가맹점이 등록되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "가맹점 등록에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }

    // 가맹점 리스트 조회
    @GetMapping("/list")
    public List<Franchise> list() {
        return service.list();
    }
}
