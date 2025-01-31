package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

        service.add(stocktaking);

        return null;
    }
}
