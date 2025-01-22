package com.example.backend.service.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StocktakingService {

    final StocktakingMapper mapper;

    public Map<String, Object> list() {
        List<Stocktaking> list = mapper.list();

        return Map.of("list", list);
    }

    public Stocktaking view(Integer stocktakingKey) {
        return mapper.view(stocktakingKey);
    }
}
