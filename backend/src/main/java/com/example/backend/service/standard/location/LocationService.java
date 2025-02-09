package com.example.backend.service.standard.location;

import com.example.backend.dto.standard.location.Location;
import com.example.backend.mapper.standard.location.LocationMapper;
import com.example.backend.mapper.stock.stocktaking.StocktakingMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class LocationService {

    final LocationMapper mapper;
    final StocktakingMapper stocktakingMapper;

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order, Authentication auth, Boolean active) {

        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

        String workplaceCode = stocktakingMapper.getWorkplaceCode(auth.getName());
        String workplace = workplaceCode.substring(0, 3);

        return Map.of("list", mapper.list(searchType, searchKeyword, pageList, sort, order, workplaceCode, workplace, active),
                "count", mapper.countAllLocation(searchType, searchKeyword, workplaceCode, workplace, active));
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
            case "location_key":
                return "l.location_key";
            case "customer_name":
                return "cu.customer_name";
            case "warehouse_name":
                return "w.warehouse_name";
            case "item_name":
                return "sys.common_code_name";
            case "row":
                return "l.row";
            case "col":
                return "l.col";
            case "shelf":
                return "l.shelf";
            case "located":
                return "l.located";
            case "location_note":
                return "l.location_note";
            default:
                throw new IllegalArgumentException("Invalid type: " + type);
        }
    }

    public Boolean add(Location location) {

        return mapper.add(location) == 1;

    }

    public Location view(Integer locationKey) {
        Location location = mapper.view(locationKey);

        if (!location.getLocated()) {
            System.out.println(location);
            return location;
        } else {
            String serial = mapper.findSerialNo(locationKey);
            location.setSerialNo(serial);
            System.out.println(location);
            return location;
        }
    }

    public Boolean edit(Location location) {
        return mapper.edit(location) == 1;
    }

    public List<Location> getLocationWarehouseList(Authentication auth) {

        String workplaceCode = stocktakingMapper.getWorkplaceCode(auth.getName());
        String workplace = workplaceCode.substring(0, 3);

        return mapper.getLocationWarehouseList(workplaceCode, workplace);
    }

    // 로케이션 정보가 다 입력됐는지 확인
    public Boolean validate(Location location) {
        return
                !(
                        location.getWarehouseCode() == null || location.getWarehouseCode().trim().isEmpty() ||
                                location.getRow() == null || location.getRow().trim().isEmpty() ||
                                location.getCol() == null || location.getCol().trim().isEmpty() ||
                                location.getShelf() == null || location.getShelf() == 0);
    }

    // 로케이션 중복 검증
    public boolean duplicate(Location location) {

        String warehouseCode = location.getWarehouseCode();
        String row = location.getRow();
        String col = location.getCol();

        String warehouseName = mapper.getWarehouseName(location.getWarehouseCode());

        location.setWarehouseName(warehouseName);
//
        if (row.length() == 1) {
            location.setRow("0" + row);
        }
        if (col.length() == 1) {
            location.setCol("0" + col);
        }
//


        Integer shelf = location.getShelf();
        Integer check = mapper.checkLocation(warehouseCode, location.getRow(), location.getCol(), shelf);
        return check == 0;
    }
}
