package com.example.backend.controller.standard.main;

import com.example.backend.dto.state.install.Install;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.service.standard.main.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainPageController {
    final MainService service;

    @GetMapping("boardMain")
    public Map<String, Object> getEmployee(@RequestParam(required = false) String id) {
        return service.getEmployee(id);
    }

    @GetMapping("purList")
    @PreAuthorize("isAuthenticated()")
    public List<Purchase> purchaseList(Authentication auth) {
        return service.getPurchaseList(auth);
    }

    @GetMapping("installList")
    @PreAuthorize("isAuthenticated()")
    public List<Install> installList(Authentication auth) {
        return service.getInstallList(auth);
    }

}
