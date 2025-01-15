package com.example.backend.controller.customer;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.customer.Customer;
import com.example.backend.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
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
    public void addCustomer(@RequestBody Customer customer) {
//        System.out.println("c" + customer);
        service.addCustomer(customer);
    }

    //협력사 목록
    @GetMapping("list")
    public Map<String, Object> customerList(
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword) {
        return service.getCustomerList(active, page, type, keyword);
    }

    //협력사 상세
    @GetMapping("view/{customerKey}")
    public Customer viewCustomer(@PathVariable("customerKey") String customerKey) {
        return service.viewCustomer(customerKey);
    }

    //협력사 삭제
    @PutMapping("delete/{customerKey}")
    public void deleteCustomer(@PathVariable("customerKey") String customerCode) {
        service.deleteCustomer(customerCode);
    }

    //협력사 정보 수정
    @PutMapping("edit")
    public void editCustomer(@RequestBody Customer customer) {
//        System.out.println(customer);
//        System.out.println(service.updateCustomer(customer));
        service.editCustomer(customer);
    }

    @GetMapping("itemCode/list")
    private List<CommonCode> itemCodeList() {
        return service.itemCodeList();
    }
}
