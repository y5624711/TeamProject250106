package com.example.backend.controller.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/return")
public class ReturnController {
    final ReturnService service;

    //반환/회수 관리 테이블
    @GetMapping("list")
    public List<Return> returnList() {
        return service.returnList();
    }

    //시리얼 번호를 통해 정보 불러오기
    @GetMapping("serialNo/{serialNo}")
    public List<Return> getSerialNo(@PathVariable String serialNo) {
//        System.out.println("controller" + serialNo);
        return service.getStandardInfo(serialNo);
    }

    //반품 요청
    @PostMapping("request")
    public void requestReturn(@RequestBody Return requestInfo) {
//        System.out.println("request: " + requestInfo);
        service.addRequest(requestInfo);
    }

    //반품 요청 정보 불러오기
    @GetMapping("approve/{returnRequestKey}")
    public List<Return> getRequest(@PathVariable String returnRequestKey) {
//        System.out.println("키값: " + returnRequestKey);
        return service.getRequestInfo(returnRequestKey);
    }


    //반환 승인 1. 요청: 승인 여부 변경 2. 승인 테이블에 추가
    @PostMapping("approve")
    public void approveReturn(@RequestBody Return approveInfo) {
        System.out.println("controller: " + approveInfo);
        service.addApprove(approveInfo);
    }
}
