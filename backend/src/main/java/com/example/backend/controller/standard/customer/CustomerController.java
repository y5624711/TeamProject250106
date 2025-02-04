package com.example.backend.controller.standard.customer;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.service.standard.customer.CustomerService;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {
    final CustomerService service;
    final ReturnService returnService;

    //협력사 등록
    @PostMapping("add")
//    @PreAuthorize("hasAuthority('SCOPE_BIZ')")
    public ResponseEntity<Map<String, Object>> addCustomer(@RequestBody Customer customer, Authentication auth) {
        try {
            //본사 사람만 등록 가능
            if (returnService.checkCustomer(auth.getName())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "등록 권한이 없습니다.")));
            }

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
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "오류가 발생했습니다.")
            ));
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
    public ResponseEntity<Map<String, Object>> editCustomer(@RequestBody Customer customer, Authentication auth) {
//        System.out.println("customer: " + customer);
        try {
            //수정 권한자인가?
            if (!returnService.checkApproveEmployee(auth.getName(), customer.getCustomerCode())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "수정 권한이 없습니다.")));
            }

            //복구 시도 시 복구 가능 여부 : active가 true로 왔을 때 일단 진입
            if (customer.getCustomerActive() && service.checkActiveChange(customer) && !service.checkActive(customer)) {
                return ResponseEntity.badRequest().body(Map.of(
                        "message", Map.of("type", "error", "text", "같은 품목을 다루는 협력업체가 존재합니다.")
                ));
            }

            //사용여부 수정 시도 시 권한자 여부
            if (service.checkActiveChange(customer) && returnService.checkCustomer(auth.getName())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "사용여부 수정 권한이 없습니다.")));
            }

            //수정
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
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "오류가 발생했습니다.")
            ));
        }
    }

    //등록할 수 있는 품목 목록
    @GetMapping("itemCode/list")
    private List<CommonCode> itemCodeList() {
//        System.out.println(service.itemCodeList());
        return service.itemCodeList();
    }

    @GetMapping("codenames")
    public List<Customer> customerCodeNames() {

        return service.customerCodeNames();
    }
}
