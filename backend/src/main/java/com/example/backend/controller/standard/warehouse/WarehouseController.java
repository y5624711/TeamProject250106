package com.example.backend.controller.standard.warehouse;

import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.warehouse.Warehouse;
import com.example.backend.service.standard.warehouse.WarehouseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/warehouse")
@RequiredArgsConstructor
public class WarehouseController {

    final WarehouseService service;

    @GetMapping("list")
    public Map<String, Object> list(@RequestParam(value = "page", defaultValue = "1") Integer page,
                                    @RequestParam(value = "type", defaultValue = "all") String searchType,
                                    @RequestParam(value = "keyword", defaultValue = "") String searchKeyword,
                                    @RequestParam(value = "sort", defaultValue = "") String sort,
                                    @RequestParam(value = "order", defaultValue = "") String order,
                                    @RequestParam(value = "active", defaultValue = "false") Boolean active) {
        return service.list(searchType, searchKeyword, page, sort, order, active);
    }

    @GetMapping("view/{warehouseKey}")
    public Warehouse viewWarehouse(@PathVariable Integer warehouseKey) {
        return service.viewWarehouse(warehouseKey);
    }

    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addWarehouse(@RequestBody Warehouse warehouse) {
        try {
            // 창고 입력 검증
            if (service.validate(warehouse)) {
                // 중복 체크
                if (service.duplicate(warehouse)) {
//        창고 등록 시도
                    if (service.addWarehouse(warehouse)) {
                        return ResponseEntity.ok().body(Map.of(
                                "message", Map.of("type", "success",
                                        "text", warehouse.getWarehouseName() + " 창고가 등록되었습니다."),
                                "data", warehouse
                        ));
                    } else {
                        return ResponseEntity.internalServerError().body(Map.of(
                                "message", Map.of("type", "error", "text", "창고 등록이 실패하였습니다.")
                        ));
                    }
                } else {
                    return ResponseEntity.badRequest().body(Map.of(
                            "message", Map.of("type", "error", "text", "이미 등록된 창고입니다.")
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

    @PutMapping("edit")
    public ResponseEntity<Map<String, Map<String, String>>> edit(@RequestBody Warehouse warehouse) {

        // 창고 입력 검증
        if (service.validate(warehouse)) {
            if (service.edit(warehouse)) {
                return ResponseEntity.ok(Map.of("message",
                        Map.of("type", "success",
                                "text", "창고 정보를 수정하였습니다.")));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "창고 수정 중 문제가 발생하였습니다..")));
            }
        } else {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "정보를 모두 입력해주세요.")
            ));
        }


    }

//    @DeleteMapping("delete/{warehouseKey}")
    //  public void delete(@PathVariable Integer warehouseKey) {
    //    service.delete(warehouseKey);
    //}

    // 협력업체 리스트 가져오기
    @GetMapping("customer")
    public List<Customer> customerList() {
        return service.getWarehouseCustomerList();
    }

    // 관리자 리스트 가져오기
    @GetMapping("employee/{customerCode}")
    public List<Warehouse> employeeList(@PathVariable String customerCode) {
        return service.getWarehouseEmployeeList(customerCode);
    }
}
