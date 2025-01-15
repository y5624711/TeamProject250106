package com.example.backend.service.warehouse;

import com.example.backend.mapper.warehouse.WarehouseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    final WarehouseMapper mapper;

    public Map<String, Object> list() {
        mapper.listUp();

        return null;
    }
}
