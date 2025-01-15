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

    // 물품 공통 코드 리스트 조회
    @GetMapping("item/list")
    public List<ItemCommonCode> getItemCommonCode() {
        return service.getItemCommonCodeList();
    }

    // 물품 공통 코드 등록하기
//    @PostMapping("item/add")
//    private ResponseEntity<Map<String, Object>> addItemCommonCode(@RequestBody ItemCommonCode itemCommonCode) {
//        if (service.validateItemCode(itemCommonCode)) {
//            if (service.addItemCommonCode(itemCommonCode)) {
//                return ResponseEntity.ok().body(Map.of("message",
//                        Map.of("type", "success", "text", "물품 코드가 등록 되었습니다.")));
//            } else {
//                return ResponseEntity.internalServerError().body(Map.of("message",
//                        Map.of("type", "error", "text", "물품 코드 등록 중 문제가 발생하였습니다.")));
//            }
//        } else {
//            return ResponseEntity.badRequest().body(
//                    Map.of("message",
//                            Map.of("type", "warning", "text", "내용을 입력해 주세요")));
//        }
//    }

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
