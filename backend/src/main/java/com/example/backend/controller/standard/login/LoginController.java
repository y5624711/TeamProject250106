package com.example.backend.controller.standard.login;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.service.standard.login.LoginService;
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
        boolean check = service.checkUseId(employee);
        String token = service.token(employee);
        String name = service.getName(employee.getEmployeeNo());
        String company = service.getCompany(employee);
        boolean checkId = service.checkId(employee);

        if (checkId) {
            System.out.println("checkId = " + checkId);
            if (check) {
                if (token != null) {
                    return ResponseEntity.ok().body(Map.of("token", token, "name", name, "company", company,
                            "message", Map.of("type", "success", "text", name + "님 환영합니다.")));
                } else {
                    return ResponseEntity.status(401).body(Map.of("message", Map.of("type", "error",
                            "text", "아이디와 비밀번호를 확인해 주세요.")));
                }
            } else {
                return ResponseEntity.status(401).body(Map.of("message", Map.of("type", "error",
                        "text", "사용할 수 없는 계정입니다.")));
            }
        } else {
            System.out.println("안들어옴");
            return ResponseEntity.status(401).body(Map.of("message", Map.of("type", "error",
                    "text", "없는 계정입니다.")));
        }
    }
}
