package com.example.backend.service.standard;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.mapper.standard.main.MainMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@Transactional
@RequiredArgsConstructor
public class MainService {
    final MainMapper mapper;

    public Map<String, Object> getEmployee(String id) {
        String str = id.substring(0, 3);
        System.out.println("str = " + str);
        Employee employee = mapper.test(str, id);
        System.out.println("employee = " + employee);

        return Map.of("id", employee);
    }
}
