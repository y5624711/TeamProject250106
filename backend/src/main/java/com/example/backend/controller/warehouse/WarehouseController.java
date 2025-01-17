package com.example.backend.controller.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import com.example.backend.service.warehouse.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/warehouse")
@RequiredArgsConstructor
public class WarehouseController {

    final WarehouseService service;

    @GetMapping("management")
    public Map<String, Object> list(@RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword) {

        System.out.println(searchType);
        System.out.println(searchKeyword);
        return service.list();
    }

    @GetMapping("view/{warehouseKey}")
    public Warehouse view(@PathVariable Integer warehouseKey) {
        return service.view(warehouseKey);
    }

    @PostMapping("add")
    public void add(@RequestBody Warehouse warehouse) {
        service.add(warehouse);
        System.out.println(warehouse);
    }
}
