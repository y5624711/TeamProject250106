package com.example.backend.controller.employee;

import com.example.backend.dto.employee.Employee;
import com.example.backend.service.employee.EmployeeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/employee")
public class EmployeeController {
     final EmployeeService service;


     @GetMapping("view")
     public Employee getEmployee(@RequestParam int viewKey) {
         System.out.println("viewKey = " + viewKey);


//         return  new Employee();
         return  service.getOneEmployeeByKey(viewKey);
     }


     @GetMapping("/list")  //  모든 멤버 출력
     public List<Employee> getAllEmployees() {

        List<Employee> allList = service.getAllEmployee();

        return allList;
     }

     // 회원 등록
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addEmployee(@RequestBody Employee employee) {
        System.out.println("account = " + employee);
        if(service.addEmployee(employee)) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 수정 되었습니다.")));
        } else {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "warning",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 수정 실패했습니다..")));
        }

    }
    
    // 회원 수정
    @PutMapping("update")
    public void editEmployee(@RequestBody Employee employee) {
        System.out.println("employee = " + employee);

         service.editEmployeeByKey(employee);
    }

    @PutMapping("delete")
    public void deleteEmployee(@RequestParam int viewKey) {
        System.out.println("viewKey = " + viewKey);
    }

}
