package com.example.backend.controller.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import com.example.backend.service.warehouse.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/warehouse")
@RequiredArgsConstructor
public class WarehouseController {

    final WarehouseService service;

    @GetMapping("management")
    public Map<String, Object> list(Integer page) {
        return service.list();
    }

    @GetMapping("view/{warehouseKey}")
    public Warehouse view(@PathVariable Integer warehouseKey) {
        return service.view(warehouseKey);
    }
}
