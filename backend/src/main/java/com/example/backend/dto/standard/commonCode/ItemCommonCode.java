package com.example.backend.dto.standard.commonCode;

import lombok.Data;

@Data
public class ItemCommonCode {
    private Integer itemCommonCodeKey;
    private String itemCommonCode;
    private String itemCommonName;
    private Boolean itemCommonCodeActive;
    private String itemCommonCodeNote;
    private String commonCodeType;
}
