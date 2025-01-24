package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
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
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword) {
        return service.list(searchType, searchKeyword, page);
    }

    @GetMapping("view/{stocktakingKey}")
    public Stocktaking view(@PathVariable Integer stocktakingKey) {
        return service.view(stocktakingKey);
    }
}
