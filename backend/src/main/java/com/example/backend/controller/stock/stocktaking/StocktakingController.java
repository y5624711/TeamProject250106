package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
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
                                    @RequestParam(value = "order", defaultValue = "") String order,
                                    Authentication auth) {
        return service.list(searchType, searchKeyword, page, sort, order, auth);
    }

    @GetMapping("view/{stocktakingKey}")
    public Stocktaking view(@PathVariable Integer stocktakingKey) {
        return service.view(stocktakingKey);
    }

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Stocktaking stocktaking, Authentication auth) {
        try {
            // 실사 입력 검증
            if (service.validate(stocktaking, auth)) {
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

    // 창고 목록 불러오기
    @GetMapping("warehouse")
    public List<Stocktaking> warehouseList(Authentication auth) {
        return service.getStocktakingWarehouseList(auth);
    }

    //    아이템 목록 불러오기
    @GetMapping("item/{warehouseCode}")
    public List<Stocktaking> itemList(@PathVariable String warehouseCode) {
        return service.getStocktakingItemList(warehouseCode);
    }

    //    전산 수량 불러오기
    @GetMapping("count/{warehouseCode}/{itemCode}")
    public Integer count(@PathVariable String warehouseCode, @PathVariable String itemCode) {
        return service.getStocktakingCountCurrent(warehouseCode, itemCode);
    }

    //    창고 코드와 실사 차이에 따른 필요 로케이션 불러오기
    @GetMapping("location/{warehouseCode}/{difference}")
    public List<Integer> locationList(@PathVariable String warehouseCode, @PathVariable String difference) {
        return service.getStocktakingLocationList(warehouseCode, difference);
    }

}
