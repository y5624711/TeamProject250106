package com.example.backend.controller.standard.item;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.service.standard.item.ItemService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item")
public class ItemController {

    final ItemService service;

    // 품목 수정하기
    @PutMapping("/edit/{itemKey}")
    public ResponseEntity<Map<String, Object>> editItem(@PathVariable int itemKey, @RequestBody Item item) {
        // 품목 입력 검증
        if (!service.validate(item)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 정보가 입력되지 않았습니다.")
            ));
        }


        if (service.editItem(itemKey, item)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "품목 정보를 수정하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "품목 수정 중 문제가 발생하였습니다..")));
        }
    }

    // 품목 삭제하기
    @PutMapping("/delete/{itemKey}")
    public ResponseEntity<Map<String, Object>> deleteItem(
            @PathVariable int itemKey) {
        // 이미 삭제된 품목인지 검증
        if (service.deletedItem(itemKey)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 삭제된 품목입니다.")
            ));
        }

        if (service.deleteItem(itemKey)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{itemKey}번 품목이 삭제되었습니다.")));

        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "품목 삭제 중 문제가 발생하였습니다.")));
        }
    }

    // 품목 1개의 정보 가져오기
    @GetMapping("view/{itemKey}")
    public List<Item> itemView(@PathVariable int itemKey) {
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

    // 품목 구분 코드 리스트 가져오기
    @GetMapping("commonCode")
    public List<Item> getItemCommonCode() {
        return service.getItemCommonCode();
    }

    // 품목 추가
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody Item item) {
        // 품목 입력 검증
        if (!service.validate(item)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 정보가 입력되지 않았습니다.")
            ));
        }

        // 중복 체크
        if (service.duplicate(item.getItemCommonCode())) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 등록된 품목입니다.")
            ));
        }

        // 품목 등록 시도
        if (service.addItem(item)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", item.getItemKey() + "번 품목이 등록되었습니다."),
                    "data", item
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "품목 등록이 실패하였습니다.")
            ));
        }
    }
}
