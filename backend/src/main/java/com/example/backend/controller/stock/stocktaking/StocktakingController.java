package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.dto.stock.stocktaking.StocktakingItem;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Set;

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
            if (service.checkAccess(stocktaking.getWarehouseCode(), auth)) {
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
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "권한이 없습니다.")
                ));

            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "작성에 실패했습니다.")));
        }

    }


    //    재고실사 반영하기
    @PostMapping("updateStock")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateStock(@RequestBody StocktakingItem stocktakingItem, Authentication auth) {
        try {
            if (service.checkAccess(stocktakingItem.getWarehouseCode(), auth)) {
                // TODO : validateUpdate 하기
                if (service.validateUpdate(stocktakingItem)) {
                    if (service.updateLocation(stocktakingItem)) {
                        return ResponseEntity.ok(Map.of("message",
                                Map.of("type", "success",
                                        "text", "실사 반영을 완료되었습니다.")));
                    } else {
                        return ResponseEntity.badRequest()
                                .body(Map.of("message",
                                        Map.of("type", "error",
                                                "text", "실사 반영 중 문제가 발생하였습니다..")));
                    }
                } else {
                    return ResponseEntity.badRequest().body(Map.of(
                            "message", Map.of("type", "error", "text", "정보를 모두 입력해주세요.")
                    ));
                }
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "권한이 없습니다.")
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "재고 반영에 실패했습니다.")));

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
    @GetMapping("count/{warehouseCode}")
    public Integer count(@PathVariable String warehouseCode) {
        return service.getStocktakingCountCurrent(warehouseCode);
    }

    //    row 값 불러오기
    @GetMapping("row/{warehouseCode}")
    public Set<String> rowList(@PathVariable String warehouseCode) {
        return service.getWarehouseRowList(warehouseCode);
    }

    //    col 값 불러오기
    @GetMapping("col/{warehouseCode}/{row}")
    public Set<String> colList(@PathVariable String warehouseCode, @PathVariable String row) {
        return service.getWarehouseColList(warehouseCode, row);
    }

    //    shelf 값 불러오기
    @GetMapping("shelf/{warehouseCode}/{row}/{col}")
    public Set<Integer> shelfList(@PathVariable String warehouseCode, @PathVariable String row, @PathVariable String col) {
        return service.getWarehouseShelfList(warehouseCode, row, col);
    }


    //        창고 코드와 실사 차이에 따른 필요 로케이션 불러오기
    @GetMapping("location/{warehouseCode}/{row}/{col}/{shelf}")
    public Integer location(@PathVariable String warehouseCode, @PathVariable String row, @PathVariable String col, @PathVariable Integer shelf) {
        return service.getStocktakingLocationList(warehouseCode, row, col, shelf);
    }

    @GetMapping("checkLocation/{locationKey}")
    public String checkLocation(@PathVariable Integer locationKey) {
        return service.getLocationValue(locationKey);
    }

}
