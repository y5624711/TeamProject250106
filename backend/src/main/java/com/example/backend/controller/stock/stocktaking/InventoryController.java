package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import com.example.backend.service.stock.stocktaking.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/inventory")
@RequiredArgsConstructor
public class InventoryController {
    final InventoryService service;

    @GetMapping("list")
    public Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sortColum", defaultValue = "") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "") String sortOrder) {

        System.out.println("sortColum = " + sortColum);
        System.out.println("sortOrder = " + sortOrder);

        return service.getList(page, type, keyword, sortColum, sortOrder);
    }

    @GetMapping("graphList")
    public List<Inventory> graphList() {

        return service.getGraphList();
    }
}
