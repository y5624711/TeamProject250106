package com.example.backend.service.customer;

import com.example.backend.dto.commonCode.CommonCode;
import com.example.backend.dto.customer.Customer;
import com.example.backend.mapper.customer.CustomerMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class CustomerService {
    final CustomerMapper mapper;

    //협력업체 등록
    public Boolean addCustomer(Customer customer) {
        int count = mapper.addCustomer(customer);
        return count == 1;
    }

    public Map<String, Object> getCustomerList(Boolean active, Integer page, String type, String keyword) {
        int offset = (page - 1) * 10;

        //검색
        List<Customer> customerList = mapper.getCustomerList(active, offset, type, keyword);

        //목록 수
        Integer count = mapper.countCustomerList(active, type, keyword);

        return Map.of("customerList", customerList, "count", count);
    }

    public Customer viewCustomer(String customerKey) {
        return mapper.viewCustomer(customerKey);
    }

    public Boolean deleteCustomer(String customerKey) {
        int count = mapper.deleteCustomer(customerKey);
        return count == 1;
    }

    public Boolean editCustomer(Customer customer) {
        int cnt = mapper.editCustomer(customer);
        return cnt >= 1;
    }

    public List<CommonCode> itemCodeList() {
        return mapper.itemCodeList();
    }
}
