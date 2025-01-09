package com.example.backend.dto.member;

import lombok.Data;

@Data
public class Member {
    private int memberKey;
    private int memberId;
    private String password;
    private String commonCode;

}
