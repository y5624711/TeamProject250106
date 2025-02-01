package com.example.backend.service.standard.location;

import com.example.backend.dto.standard.location.Location;
import com.example.backend.mapper.standard.location.LocationMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class LocationService {

    final LocationMapper mapper;

    public Map<String, Object> list(String searchType, String searchKeyword, Integer page, String sort, String order) {

        Integer pageList = (page - 1) * 10;
        sort = resolveType(toSnakeCase(sort));

        return Map.of("list", mapper.list(searchType, searchKeyword, pageList, sort, order), "count", mapper.countAllLocation(searchType, searchKeyword));
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
            case "warehouse_name":
                return "w.warehouse_name";
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
        return mapper.view(locationKey);
    }

    public Boolean edit(Location location) {
        return mapper.edit(location) == 1;
    }

    public List<Location> getLocationWarehouseList() {
        return mapper.getLocationWarehouseList();
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
        System.out.println(warehouseCode);
        String row = location.getRow();
        String col = location.getCol();
        Integer shelf = location.getShelf();
        Integer check = mapper.checkLocation(warehouseCode, row, col, shelf);
        return check == 0;
    }
}
