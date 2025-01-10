package com.example.backend.mapper.account;


import com.example.backend.dto.account.Account;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface AccountMapper {

    @Insert("""
        INSERT INTO account(account_id, password, common_code)
        VALUES (#{accountId}, #{password}, #{commonCode})
    """)
    @Options(useGeneratedKeys = true, keyProperty = "accountKey")
    int addAccount(Account member);


    @Select("""
        select * from account
""")
    List<Account> getAllAccounts();
}
