package com.example.backend.service.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class StocktakingService {

    final StocktakingMapper mapper;

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order) {
        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

        return Map.of("list", mapper.list(searchType, searchKeyword, pageList, sort, order), "count", mapper.count(searchType, searchKeyword));
    }

    // camelCase를 snake_case로 변환하는 로직
    private String toSnakeCase(String camelCase) {
        if (camelCase == null || camelCase.isEmpty()) {
            return camelCase; // null 이거나 빈 문자열은 그대로 반환
        }
        return camelCase
                .replaceAll("([a-z])([A-Z])", "$1_$2") // 소문자 뒤 대문자에 언더스코어 추가
                .toLowerCase(); // 전체를 소문자로 변환
    }

    // type 값에 따라 해당하는 SQL 필드명으로 변경
    private String resolveType(String type) {
        if (type == null || type.isEmpty() || type.equals("all")) {
            return null;
        }
        switch (type) {
            case "stocktaking_key":
                return "s.stocktaking_key";
            case "item_common_name":
                return "itcm.item_common_name";
            case "customer_name":
                return "cus.customer_name";
            case "count_current":
                return "s.count_current";
            case "count_configuration":
                return "s.count_configuration";
            case "count_difference":
                return "s.count_difference";
            case "warehouse_name":
                return "w.warehouse_name";
            case "stocktaking_type":
                return "s.stocktaking_type";
            case "customer_employee_name":
                return "e.employee_name";
            case "stocktaking_date":
                return "s.stocktaking_date";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Stocktaking view(Integer stocktakingKey) {
        return mapper.view(stocktakingKey);
    }

    public Boolean add(Stocktaking stocktaking) {
        stocktaking.setStocktakingDate(LocalDateTime.now());

        return mapper.add(stocktaking) == 1;
    }

    public List<Stocktaking> getStocktakingWarehouseList() {
        return mapper.getStocktakingWarehouseList();
    }

    public List<Stocktaking> getStocktakingItemList(String warehouseCode) {
        return mapper.getStocktakingItemList(warehouseCode);
    }

    public Boolean validate(Stocktaking stocktaking) {
        return
                !(
                        stocktaking.getWarehouseCode() == null || stocktaking.getWarehouseCode().trim().isEmpty() ||
                                stocktaking.getItemCode() == null || stocktaking.getItemCode().trim().isEmpty() ||
                                stocktaking.getCountCurrent() == null ||
                                stocktaking.getCountConfiguration() == null ||
                                stocktaking.getStocktakingType() == null ||
                                stocktaking.getCustomerEmployeeNo() == null || stocktaking.getCustomerEmployeeNo().trim().isEmpty());
    }
}
