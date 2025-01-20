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
        String cus = "CUS";

        // 0 또는 숫자 조회
        Integer maxNo = mapper.viewMaxCustomerCode(cus);

        //  부족한 자리수 만큼  0 채우기
        String newNumber = String.format("%010d", (maxNo == null) ? 1 : maxNo + 1);

        String newCustomerCode = cus + newNumber;
        System.out.println(newCustomerCode);
        customer.setCustomerCode(newCustomerCode);

        int count = mapper.addCustomer(customer);
        return count == 1;
    }

    public Map<String, Object> getCustomerList(Boolean active, Integer page, String type, String keyword, String sort, String order) {
        int offset = (page - 1) * 10;
        System.out.println("2 ");
        System.out.println("sort: " + sort);
        System.out.println("order: " + order);
        //검색
        List<Customer> customerList = mapper.getCustomerList(active, offset, type, keyword, sort, order);
//        System.out.println(customerList);
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
