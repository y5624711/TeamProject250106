package com.example.backend.controller.standard.department;

import com.example.backend.dto.standard.department.Department;
import com.example.backend.service.standard.department.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentService service;

    @GetMapping("list")
    public Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "st", defaultValue = "all") String searchType,
            @RequestParam(value = "sk", defaultValue = "") String searchKeyword,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "sortColum", defaultValue = "department_code") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

//        System.out.println("searchType = " + searchType);
        return service.businessDepartmentList(page, searchType, searchKeyword, active, sortColum, sortOrder);
    }

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> addDepartment(@RequestBody Department department,
                                                             Authentication auth) {
        if (service.checkAdmin(auth)) {
            if (service.validateDepartment(department)) {
                if (service.checkSameNameCheck(department)) {
                    if (service.addDepartment(department)) {
                        return ResponseEntity.ok().body(Map.of("message",
                                Map.of("type", "success", "text", "등록되었습니다.")));
                    } else {
                        return ResponseEntity.internalServerError().body(Map.of("message",
                                Map.of("type", "error", "text", "등록에 실패하였습니다.")));
                    }

                } else {
                    return ResponseEntity.internalServerError().body(Map.of("message",
                            Map.of("type", "warning", "text", "중복된 이름입니다.")));
                }
            } else {
                return ResponseEntity.internalServerError().body(
                        Map.of("message",
                                Map.of("type", "warning", "text", "필수 항목이 입력되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.internalServerError().body(
                    Map.of("message",
                            Map.of("type", "error", "text", "작성 권한이 없습니다.")));
        }
    }

    @PutMapping("update")
    public ResponseEntity<Map<String, Object>> updateDepartment(@RequestBody Department department) {
        if (service.validateDepartment(department)) {
            if (service.updateDepartment(department)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "저장되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error", "text", "저장에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.ok().body(
                    Map.of("message",
                            Map.of("type", "warning", "text", "필수 항목이 입력되지 않았습니다.")));
        }
    }


    @GetMapping("codenames")
    public List<Department> getCodeNames() {
        return service.getCodeNames();
    }
}
