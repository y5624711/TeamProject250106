package com.example.backend.controller.standard.location;


import com.example.backend.dto.standard.location.Location;
import com.example.backend.service.standard.location.LocationService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/location")
@RequiredArgsConstructor
public class LocationController {

    final LocationService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword,
                                    @RequestParam(value = "sort", defaultValue = "") String sort,
                                    @RequestParam(value = "order", defaultValue = "") String order) {
        return service.list(searchType, searchKeyword, page, sort, order);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> add(@RequestBody Location location) {
        try {
            // 로케이션 입력 검증
            if (service.validate(location)) {
                // 중복 체크
                if (service.duplicate(location)) {
//        로케이션 등록 시도
                    if (service.add(location)) {
                        return ResponseEntity.ok().body(Map.of(
                                "message", Map.of("type", "success",
                                        "text", location.getWarehouseName() + " 창고에 로케이션이 등록되었습니다."),
                                "data", location
                        ));
                    } else {
                        return ResponseEntity.internalServerError().body(Map.of(
                                "message", Map.of("type", "error", "text", "로케이션 등록이 실패하였습니다.")
                        ));
                    }
                } else {
                    return ResponseEntity.badRequest().body(Map.of(
                            "message", Map.of("type", "error", "text", "이미 등록된 로케이션입니다.")
                    ));
                }
            } else {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "정보를 모두 입력해주세요.")
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "작성에 실패했습니다.")));
        }


    }

    @GetMapping("view/{locationKey}")
    public Location view(@PathVariable Integer locationKey) {
        return service.view(locationKey);
    }

    @PutMapping("edit")
    public ResponseEntity<Map<String, Object>> edit(@RequestBody Location location) {
        try {
            if (service.edit(location)) {
                return ResponseEntity.ok().body(Map.of(
                        "message", Map.of("type", "success",
                                "text", "로케이션이 수정되었습니다."),
                        "data", location
                ));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "로케이션 수정에 실패하였습니다.")
                ));
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", "수정에 실패했습니다.")));
        }

    }

    //    창고 정보 컬렉션으로 불러오기
    @GetMapping("warehouse")
    public List<Location> warehouseList() {
        return service.getLocationWarehouseList();
    }
}
