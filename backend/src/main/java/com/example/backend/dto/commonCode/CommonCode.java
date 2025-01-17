package com.example.backend.dto.commonCode;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommonCode {
    private Integer commonCodeKey;
    private String commonCode;
    private String commonCodeName;
    private boolean commonCodeActive;
    private String commonCodeNote;
}
