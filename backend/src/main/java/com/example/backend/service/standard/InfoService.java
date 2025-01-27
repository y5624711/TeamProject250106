package com.example.backend.service.standard;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.mapper.standard.InfoMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class InfoService {
    final InfoMapper mapper;

    public boolean hasAccess(String id, Authentication auth) {
        return id.equals(auth.getName());
    }

    public Employee getId(String id) {
        return mapper.selectById(id);
    }
}
