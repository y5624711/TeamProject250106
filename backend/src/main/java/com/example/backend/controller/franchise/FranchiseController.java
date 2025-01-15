package com.example.backend.controller.franchise;

import com.example.backend.dto.franchise.Franchise;
import com.example.backend.service.franchise.FranchiseService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            if (service.addFranchise(franchise)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success", "text", "가맹점이 등록되었습니다."), "franchiseKey", franchise.getFranchiseKey()));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "가맹점 등록에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }

    // 가맹점 리스트 조회
    @GetMapping("/list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "st", defaultValue = "all") String searchType,
                                    @RequestParam(value = "sk", defaultValue = "") String keyword) {
        return service.list(page, searchType, keyword);
    }

    // 특정 가맹점 조회
    @GetMapping("view/{franchiseKey}")
    public Franchise view(@PathVariable int franchiseKey) {
        return service.getFranchise(franchiseKey);
    }

    // 특정 가맹점 수정
    @PutMapping("edit/{franchiseKey}")
    public ResponseEntity<Map<String, Object>> edit(@RequestBody Franchise franchise) {
        if (service.validate(franchise)) {
            if (service.editFranchise(franchise)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "가맹점 정보가 성공적으로 수정되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "error", "text", "가맹점 정보가 수정되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }

    // 특정 가맹점 삭제 (비활성화)
    @PutMapping("delete/{franchiseKey}")
    public ResponseEntity<Map<String, Object>> delete(@PathVariable int franchiseKey) {
        if (service.deleteFranchise(franchiseKey)) {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "가맹점이 비활성화되었습니다.")));
        } else {
            return ResponseEntity.ok().body(Map.of("message", Map.of("type", "error", "text", "가맹점 비활성화에 실패하였습니다.")));
        }
    }
}