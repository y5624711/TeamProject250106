package com.example.backend.controller.item;

import com.example.backend.dto.item.Item;
import com.example.backend.service.item.ItemService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/item")
public class ItemController {

    final ItemService service;

//    // 물품 1개의 정보 가져오기
//    @GetMapping("view/{itemId}")
//    public Item itemView(@PathVariable int itemId) {
//        return service.getItemView(itemId);
//    }

    // 물품 리스트 가져오기
    @GetMapping("list")
    public List<Item> getItemlist() {
        return service.getItemList();
    }

    // 물품 추가
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addItem(@RequestBody Item item) {
        if (service.validate(item)) {
            if (service.addItem(item)) {
                return ResponseEntity.ok().body(Map.of("message", Map.of("type", "success",
                                "text", STR."\{item.getItemId()}번 물품이 등록되었습니다."),
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
