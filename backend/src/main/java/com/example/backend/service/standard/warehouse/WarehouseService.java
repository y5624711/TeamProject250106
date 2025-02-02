package com.example.backend.service.standard.warehouse;

import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.warehouse.Warehouse;
import com.example.backend.mapper.standard.warehouse.WarehouseMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class WarehouseService {

    final WarehouseMapper mapper;

    //창고 등록
    public Boolean addWarehouse(Warehouse warehouse) {
        String whs = "WHS";

        // 0 또는 숫자 조회
        Integer maxNo = mapper.viewMaxWarehouseCode(whs);

        //  부족한 자리수 만큼  0 채우기
        String newNumber = String.format("%010d", (maxNo == null) ? 1 : maxNo + 1);

        String newWarehouseCode = whs + newNumber;
        warehouse.setWarehouseCode(newWarehouseCode);

        int count = mapper.addWarehouse(warehouse);
        return count == 1;
    }

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order, Boolean active) {

        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

        return Map.of("list", mapper.list(searchType, searchKeyword, pageList, sort, order, active), "count", mapper.countAllWarehouse(searchType, searchKeyword, active));
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
            case "warehouse_key":
                return "w.warehouse_key";
            case "warehouse_name":
                return "w.warehouse_name";
            case "customer_name":
                return "cus.customer_name";
            case "employee_name":
                return "e.employee_name";
            case "warehouse_state":
                return "w.warehouse_state";
            case "warehouse_city":
                return "w.warehouse_city";
            case "warehouse_tel":
                return "w.warehouse_tel";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Warehouse viewWarehouse(Integer warehouseKey) {
        return mapper.viewWarehouse(warehouseKey);
    }


    public Boolean edit(Warehouse warehouse) {
        return mapper.edit(warehouse) == 1;
    }

    public void delete(Integer warehouseKey) {
        mapper.delete(warehouseKey);
    }

    // 창고 정보가 다 입력됐는지 확인
    public Boolean validate(Warehouse warehouse) {
        return
                !(
                        warehouse.getCustomerCode() == null || warehouse.getCustomerCode().trim().isEmpty() ||
                                warehouse.getWarehouseName() == null || warehouse.getWarehouseName().trim().isEmpty() ||
                                warehouse.getCustomerEmployeeNo() == null || warehouse.getCustomerEmployeeNo().trim().isEmpty() ||
                                warehouse.getWarehouseAddress() == null || warehouse.getWarehouseAddress().trim().isEmpty() ||
                                warehouse.getWarehousePost() == null || warehouse.getWarehousePost().trim().isEmpty() ||
                                warehouse.getWarehouseState() == null || warehouse.getWarehouseState().trim().isEmpty() ||
                                warehouse.getWarehouseCity() == null || warehouse.getWarehouseCity().trim().isEmpty());
    }

    // 창고 중복 검증
    public boolean duplicate(Warehouse warehouse) {
        String warehouseAddress = warehouse.getWarehouseAddress();
        String warehouseAddressDetail = warehouse.getWarehouseAddressDetail();
        Integer check = mapper.checkWarehouse(warehouseAddress, warehouseAddressDetail);
        return check == 0;
    }

    // 협력업체 리스트 가져오기
    public List<Customer> getWarehouseCustomerList() {
        return mapper.getWarehouseCustomerList();
    }

    public List<Warehouse> getWarehouseEmployeeList(String customerCode) {
        return mapper.getWarehouseEmployeeList(customerCode);
    }
}
