package com.example.backend.controller.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import com.example.backend.service.state.retrieve.ReturnService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/return")
public class ReturnController {
    final ReturnService service;

    //반환 요청
    @PostMapping("request")
    public void requestReturn() {
    }

    //반환 승인 1. 요청: 승인 여부 변경 2. 승인 테이블에 추가

    //반환/회수 관리 테이블
    @GetMapping("list")
    public List<Return> returnList() {
        return service.returnList();
    }
}
