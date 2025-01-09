package com.example.backend.controller;

import com.example.backend.dto.Partner;
import com.example.backend.service.PartnerService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/partner")
public class PartnerController {
    final PartnerService service;

    @PostMapping("add")
    public void add(@RequestBody Partner partner) {
        service.add(partner);
    }
}
