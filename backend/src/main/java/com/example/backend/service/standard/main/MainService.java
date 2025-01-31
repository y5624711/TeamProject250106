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
        System.out.println("str = " + str);
        Employee employee = mapper.selectById(str, id);
        System.out.println("employee = " + employee);

        return Map.of("id", employee);
    }

    public List<Purchase> getPurchaseList(Authentication auth) {
        return mapper.selectPurchaseList(auth.getName());
    }

    public List<Install> getInstallList(Authentication auth) {
        return mapper.selectInstallList(auth.getName());
    }

    public List<Instk> getInstkList(Authentication auth) {
        return mapper.selectInstkList(auth.getName());
    }
}
