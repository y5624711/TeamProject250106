package com.example.backend.controller.stock.stocktaking;

import com.example.backend.service.stock.stocktaking.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    final InventoryService service;

    @GetMapping("list")
    private Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sortColum", defaultValue = "item_current_key") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        System.out.println("type = " + type);
        System.out.println("keyword = " + keyword);

        return service.getList(page, type, keyword, sortColum, sortOrder);
    }
}
