package com.example.backend.service.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import com.example.backend.mapper.warehouse.WarehouseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    final WarehouseMapper mapper;

    public Map<String, Object> list(String searchType, String searchKeyword) {
        List<Warehouse> list = mapper.list(searchType, searchKeyword);
        Integer count = list.size();

        return Map.of("list", list, "count", count);
    }

    public Warehouse view(Integer warehouseKey) {
        return mapper.view(warehouseKey);
    }

    public void add(Warehouse warehouse) {
        mapper.add(warehouse);
    }

    
}
