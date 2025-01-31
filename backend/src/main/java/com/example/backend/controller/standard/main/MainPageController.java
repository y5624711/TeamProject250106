package com.example.backend.controller.standard.main;

import com.example.backend.dto.state.install.Install;
import com.example.backend.dto.state.instk.Instk;
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
    public List<Purchase> purchaseList(Authentication auth,
                                       @RequestParam(value = "company", required = false) String company) {
        // 구매신청자와 신청받은 업체 구분
        if (service.checkBuyRequester(auth)) {
            return service.getPurChaseListByRequester(auth);
        } else {
            return service.getPurchaseListByCustomer(company);
        }

    }

    @GetMapping("installList")
    @PreAuthorize("isAuthenticated()")
    public List<Install> installList(Authentication auth,
                                     @RequestParam(value = "company", required = false) String company) {
        if (service.checkInstallRequester(auth)) {
            //요청자
            System.out.println("요청자");
            return service.getInstallListByRequester(auth);

        } else {
            //업체
            System.out.println("업체");
            return service.getInstallListByCustomer(company);
        }
    }

    @GetMapping("instkList")
    @PreAuthorize("isAuthenticated()")
    public List<Instk> instakList(Authentication auth) {
        return service.getInstkList(auth);
    }

}
