package com.example.backend.controller.commonCode;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.commonCode.ItemCommonCode;
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

    // 물품 공통 코드 1개의 정보 가져오기
    @GetMapping("item/view/{itemCommonCodeKey}")
    public List<ItemCommonCode> itemView(@PathVariable int itemCommonCodeKey) {
        return service.getItemCommonCodeView(itemCommonCodeKey);
    }

    // 물품 공통 코드 등록
    @PostMapping("item/add")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody ItemCommonCode itemCommonCode) {
        System.out.println(itemCommonCode);
        // 물품 공통 코드 입력 검증
        if (!service.validateItemCommonCode(itemCommonCode)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "물품 정보가 입력되지 않았습니다.")
            ));
        }

        // 중복 체크
        if (service.duplicateItemCommonCode(itemCommonCode.getItemCommonCode())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 등록된 물품입니다.")
            ));
        }

        // 물품 공통 코드 등록
        System.out.println(itemCommonCode);
        if (service.addItemCommonCode(itemCommonCode)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", itemCommonCode.getItemCommonCodeKey() + "번 물품이 등록되었습니다."),
                    "data", itemCommonCode
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "물품 등록이 실패하였습니다.")
            ));
        }
    }

    // 물품 공통 코드 리스트 조회
    @GetMapping("item/list")
    public List<ItemCommonCode> getItemCommonCode() {
        return service.getItemCommonCodeList();
    }

    @GetMapping("list")
    private List<CommonCode> list() {
        return service.selectAllList();
    }

    @PostMapping("add")
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
