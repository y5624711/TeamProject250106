package com.example.backend.controller.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@Slf4j
@RestController
@RequiredArgsConstructor
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
            @RequestParam(value = "order", defaultValue = "DESC") String order
    ) {
//        System.out.println("page:" + page);
//        System.out.println("state:" + state);
//        System.out.println("type:" + type);
//        System.out.println("keyword:" + keyword);
//        System.out.println("sort:" + sort);
//        System.out.println("order:" + order);
        System.out.println("true");

        return service.returnList(page, state, type, keyword, sort, order);
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
    public ResponseEntity<Map<String, Object>> requestReturn(@RequestBody Return requestInfo) {
//        System.out.println("request: " + requestInfo);

        if (service.addRequest(requestInfo)) {
            return ResponseEntity.ok().body(Map.of("message",
                    Map.of("type", "success", "text", "신청하였습니다."),
                    "data", requestInfo));
        } else {
            return ResponseEntity.internalServerError().body(Map.of(
                    "message", Map.of("type", "error", "text", "신청에 실패하였습니다.")));
        }
    }

    //반품 요청 정보 불러오기
    @GetMapping("approve/{returnRequestKey}")
    public List<Return> getRequest(@PathVariable String returnRequestKey) {
//        System.out.println("키값: " + returnRequestKey);
        return service.getRequestInfo(returnRequestKey);
    }


    //반품 승인 + 가입고 신청
    @PostMapping("approve")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Map<String, Object>> approveReturn(@RequestBody Return approveInfo) {
//        System.out.println("controller: " + approveInfo);
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
    }

    //반품 반려
    @PutMapping("disapprove/{returnRequestKey}")
    public ResponseEntity<Map<String, Object>> disapproveReturn(@PathVariable String returnRequestKey) {
        if (service.disapproveReturn(returnRequestKey)) {
            return ResponseEntity.ok(Map.of("message",
                    Map.of("type", "warning",
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
