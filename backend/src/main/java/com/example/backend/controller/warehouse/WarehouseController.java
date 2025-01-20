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

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword,
                                    @RequestParam(value = "active", defaultValue = "false") boolean searchActive) {
        return service.list(searchType, searchKeyword, searchActive);
    }

    @GetMapping("view/{warehouseKey}")
    public Warehouse view(@PathVariable Integer warehouseKey) {
        return service.view(warehouseKey);
    }

    @PostMapping("add")
    public void add(@RequestBody Warehouse warehouse) {
        service.add(warehouse);
    }

    @PutMapping("edit")
    public void edit(@RequestBody Warehouse warehouse) {
        service.edit(warehouse);
    }

    @DeleteMapping("delete/{warehouseKey}")
    public void delete(@PathVariable Integer warehouseKey) {
        service.delete(warehouseKey);
    }
}
