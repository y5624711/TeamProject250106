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


    public Map<String, Object> getList(Integer page, String type, String keyword, String sortColum, String sortOrder) {
        int offset = (page - 1) * 10;

        return Map.of("list", mapper.selectList(offset, type, keyword), "count", mapper.countAll(type, keyword));
    }
}
