package com.example.backend.controller.stock.stocktaking;

import com.example.backend.service.stock.stocktaking.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    final InventoryService service;

    @GetMapping("list")
    private Map<String, Object> list() {
        return service.getList();
    }
}
