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

    public void add(Location location) {
        mapper.add(location);
    }

    public Location view(Integer locationKey) {
        return mapper.view(locationKey);
    }

    public void edit(Location location) {
        mapper.edit(location);
    }

    public List<Location> getLocationWarehouseList() {
        return mapper.getLocationWarehouseList();
    }
}
