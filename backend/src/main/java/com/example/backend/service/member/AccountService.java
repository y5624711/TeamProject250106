package com.example.backend.service.member;


import com.example.backend.dto.account.Account;
import com.example.backend.mapper.account.AccountMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AccountService {
        final AccountMapper mapper;
    public boolean addAccount(Account account) {

           int cnt= mapper.addAccount(account);

           return cnt==1;
    }

    public List<Account> getAllAccount() {

        return  mapper.getAllAccounts();
    }
}
