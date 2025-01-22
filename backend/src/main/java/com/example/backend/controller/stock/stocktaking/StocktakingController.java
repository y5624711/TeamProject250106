package com.example.backend.controller.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.service.stock.stocktaking.StocktakingService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/stocktaking")
@RequiredArgsConstructor
public class StocktakingController {

    final StocktakingService service;

    @GetMapping("list")
    public Map<String, Object> list() {
        return service.list();
    }

    @GetMapping("view/{stocktakingKey}")
    public Stocktaking view(@PathVariable Integer stocktakingKey) {
        return service.view(stocktakingKey);
    }
}
