package com.example.backend.controller.standard.employee;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.dto.standard.employee.EmployeeResponse;
import com.example.backend.service.standard.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {
    final EmployeeService service;


    @GetMapping("view")
    public Employee getEmployee(@RequestParam int viewKey) {

        return service.getOneEmployeeByKey(viewKey);
    }





    @GetMapping("/list")  //  모든 멤버 출력
    public EmployeeResponse getAllEmployees(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "employee_key") String sort,
            @RequestParam(value = "order", defaultValue = "desc") String order,
            @RequestParam(value="isActiveVisible", defaultValue="false") Boolean isActiveVisible
            ) {

        // 컬럼명 숨길려고  서버에서 처리
        String convertedType = Employee.correctType(type);

        System.out.println("sort = " + sort);

        String convertedSort = Employee.correctCommonCode(sort);

        System.out.println("page = " + page);
        System.out.println("convertedSort = " + convertedSort);
        System.out.println("convertedType = " + convertedType);
        System.out.println("order = " + order);
        System.out.println("isActiveVisible = " + isActiveVisible);

        EmployeeResponse employeeResponse = service.getAllEmployee(page, isActiveVisible, keyword, convertedType, convertedSort, order);

        return employeeResponse;
    }

    // 회원 등록

    @PostMapping("add")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> addEmployee(@RequestBody Employee employee , Authentication authentication) {

        //협력업체 직원이 누르게 될경우 
        if (!authentication.getName().startsWith("BIZ")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "회원 등록 권한이 없습니다.")));
        }


        System.out.println("account = " + employee);
        if (service.addEmployee(employee)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 등록 되었습니다.")));
        } else {
            return ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "error",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 등록 실패했습니다..")));
        }
    }

    // 회원 수정
    @PutMapping("update")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> editEmployee(@RequestBody Employee employee ,Authentication authentication) {
        //협력업체 직원이 누르게 될경우
        if (!authentication.getName().startsWith("BIZ")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "회원 수정 권한이 없습니다.")));
        }

        System.out.println("employee = " + employee);
        if (service.editEmployeeByKey(employee)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 수정 되었습니다.")));
        } else {
            return ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "error",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 수정 실패했습니다..")));
        }
    }

    @PutMapping("delete")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> deleteEmployeeByKey(@RequestBody Employee employee ,Authentication authentication) {

        //협력업체 직원이 누르게 될경우
        if (!authentication.getName().startsWith("BIZ")) {
            return ResponseEntity.badRequest()
                    .body(Map.of("message", Map.of("type", "error",
                            "text", "회원 삭제 권한이 없습니다.")));
        }

        System.out.println("employee = " + employee);
        if (service.deleteEmployeeByKey(employee.getEmployeeKey())) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 삭제 되었습니다.")));
        } else {
            return ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "error",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 삭제 실패했습니다.")));
        }
    }

}
