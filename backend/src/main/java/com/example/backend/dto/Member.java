package com.example.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class Member {
    private int memberKey;
    private int memberId;
    private String password;
    private String commonCode;

}
