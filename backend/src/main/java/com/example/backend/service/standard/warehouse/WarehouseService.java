package com.example.backend.service.standard.warehouse;

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

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page) {
        Integer pageList = (page - 1) * 10;
        List<Warehouse> list = mapper.list(searchType, searchKeyword, pageList);
        Integer countWarehouse = mapper.countAllWarehouse(searchType, searchKeyword);

        return Map.of("list", list, "count", countWarehouse);
    }

    public Warehouse viewWarehouse(Integer warehouseKey) {
        return mapper.viewWarehouse(warehouseKey);
    }


    public void edit(Warehouse warehouse) {
        mapper.edit(warehouse);
    }

    public void delete(Integer warehouseKey) {
        mapper.delete(warehouseKey);
    }

    // 창고 정보가 다 입력됐는지 확인
    public boolean validate(Warehouse warehouse) {
        return !(
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
        return check == 1;
    }
}
