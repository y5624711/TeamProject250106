package com.example.backend.service.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import com.example.backend.mapper.stock.stocktaking.InventoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class InventoryService {
    final InventoryMapper mapper;


    public Map<String, Object> getList(Integer page,
                                       String type,
                                       String keyword,
                                       String sortColum,
                                       String sortOrder, Authentication auth) {
        int offset = (page - 1) * 10;

        String slice = auth.getName().substring(0, 3);
        System.out.println("slice = " + slice);
        
        String customerCode = mapper.selectCustomerCode(auth.getName());

        String warehouseCode = mapper.SelectWarehouseCodeByCustomerCode(customerCode);

        return Map.of("list", mapper.selectList(offset, type, keyword, sortColum, sortOrder, slice, warehouseCode),
                "count", mapper.countAll(type, keyword, slice, warehouseCode));
    }

    public List<Inventory> getGraphList() {

        return mapper.selectGraphList();
    }
}
