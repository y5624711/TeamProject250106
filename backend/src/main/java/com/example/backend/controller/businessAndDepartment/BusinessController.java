package com.example.backend.controller.businessAndDepartment;

import com.example.backend.dto.business.Business;
import com.example.backend.service.businessAndDepartment.BusinessService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
public class BusinessController {
    final BusinessService service;


    @GetMapping("view")
    private Business view() {
        return service.businessInfo();
    }

    @GetMapping("list")
    private Map<String, Object> list(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "st", defaultValue = "number") String searchType,
            @RequestParam(value = "sk", defaultValue = "") String searchKeyword,
            @RequestParam(value = "active", defaultValue = "false") Boolean active,
            @RequestParam(value = "sortColum", defaultValue = "employee_key") String sortColum,
            @RequestParam(value = "sortOrder", defaultValue = "desc") String sortOrder) {

//        System.out.println("active = " + active);
//        System.out.println("page = " + page);
//        System.out.println("searchType = " + searchType);
//        System.out.println("searchKeyword = " + searchKeyword);
//        System.out.println("sortColum = " + sortColum);
//        System.out.println("sortOrder = " + sortOrder);
        return service.businessEmpList(page, searchType, searchKeyword, active, sortColum, sortOrder);
    }

    @PutMapping("update")
    private ResponseEntity<Map<String, Object>> update(@RequestBody Business business) {
        if (service.validate(business)) {
            if (service.updateBusiness(business)) {
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
