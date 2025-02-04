package com.example.backend.service.standard.main;

import com.example.backend.dto.standard.business.Business;
import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.dto.standard.warehouse.Warehouse;
import com.example.backend.dto.state.install.Install;
import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.mapper.standard.main.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MainService {
    final MainMapper mapper;

    public Map<String, Object> getEmployee(String id) {
        String str = id.substring(0, 3);
        Employee employee = mapper.selectById(str, id);
        if (employee.getEmployeeCommonCode().equals("CUS")) {
            Customer customer = mapper.selectCommpany(employee.getEmployeeWorkPlaceCode());
            return Map.of("id", employee, "companyStatus", customer);
        } else {
            Business business = mapper.selectBusiness(employee.getEmployeeWorkPlaceCode());

            return Map.of("id", employee, "companyStatus", business);
        }

    }


    //    구매 신정받은 업체 리스트
    public List<Purchase> getPurchaseListByCustomer(String company) {
        return mapper.selectPurchaseListByCustomer(company);
    }

    //    구매 신청자 리스트
    public List<Purchase> getPurChaseListByRequester(Authentication auth) {
        System.out.println(auth.getName());
        return mapper.selectPurchaseListByRequester(auth.getName());
    }


    public List<Install> getInstallListByRequester(Authentication auth) {
        return mapper.selectInstallListByRequester(auth.getName());
    }

    public List<Install> getInstallListByCustomer(String company) {
        return mapper.selectInstallListByCustomer(company);
    }


    public List<Instk> getInstkList(Authentication auth) {
        return mapper.selectInstkList(auth.getName());
    }

    public List<Instk> getInstkListByCustomer(String company) {
        return mapper.selectInstkListByCustomer(company);
    }

    public Customer getMainCusView(String company) {
        return mapper.selectCustomer(company);
    }

    public boolean validCustomer(Customer customer) {
        Boolean name = !customer.getCustomerName().trim().isEmpty();
        Boolean rep = !customer.getCustomerRep().trim().isEmpty();
        Boolean tel = !customer.getCustomerAddress().trim().isEmpty();
        Boolean address = !customer.getCustomerAddress().trim().isEmpty();
        Boolean post = !customer.getCustomerPost().trim().isEmpty();


        return name & rep & tel & address & post;
    }

    public boolean updateCustomer(Customer customer) {
        int cnt = mapper.updateCustomer(customer);

        return cnt == 1;
    }

    public Warehouse getMainWareView(String company) {
        return mapper.selectWarehouse(company);
    }

    public boolean validWarehouse(Warehouse warehouse) {
        Boolean name = !warehouse.getWarehouseName().trim().isEmpty();
        Boolean tel = !warehouse.getWarehouseTel().trim().isEmpty();
        Boolean address = !warehouse.getWarehouseAddress().trim().isEmpty();
        Boolean post = !warehouse.getWarehousePost().trim().isEmpty();
        Boolean state = !warehouse.getWarehouseState().trim().isEmpty();
        Boolean city = !warehouse.getWarehouseCity().trim().isEmpty();

        return name & tel & address & post & state & city;
    }

    public boolean updateWarehouse(Warehouse warehouse) {
        int cnt = mapper.updateWarehouse(warehouse);

        return cnt == 1;
    }

    public boolean checkAdmin(Authentication auth, String scope) {
        if (scope.equals("BIZ")) {
            int cnt = mapper.selectEmployee(auth.getName());
            return cnt == 1;
        } else {
            return false;
        }
    }
}
