package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/stocktaking")
@RequiredArgsConstructor
public class StocktakingController {

    final StocktakingService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword,
                                    @RequestParam(value = "sort", defaultValue = "") String sort,
                                    @RequestParam(value = "order", defaultValue = "") String order) {
        return service.list(searchType, searchKeyword, page, sort, order);
    }

    @GetMapping("view/{stocktakingKey}")
    public Stocktaking view(@PathVariable Integer stocktakingKey) {
        return service.view(stocktakingKey);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Stocktaking stocktaking) {
        try {
            // 실사 입력 검증
            if (service.validate(stocktaking)) {
                if (service.add(stocktaking)) {
                    return ResponseEntity.ok(Map.of("message",
                            Map.of("type", "success",
                                    "text", "실사를 등록하였습니다.")));
                } else {
                    return ResponseEntity.badRequest()
                            .body(Map.of("message",
                                    Map.of("type", "error",
                                            "text", "실사 등록 중 문제가 발생하였습니다..")));
                }
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "정보를 모두 입력해주세요.")
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "작성에 실패했습니다.")));
        }

    }

    @GetMapping("warehouse")
    public List<Stocktaking> warehouseList() {
        return service.getStocktakingWarehouseList();
    }

    @GetMapping("item/{warehouseCode}")
    public List<Stocktaking> itemList(@PathVariable String warehouseCode) {
        return service.getStocktakingItemList(warehouseCode);
    }
}
