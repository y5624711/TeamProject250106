package com.example.backend.controller.account;

import com.example.backend.dto.account.Account;
import com.example.backend.service.member.AccountService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/account")
public class AccountController {
     final AccountService service;


     @GetMapping("/list")  //  모든 멤버 출력
     public List<Account> getAllAccount() {

        List<Account> allList = service.getAllAccount();

        return allList;
     }

     // 회원 등록
    @PostMapping("add")
    public void addAccount(@RequestBody Account account) {
        System.out.println("account = " + account);
        service.addAccount(account);
    }
}
