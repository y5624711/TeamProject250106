package com.example.backend.controller.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.service.commonCode.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/commonCode")
@RequiredArgsConstructor
public class CommonController {
    final CommonService service;

    @GetMapping("/system/list")
    private List<CommonCode> list() {
        return service.selectAllList();
    }

    @PostMapping("/system/add")
    private ResponseEntity<Map<String, Object>> addCommon(@RequestBody CommonCode commonCode) {
        if (service.validate(commonCode)) {
            if (service.addCommonCode(commonCode)) {
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
