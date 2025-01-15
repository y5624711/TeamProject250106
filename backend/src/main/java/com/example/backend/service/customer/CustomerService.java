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

    public Customer getCustomer(String customerKey) {
        return mapper.selectByCustomerKey(customerKey);
    }

    public void deactivateCustomer(String customerKey) {
        mapper.deactivateCustomer(customerKey);
    }

    public Boolean updateCustomer(Customer customer) {
        int cnt = 0;
        cnt = mapper.updateCustomer(customer);
        return cnt == 1;
    }
}
