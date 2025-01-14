package com.example.backend.service.customer;

import com.example.backend.dto.customer.Customer;
import com.example.backend.mapper.customer.CustomerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {
    final CustomerMapper mapper;

    //협력업체 등록
    public void addCustomer(Customer customer) {
        mapper.addCustomer(customer);
    }

    public List<Customer> list() {
        return mapper.selectAllCustomer();
    }

    public Customer getCustomer(String customerCode) {
        return mapper.selectByCustomerCode(customerCode);
    }

    public void deactivateCustomer(String customerCode) {
        mapper.deactivateCustomer(customerCode);
    }

    public void updateCustomer(Customer customer) {
        mapper.updateCustomer(customer);
    }
}
