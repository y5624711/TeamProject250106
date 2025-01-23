package com.example.backend.controller.standard.commonCode;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.service.standard.commonCode.CommonService;
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

    @PutMapping("edit/{commonCodeKey}")
    public ResponseEntity<Map<String, Object>> editCommonCode(@PathVariable int commonCodeKey, @RequestBody CommonCode commonCode) {

        System.out.println("commonCode = " + commonCode);
        // 품목 공통 코드 입력 검증
        if (!service.validateCommonCode(commonCode)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 정보가 입력되지 않았습니다.")
            ));
        }

        if (service.editCommonCode(commonCodeKey, commonCode)) {
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
    @PutMapping("delete/{commonCodeKey}")
    public ResponseEntity<Map<String, Object>> deleteCommonCode(
            @PathVariable int commonCodeKey) {
        // 이미 삭제된 품목 공통 코드인지 검증
        if (service.deletedCommonCode(commonCodeKey)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 삭제된 품목 공통 코드 입니다.")
            ));
        }

        if (service.deleteCommonCode(commonCodeKey)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{commonCodeKey}번 품목 공통 코드가 삭제되었습니다.")));

        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "품목 공통 코드 삭제 중 문제가 발생하였습니다.")));
        }
    }

    // 품목 공통 코드 1개의 정보 가져오기
    @GetMapping("view/{commonCodeKey}")
    public List<CommonCode> getCommonCodeView(@PathVariable int commonCodeKey) {
        return service.getCommonCodeView(commonCodeKey);
    }

    // 품목 공통 코드 등록
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addCommonCode(@RequestBody CommonCode commonCode) {
        System.out.println(commonCode);
        // 품목 공통 코드 입력 검증
        if (!service.validateCommonCode(commonCode)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 정보가 입력되지 않았습니다.")
            ));
        }
        // 중복 체크
        if (service.duplicateCommonCode(commonCode.getCommonCode(), commonCode.getCommonCodeName())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 등록된 품목 공통 코드입니다.")
            ));
        }
        // 품목 공통 코드 등록
        System.out.println(commonCode);
        if (service.addCommonCode(commonCode)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", commonCode.getCommonCodeKey() + "번 품목 공통 코드가 등록되었습니다."),
                    "data", commonCode
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 공통 코드 등록이 실패하였습니다.")
            ));
        }
    }

    // 품목 공통 코드 리스트 조회
    @GetMapping("list")
    public Map<String, Object> getCommonCodeList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return service.getCommonCodeList(page, active, sort, order, type, keyword);
    }
}
