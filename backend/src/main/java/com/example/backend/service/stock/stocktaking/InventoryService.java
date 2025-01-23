package com.example.backend.service.stock.stocktaking;

import com.example.backend.mapper.stock.stocktaking.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InventoryService {
    final InventoryMapper mapper;


    public Map<String, Object> getList() {
        return Map.of("list", mapper.selectList(), "count", "");
    }
}
