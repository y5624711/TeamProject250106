package com.example.backend.controller.branch;

import com.example.backend.dto.branch.Branch;
import com.example.backend.service.branch.BranchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/branch")
public class BranchController {

    final BranchService service;

    @PostMapping("/add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Branch branch) {
        if (service.validate(branch)) {
            if (service.add(branch)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success", "text", "가맹점이 등록되었습니다.")));
            } else {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "warning", "text", "가맹점 등록에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of("type", "error", "text", "입력된 데이터가 유효하지 않습니다.")));
        }
    }
}
