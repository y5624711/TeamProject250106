package com.example.backend.controller.item;

import com.example.backend.dto.item.Item;
import com.example.backend.service.item.ItemService;
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

    // 물품 수정하기
    @PutMapping("/edit/{itemKey}")
    public ResponseEntity<Map<String, Object>> editItem(@PathVariable int itemKey, @RequestBody Item item) {
        if (service.editItem(itemKey, item)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "물품 정보를 수정하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "물품 수정 중 문제가 발생하였습니다..")));
        }
    }

    // 물품 삭제하기
    @PutMapping("/delete/{itemKey}")
    public ResponseEntity<Map<String, Object>> deleteItem(
            @PathVariable int itemKey) {
        if (service.deleteItem(itemKey)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{itemKey}번 물품이 삭제되었습니다.")));

        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "물품 삭제 중 문제가 발생하였습니다.")));
        }
    }

    // 물품 1개의 정보 가져오기
    @GetMapping("view/{itemKey}")
    public List<Item> itemView(@PathVariable int itemKey) {
        return service.getItemView(itemKey);
    }

    // 물품 전체 리스트 가져오기
    @GetMapping("list")
    public List<Item> getItemlist() {
        return service.getItemList();
    }

    // 물품을 취급하는 협력업체 이름 가져오기
    @GetMapping("customer/{itemCommonCode}")
    public List<Item> getCustomerName(@PathVariable String itemCommonCode) {
        return service.getCustomerName(itemCommonCode);
    }

    // 물품 구분 코드 리스트 가져오기
    @GetMapping("commonCode")
    public List<Map<String, String>> getItemCommonCode() {
        return service.getItemCommonCode();
    }

    // 물품 추가
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody Item item) {
        System.out.println(item);
        if (service.validate(item)) {
            if (service.addItem(item)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success",
                                "text", STR."\{item.getItemKey()}번 물품이 등록되었습니다."),
                        "data", item));
            } else {
                return ResponseEntity.internalServerError()
                        .body(Map.of("message", Map.of("type", "error",
                                "text", "물품 등록이 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "물품 정보가 입력되지 않았습니다.")));
        }
    }

}
