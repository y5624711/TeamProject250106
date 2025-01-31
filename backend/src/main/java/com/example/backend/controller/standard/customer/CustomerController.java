package com.example.backend.controller.standard.customer;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.service.standard.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {
    final CustomerService service;

    //협력사 등록
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addCustomer(@RequestBody Customer customer) {
        //협력사 입력란 빈칸 검증
        if (!service.checkEmptyCustomer(customer)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "필수 입력값이 입력되지 않았습니다.")
            ));
        }

        //중복 여부 확인
        if (service.checkDuplicateCustomer(customer)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "중복된 정보가 존재합니다.")
            ));
        }

        if (service.addCustomer(customer)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "등록하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "등록 중 문제가 발생하였습니다.")));
        }
    }

    //협력사 목록
    @GetMapping("list")
    public Map<String, Object> customerList(
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "customer_key") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") String order
    ) {


        return service.getCustomerList(active, page, type, keyword, sort, order);
    }

    //협력사 상세
    @GetMapping("view/{customerKey}")
    public Customer viewCustomer(@PathVariable("customerKey") String customerKey) {
        return service.viewCustomer(customerKey);
    }

    //협력사 삭제
    @PutMapping("delete/{customerKey}")
    public ResponseEntity<Map<String, Object>> deleteCustomer(
            @PathVariable("customerKey") String customerKey) {
        //삭제된 협력사인지 조회
        if (service.checkDeletedCustomer(customerKey)) {
            return ResponseEntity.badRequest().body(Map.of(
                    "message", Map.of("type", "error", "text", "이미 삭제된 정보입니다.")
            ));
        }

        if (service.deleteCustomer(customerKey)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."삭제되었습니다.")));

        } else {
            return ResponseEntity.internalServerError()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "삭제 중 문제가 발생하였습니다.")));
        }
    }

    //협력사 정보 수정
    @PutMapping("edit")
    public ResponseEntity<Map<String, Object>> editCustomer(@RequestBody Customer customer) {
        if (service.editCustomer(customer)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "수정하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "수정 중 문제가 발생하였습니다.")));
        }
    }

    //등록할 수 있는 품목 목록
    @GetMapping("itemCode/list")
    private List<CommonCode> itemCodeList() {
        return service.itemCodeList();
    }

    @GetMapping("codenames")
    public List<Customer> customerCodeNames() {

        return service.customerCodeNames();
    }
}
