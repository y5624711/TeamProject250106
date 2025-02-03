package com.example.backend.service.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import com.example.backend.mapper.stock.inoutHistory.InoutHistoryMapper;
import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
@RequiredArgsConstructor
public class InoutHistoryService {

    final InoutHistoryMapper mapper;
    final StocktakingMapper stocktakingMapper;

    public Map<String, Object> list(Integer page, String searchKeyword, String searchType, String sort, String order, String state, Authentication auth) {
        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

//        로그인한 정보로 일터 코드 가져오기
        String workplaceCode = stocktakingMapper.getWorkplaceCode(auth.getName());
//        BIZ 인지, CUS 인지 확인하는 용도
        String workplace = workplaceCode.substring(0, 3);

        return Map.of("list", mapper.list(pageList, searchKeyword, searchType, sort, order, state, workplaceCode, workplace), "count", mapper.count(searchKeyword, searchType, state, workplaceCode, workplace));
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
            case "inout_history_key":
                return "h.inout_history_key";
            case "inout_common_code":
                return "h.inout_common_code";
            case "item_name":
                return "itcm.common_code_name";
            case "serial_no":
                return "h.serial_no";
            case "customer_name":
                return "cus.customer_name";
            case "warehouse_name":
                return "w.warehouse_name";
            case "franchise_name":
                return "fr.franchise_name";
            case "business_employee_name":
                return "bizemp.employee_name";
            case "customer_employee_name":
                return "cusemp.employee_name";
            case "inout_history_date":
                return "h.inout_history_date";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public void add(InoutHistory InoutHistory) {
        mapper.add(InoutHistory);
    }

    public InoutHistory view(Integer inoutHistoryKey) {
        return mapper.view(inoutHistoryKey);
    }
}
