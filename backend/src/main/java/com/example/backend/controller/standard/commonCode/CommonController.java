package com.example.backend.controller.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.service.standard.commonCode.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/commonCode")
@RequiredArgsConstructor
public class CommonController {
    final CommonService service;

    // 공통 코드 수정
    @PutMapping("edit/{commonCodeKey}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> editCommonCode(@PathVariable int commonCodeKey, @RequestBody CommonCode commonCode, Authentication authentication) {

        String userId = authentication.getName();
        if (userId.startsWith("BIZ")) {
            // 공통 코드 입력 검증
            if (!service.validateCommonCode(commonCode)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")
                ));
            }

            if (service.editCommonCode(commonCodeKey, commonCode)) {
                return ResponseEntity.ok(Map.of("message",
                        Map.of("type", "success",
                                "text", "저장되었습니다.")));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "저장에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", Map.of("type", "error", "text", "저장 권한이 없습니다.")));
        }
    }

    // 공통 코드 1개의 정보 가져오기
    @GetMapping("view/{commonCodeKey}")
    public CommonCode getCommonCodeView(@PathVariable int commonCodeKey) {
        return service.getCommonCodeView(commonCodeKey);
    }

    // 공통 코드 등록
    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> addCommonCode(@RequestBody CommonCode commonCode, Authentication authentication) {

        String userId = authentication.getName();

        if (userId.startsWith("BIZ")) {
            // 공통 코드 입력 검증
            if (!service.validateCommonCode(commonCode)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")
                ));
            }
            // 중복 체크
            if (service.duplicateCommonCode(commonCode.getCommonCode(), commonCode.getCommonCodeName())) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "중복된 항목이 존재합니다.")
                ));
            }
            // 공통 코드 등록
            if (service.addCommonCode(commonCode)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success",
                                "text", "등록되었습니다."),
                        "data", commonCode
                ));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "등록에 실패하였습니다.")
                ));
            }
        } else {
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(Map.of("message", Map.of("type", "error", "text", "등록 권한이 없습니다.")));
        }
    }

    // 공통 코드 리스트 조회
    @GetMapping("list")
    public Map<String, Object> getCommonCodeList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "filter", defaultValue = "all") String filter,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return service.getCommonCodeList(page, active, sort, order, type, keyword, filter);
    }
}
