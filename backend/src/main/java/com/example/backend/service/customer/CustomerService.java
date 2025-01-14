package com.example.backend.service.customer;

import com.example.backend.dto.customer.Customer;
import com.example.backend.mapper.customer.CustomerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {
    final CustomerMapper mapper;

    //협력업체 등록
    public void add(Customer customer) {
        mapper.add(customer);
    }
}
