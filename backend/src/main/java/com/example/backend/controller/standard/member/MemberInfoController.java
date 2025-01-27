package com.example.backend.controller.standard.member;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.service.standard.InfoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/info")
public class MemberInfoController {
    private final InfoService service;

    @GetMapping("{id}")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Employee> getMemberInfo(@PathVariable String id, Authentication auth) {
        System.out.println("auth = " + auth.getName());
        if (service.hasAccess(id, auth)) {
            return ResponseEntity.ok(service.getId(id));
        } else {
            System.out.println("안됨");
            return ResponseEntity.status(403).build();
        }
//        return service.getMemberInfo();
    }

    @PutMapping("update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> updateMemberInfo(@RequestBody Employee employee, Authentication auth) {
        if (!service.hasAccess(employee.getEmployeeNo(), auth)) {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of(
                    "type", "error", "text", "권한이 없습니다.")));
        }
        if (!service.validate(employee)) {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of(
                    "type", "error", "text", "아이디 혹은 비밀번호가 입력되지 않았습니다.")));
        }
        if (service.updateId(employee)) {
            return ResponseEntity.ok().body(Map.of("message", Map.of(
                    "type", "success", "text", "수정되었습니다.")));

        } else {
            return ResponseEntity.badRequest().body(Map.of("message", Map.of(
                    "type", "error", "text", "수정되지 않았습니다.")));
        }
    }
}
