package com.example.backend.controller.stock.stocktaking;

import com.example.backend.service.stock.stocktaking.InventoryService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sortColum", defaultValue = "") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "") String sortOrder,
            Authentication auth) {

        return service.getList(page, type, keyword, sortColum, sortOrder, auth);
    }

//    @GetMapping("graphList")
//    public List<Inventory> graphList() {
//
//        return service.getGraphList();
//    }
}
