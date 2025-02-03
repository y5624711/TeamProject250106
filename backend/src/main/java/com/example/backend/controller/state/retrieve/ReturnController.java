package com.example.backend.controller.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
//@Transactional
@RequestMapping("/api/return")
public class ReturnController {
    final ReturnService service;

    //반환/회수 관리 테이블
    @GetMapping("list")
    public Map<String, Object> returnList(
            @RequestParam(value = "page", defaultValue = "1") Integer page,
            @RequestParam(value = "state", defaultValue = "all") String state,
            @RequestParam(value = "type", defaultValue = "all") String type,
            @RequestParam(value = "keyword", defaultValue = "") String keyword,
            @RequestParam(value = "sort", defaultValue = "COALESCE(return_approve_date, return_request_date)") String sort,
            @RequestParam(value = "order", defaultValue = "DESC") String order,
            Authentication auth
    ) {
//        System.out.println("page:" + page);
//        System.out.println("state:" + state);
//        System.out.println("type:" + type);
//        System.out.println("keyword:" + keyword);
//        System.out.println("sort:" + sort);
//        System.out.println("order:" + order);

        return service.returnList(page, state, type, keyword, sort, order, auth);
    }

    //시리얼 번호를 통해 정보 불러오기 (반품 요청창 작성)
    @GetMapping("{serialNo}")
    public List<Return> getSerialNo(@PathVariable String serialNo) {
//        System.out.println("controller" + serialNo);
        return service.getStandardInfo(serialNo);
    }

    //반품 요청
    @PostMapping("request")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> requestReturn(@RequestBody Return requestInfo, Authentication auth) {
        //조건 1 로그인 한 사람이 본사 직원이어야함
        try {
            if (service.checkCustomer(auth.getName())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "요청 권한이 없습니다.")));
            }

            //조건 2 요청 실패 여부 - trans
            if (service.addRequest(requestInfo)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "요청하였습니다."),
                        "data", requestInfo));
            } else {
                return ResponseEntity.internalServerError().body(Map.of(
                        "message", Map.of("type", "error", "text", "요청에 실패하였습니다.")));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "오류가 발생했습니다.")
            ));
        }
    }

    //반품 요청 정보 불러오기
    @GetMapping("approve/{returnRequestKey}")
    public List<Return> getRequest(@PathVariable String returnRequestKey) {
//        System.out.println("키값: " + returnRequestKey);
        return service.getRequestInfo(returnRequestKey);
    }

    //협력업체의 직원(기사) 목록 불러오기
    @GetMapping("configurer/{returnRequestKey}")
    public List<Map<String, Object>> getConfigurerList(@PathVariable String returnRequestKey) {
        return service.getConfigurerList(returnRequestKey);
    }

    //반품 승인 + 가입고 요청
    @PostMapping("approve")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> approveReturn(@RequestBody Return approveInfo, Authentication auth) {
        try {
            //승인하는 사람이 해당 본사 or 해당 협력사 직원
            if (!service.checkApproveEmployee(auth.getName(), approveInfo.getCustomerCode())) {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "승인 권한이 없습니다.")));
            }

            if (service.addApprove(approveInfo)) {
                return ResponseEntity.ok(Map.of("message",
                        Map.of("type", "success",
                                "text", "승인하였습니다.")));
            } else {
                return ResponseEntity.badRequest()
                        .body(Map.of("message",
                                Map.of("type", "error",
                                        "text", "문제가 발생하였습니다.")));
            }
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "오류가 발생했습니다.")
            ));
        }
    }

    //반품 반려
    @PutMapping("disapprove/{returnRequestKey}")
    public ResponseEntity<Map<String, Object>> disapproveReturn(@PathVariable String returnRequestKey) {
        if (service.disapproveReturn(returnRequestKey)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "success",
                            "text", "반려하였습니다.")));
        } else {
            return ResponseEntity.badRequest()
                    .body(Map.of("message",
                            Map.of("type", "error",
                                    "text", "문제가 발생하였습니다.")));
        }
    }

    //가맹점이 가진 물품 목록(시리얼번호) 불러오기
    @GetMapping("serialNoList/{franchiseCode}")
    public List<Return> getSerialNoList(@PathVariable String franchiseCode) {
        return service.getSerialNoList(franchiseCode);
    }
}
