package com.example.backend.dto.account;

import lombok.Data;

@Data
public class Account {
    private int accountKey;
    private int accountId;
    private String password;
    private String commonCode;
}
