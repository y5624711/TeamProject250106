package com.example.backend.controller.standard.main;

import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.warehouse.Warehouse;
import com.example.backend.dto.state.install.Install;
import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.service.standard.main.MainService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/main")
@RequiredArgsConstructor
public class MainPageController {
    final MainService service;

    @GetMapping("boardMain")
    @PreAuthorize("isAuthenticated()")
    public Map<String, Object> getEmployee(Authentication auth) {
        return service.getEmployee(auth.getName());
    }

    @GetMapping("purList")
    @PreAuthorize("isAuthenticated()")
    public List<Purchase> purchaseList(Authentication auth,
                                       @RequestParam(value = "company", required = false) String company,
                                       @RequestParam(value = "scope", required = false) String scope) {
        if (service.checkAdmin(auth, scope)) {
            return service.getPurChaseListByRequester(auth);
        } else {
            return service.getPurchaseListByCustomer(company);
        }
    }

    @GetMapping("installList")
    @PreAuthorize("isAuthenticated()")
    public List<Install> installList(Authentication auth,
                                     @RequestParam(value = "company", required = false) String company,
                                     @RequestParam(value = "scope", required = false) String scope) {
        if (service.checkAdmin(auth, scope)) {
            //요청자
            return service.getInstallListByRequester(auth);

        } else {
            //업체
            return service.getInstallListByCustomer(company);
        }
    }

    @GetMapping("instkList")
    @PreAuthorize("isAuthenticated()")
    public List<Instk> instakList(Authentication auth,
                                  @RequestParam(value = "company", required = false) String company,
                                  @RequestParam(value = "scope", required = false) String scope) {

        if (service.checkAdmin(auth, scope)) {
            return service.getInstkList(auth);
        } else {
            //업체
            return service.getInstkListByCustomer(company);
        }
    }


    @GetMapping("mainCustomerView/{company}")
    public Customer customerView(@PathVariable String company) {
        return service.getMainCusView(company);
    }

    @PutMapping("mainCustomerUpdate")
    public ResponseEntity<Map<String, Object>> mainCustomerUpdate(@RequestBody Customer customer) {
        if (service.validCustomer(customer)) {
            System.out.println("customer = " + customer);
            if (service.updateCustomer(customer)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "저장되었습니다.")));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message",
                        Map.of("type", "error", "text", "저장에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")));
        }
    }

    @GetMapping("mainWarehouseView/{company}")
    public Warehouse warehouseView(@PathVariable String company) {
        return service.getMainWareView(company);
    }

    @PutMapping("mainWarehouseUpdate")
    public ResponseEntity<Map<String, Object>> mainWarehouseUpdate(@RequestBody Warehouse warehouse) {
        if (service.validWarehouse(warehouse)) {
            if (service.updateWarehouse(warehouse)) {
                return ResponseEntity.ok().body(Map.of("message",
                        Map.of("type", "success", "text", "저장되었습니다.")));
            } else {
                return ResponseEntity.badRequest().body(Map.of("message",
                        Map.of("type", "success", "text", "저장에 실패하였습니다.")));
            }
        } else {
            return ResponseEntity.internalServerError().body(Map.of("message",
                    Map.of("type", "error", "text", "필수 항목이 입력되지 않았습니다.")));
        }
    }

}
