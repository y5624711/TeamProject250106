package com.example.backend.controller.standard.main;

import com.example.backend.service.standard.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainPageController {
    final MainService service;

    @GetMapping("boardMain")
    private Map<String, Object> getEmployee(@RequestParam(required = false) String id) {
        return service.getEmployee(id);
    }
}
