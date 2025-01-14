package com.example.backend.controller.customer;

import com.example.backend.dto.customer.Customer;
import com.example.backend.service.customer.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class CustomerController {
    final CustomerService service;

    @PostMapping("add")
    public void add(@RequestBody Customer customer) {
        service.add(customer);

    }
}
