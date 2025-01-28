package com.example.backend.controller.standard.warehouse;

import com.example.backend.dto.standard.warehouse.Warehouse;
import com.example.backend.service.standard.warehouse.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/warehouse")
@RequiredArgsConstructor
public class WarehouseController {

    final WarehouseService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword) {
        return service.list(searchType, searchKeyword, page);
    }

    @GetMapping("view/{warehouseKey}")
    public Warehouse view(@PathVariable Integer warehouseKey) {
        return service.view(warehouseKey);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Warehouse warehouse) {

        // 창고 입력 검증
        if (!service.validate(warehouse)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "정보를 모두 입력해주세요.")
            ));
        }

        // 중복 체크
        if (service.duplicate(warehouse)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 등록된 창고입니다.")
            ));
        }

//        창고 등록 시도
        if (service.add(warehouse)) {
            return ResponseEntity.ok().body(Map.of(
                    "message", Map.of("type", "success",
                            "text", warehouse.getWarehouseKey() + "번 창고가 등록되었습니다."),
                    "data", warehouse
            ));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "창고 등록이 실패하였습니다.")
            ));
        }

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
