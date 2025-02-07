package com.example.backend.dto.standard.customer;

import lombok.Data;

@Data
public class ItemCode {
    private Integer commonCodeKey;
    private String commonCodeType;
    private String commonCode;
    private String commonCodeName;
    private Boolean commonCodeActive;
    private String commonCodeNote;
}
