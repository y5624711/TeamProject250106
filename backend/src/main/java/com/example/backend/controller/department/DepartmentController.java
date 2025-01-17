package com.example.backend.controller.department;

import com.example.backend.dto.department.Department;
import com.example.backend.service.department.DepartmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/department")
@RequiredArgsConstructor
public class DepartmentController {

    final DepartmentService service;

    @GetMapping("list")
    private Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "st", defaultValue = "number") String searchType,
            @RequestParam(value = "sk", defaultValue = "") String searchKeyword,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "sortColum", defaultValue = "department_code") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        return service.businessDepartmentList(page, searchType, searchKeyword, active, sortColum, sortOrder);

    }

    @PutMapping("update")
    private ResponseEntity<Map<String, Object>> updateDepartment(@RequestBody Department department) {
        if (service.validateDepartment(department)) {
            if (service.updateDepartment(department)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "수정 되었습니다.")));
            } else {
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "error", "text", "수정 되지 않았습니다.")));
            }
        } else {
            return ResponseEntity.ok().body(
                    Map.of("message",
                            Map.of("type", "warning", "text", "내용을 입력해 주세요")));
        }
    }
}
