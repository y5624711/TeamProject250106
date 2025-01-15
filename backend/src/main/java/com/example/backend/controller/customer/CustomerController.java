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

    @GetMapping("view/{customerKey}")
    public Customer view(@PathVariable("customerKey") String customerKey) {
        return service.getCustomer(customerKey);
    }

    @PutMapping("delete/{customerKey}")
    public void delete(@PathVariable("customerKey") String customerCode) {
        service.deactivateCustomer(customerCode);
    }

    @PutMapping("update")
    public void update(@RequestBody Customer customer) {
//        System.out.println(customer);
//        System.out.println(service.updateCustomer(customer));
        service.updateCustomer(customer);
    }
}
