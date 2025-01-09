package com.example.backend.dto;

import lombok.Data;
import lombok.RequiredArgsConstructor;

@Data
public class Member {
    private String memberKey;
    private String memberId;
    private String password;
    private String commonCode;

}
