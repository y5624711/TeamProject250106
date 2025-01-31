package com.example.backend.service.standard.main;

import com.example.backend.dto.standard.employee.Employee;
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

        return Map.of("id", employee);
    }

    public boolean checkBuyRequester(Authentication auth) {
        int cnt = mapper.selectByRequester(auth.getName());
        return cnt > 0;
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


    public List<Instk> getInstkList(Authentication auth) {
        return mapper.selectInstkList(auth.getName());
    }

    //    설치요청자 체크
    public boolean checkInstallRequester(Authentication auth) {
        int cnt = mapper.selectInstallByRequseter(auth.getName());

        return cnt > 0;
    }

    public List<Install> getInstallListByRequester(Authentication auth) {
        return mapper.selectInstallListByRequester(auth.getName());
    }

    public List<Install> getInstallListByCustomer(String company) {
        return mapper.selectInstallListByCustomer(company);
    }
}
