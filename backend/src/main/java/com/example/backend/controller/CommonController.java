package com.example.backend.controller;

import com.example.backend.dto.CommonCode;
import com.example.backend.service.CommonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/commonCode")
@RequiredArgsConstructor
public class CommonController {
    final CommonService service;

    @GetMapping("list")
    private List<CommonCode> list() {
        return service.selectAllList();
    }
}
