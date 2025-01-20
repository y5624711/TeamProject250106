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
            @RequestParam(value = "st", defaultValue = "all") String searchType,
            @RequestParam(value = "sk", defaultValue = "") String searchKeyword,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "sortColum", defaultValue = "department_code") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

        System.out.println("searchType = " + searchType);
        return service.businessDepartmentList(page, searchType, searchKeyword, active, sortColum, sortOrder);
    }

    @PostMapping("add")
    private ResponseEntity<Map<String, Object>> addDepartment(@RequestBody Department department) {
        if (service.validateDepartment(department)) {
            if (service.checkSameNameCheck(department)) {
                if (service.addDepartment(department)) {
                    return ResponseEntity.ok().body(Map.of("message",
                            Map.of("type", "success", "text", "수정 되었습니다.")));
                } else {
                    return ResponseEntity.internalServerError().body(Map.of("message",
                            Map.of("type", "error", "text", "수정 되지 않았습니다.")));
                }

            } else {
                System.out.println("잘들어옴");
                return ResponseEntity.internalServerError().body(Map.of("message",
                        Map.of("type", "warning", "text", "중복된 이름입니다.")));
            }
        } else {
            return ResponseEntity.internalServerError().body(
                    Map.of("message",
                            Map.of("type", "warning", "text", "내용을 입력해 주세요")));
        }
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

    @PutMapping("delete")
    private ResponseEntity<Map<String, Object>> deleteDepartment(@RequestBody Department department) {
        if (service.deleteDepartment(department.getDepartmentKey())) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "삭제 되었습니다.")));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error", "text", "삭제 되지 않았습니다.")));
        }
    }

    @PutMapping("reUseDepartment")
    private ResponseEntity<Map<String, Object>> reUseDepartment(@RequestBody Department department) {
        if (service.reUseDepartment(department.getDepartmentKey())) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "해당 부서를 다시 사용합니다.")));
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error", "text", "오류가 발생했습니다.")));
        }
    }
}
