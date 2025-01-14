package com.example.backend.controller.customer;

import com.example.backend.dto.customer.Customer;
import com.example.backend.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/customer")
public class CustomerController {
    final CustomerService service;

    @PostMapping("add")
    public void add(@RequestBody Customer customer) {
        service.addCustomer(customer);
    }

    @GetMapping("list")
    public List<Customer> list() {
        List<Customer> customerList = service.list();
//        System.out.println(customerList);
        return customerList;
    }

    @GetMapping("view/{customerCode}")
    public Customer view(@PathVariable("customerCode") String customerCode) {
        return service.getCustomer(customerCode);
    }

    @PutMapping("delete/{customerCode}")
    public void delete(@PathVariable("customerCode") String customerCode) {
        service.deactivateCustomer(customerCode);
    }

    @PutMapping("update")
    public void update(@RequestBody Customer customer) {
        service.updateCustomer(customer);
    }
}
