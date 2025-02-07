package com.example.backend.controller.standard.item;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.service.standard.item.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@Transactional
@RequiredArgsConstructor
@RequestMapping("/api/item")
public class ItemController {

    final ItemService service;

    // 품목 수정하기
    @PutMapping("/edit/{itemKey}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> editItem(@PathVariable int itemKey, @RequestBody Item item, Authentication authentication) {

        String userId = authentication.getName();
        if (userId.startsWith("BIZ")) {
            // 품목 입력 검증
            if (!service.validate(item)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")
                ));
            }

            if (service.editItem(itemKey, item)) {
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


    // 품목 1개의 정보 가져오기
    @GetMapping("view/{itemKey}")
    public Item itemView(@PathVariable int itemKey) {
        return service.getItemView(itemKey);
    }

    // 품목 전체 리스트 가져오기
    @GetMapping("list")
    public Map<String, Object> getItemlist(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "") String sort,
            @RequestParam(value = "order", defaultValue = "") String order
    ) {
        // type, keyword, sort, order 을 db의 컬럼명으로 변경
        return service.getItemList(page, active, type, keyword, sort, order);
    }

    // 품목 구분 코드, 담당 업체 리스트 가져오기
    @GetMapping("commonCode")
    public List<Item> getItemCommonCode() {
        return service.getItemCommonCode();
    }

    // 품목 등록
    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody Item item, Authentication authentication) {

        String userId = authentication.getName();
        if (userId.startsWith("BIZ")) {
            // 품목 입력 검증
            if (!service.validate(item)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")
                ));
            }

            // 중복 체크
            if (service.duplicate(item.getItemCommonCode())) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "중복된 항목이 존재합니다.")
                ));
            }

            // 품목 등록 시도
            if (service.addItem(item)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success",
                                "text", "등록되었습니다."),
                        "data", item
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
}
