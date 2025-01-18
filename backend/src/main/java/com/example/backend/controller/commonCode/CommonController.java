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

    @PutMapping("item/edit/{itemCommonCodeKey}")
    public ResponseEntity<Map<String, Object>> editItemCommonCode(@PathVariable int itemCommonCodeKey, @RequestBody ItemCommonCode itemCommonCode) {

        // 품목 공통 코드 입력 검증
        if (!service.validateItemCommonCode(itemCommonCode)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 정보가 입력되지 않았습니다.")
            ));
        }

        if (service.editItemCommonCode(itemCommonCodeKey, itemCommonCode)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "품목 공통 코드 정보를 수정하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "품목 공통 코드 수정 중 문제가 발생하였습니다..")));
        }
    }

    // 품목 공통 코드 삭제하기
    @PutMapping("item/delete/{itemCommonCodeKey}")
    public ResponseEntity<Map<String, Object>> deleteItemCommonCode(
            @PathVariable int itemCommonCodeKey) {
        if (service.deleteItemCommonCode(itemCommonCodeKey)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{itemCommonCodeKey}번 품목 공통 코드가 삭제되었습니다.")));

        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "품목 공통 코드 삭제 중 문제가 발생하였습니다.")));
        }
    }

    // 품목 공통 코드 1개의 정보 가져오기
    @GetMapping("item/view/{itemCommonCodeKey}")
    public List<ItemCommonCode> getItemCommonCodeView(@PathVariable int itemCommonCodeKey) {
        return service.getItemCommonCodeView(itemCommonCodeKey);
    }

    // 품목 공통 코드 등록
    @PostMapping("item/add")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody ItemCommonCode itemCommonCode) {
        System.out.println(itemCommonCode);
        // 품목 공통 코드 입력 검증
        if (!service.validateItemCommonCode(itemCommonCode)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 정보가 입력되지 않았습니다.")
            ));
        }

        // 중복 체크
        if (service.duplicateItemCommonCode(itemCommonCode.getItemCommonCode(), itemCommonCode.getItemCommonName())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 등록된 품목 공통 코드입니다.")
            ));
        }

        // 품목 공통 코드 등록
        System.out.println(itemCommonCode);
        if (service.addItemCommonCode(itemCommonCode)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", itemCommonCode.getItemCommonCodeKey() + "번 품목 공통 코드가 등록되었습니다."),
                    "data", itemCommonCode
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 등록이 실패하였습니다.")
            ));
        }
    }

    // 품목 공통 코드 리스트 조회
    @GetMapping("item/list")
    public Map<String, Object> getItemCommonCodeList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "active", defaultValue = "1") Integer active,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return service.getItemCommonCodeList(page, active, sort, order, type, keyword);
    }

    @GetMapping("system/list")
    private Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                     @RequestParam(value = "type", defaultValue = "number") String type,
                                     @RequestParam(value = "keyword", defaultValue = "") String keyword,
                                     @RequestParam(value = "sort", defaultValue = "common_code_key") String sort,
                                     @RequestParam(value = "order", defaultValue = "desc") String order,
                                     @RequestParam(value = "active", defaultValue = "false") Integer active) {
        
        return service.selectSystemCommonCodeList(page, type, keyword, sort, order, active);
    }

    @PostMapping("system/add")
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
