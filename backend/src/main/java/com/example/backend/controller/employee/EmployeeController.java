package com.example.backend.controller.employee;

import com.example.backend.dto.employee.Employee;
import com.example.backend.dto.employee.EmployeeResponse;
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

         return  service.getOneEmployeeByKey(viewKey);
     }


     @GetMapping("/list")  //  모든 멤버 출력
     public EmployeeResponse getAllEmployees(@RequestParam int page , Boolean isActiveVisible , String keyword, String type
                                            , String sort, String order) {

         // 컬럼명 숨길려고  서버에서 처리
         String convertedType= Employee.correctCommonCode(type);
         String convertedSort= Employee.correctCommonCode(sort);


         EmployeeResponse employeeResponse = service.getAllEmployee(page ,isActiveVisible,keyword,convertedType ,convertedSort,order);

        return   employeeResponse;
     }

     // 회원 등록
    @PostMapping("add")
    public ResponseEntity<Map<String, Object>> addEmployee(@RequestBody Employee employee) {
        System.out.println("account = " + employee);
        if(service.addEmployee(employee)) {
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
    public ResponseEntity<Map<String, Object>> editEmployee(@RequestBody Employee employee) {
        System.out.println("employee = " + employee);
         if(service.editEmployeeByKey(employee)){
             return ResponseEntity.ok()
                     .body(Map.of("message", Map.of("type", "success",
                             "text", STR."\{employee.getEmployeeKey()}번 직원 수정 되었습니다.")));
         }else{
             return ResponseEntity.status(401)
                     .body(Map.of("message", Map.of("type", "error",
                             "text", STR."\{employee.getEmployeeKey()}번 직원 수정 실패했습니다..")));
         }
    }

    @PutMapping("delete")
    public ResponseEntity<Map<String, Object>> deleteEmployeeByKey(@RequestBody Employee employee) {

        System.out.println("employee = " + employee);
        if(service.deleteEmployeeByKey(employee.getEmployeeKey())) {
            return ResponseEntity.ok()
                    .body(Map.of("message", Map.of("type", "success",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 삭제 되었습니다.")));
        }else {
            return ResponseEntity.status(401)
                    .body(Map.of("message", Map.of("type", "error",
                            "text", STR."\{employee.getEmployeeKey()}번 직원 삭제 실패했습니다.")));
        }
    }

}
