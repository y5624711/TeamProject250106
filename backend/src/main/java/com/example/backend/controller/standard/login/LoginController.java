package com.example.backend.controller.standard.login;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.service.login.LoginService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@RequiredArgsConstructor
public class LoginController {
    final LoginService service;

    @PostMapping("siteIn")
    private ResponseEntity<Map<String, Object>> siteIn(@RequestBody Employee employee) {
        String token = service.token(employee);
        String name = service.getName(employee.getEmployeeNo());
        System.out.println("name = " + name);
        if (token != null) {
            return ResponseEntity.ok().body(Map.of("token", token, "name", name, "message",
                    Map.of("type", "success", "text", name + "님 환영합니다")));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", Map.of("type", "error",
                    "text", "아이디와 비밀번호를 확인하세요")));
        }
    }
}
