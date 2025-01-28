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

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page) {
        Integer pageList = (page - 1) * 10;
        List<Stocktaking> list = mapper.list(searchType, searchKeyword, pageList);
        Integer count = mapper.count(searchType, searchKeyword);
        return Map.of("list", list, "count", count);
    }

    public Stocktaking view(Integer stocktakingKey) {
        return mapper.view(stocktakingKey);
    }

    public Boolean add(Stocktaking stocktaking) {
        return mapper.add(stocktaking) == 1;
    }
}
