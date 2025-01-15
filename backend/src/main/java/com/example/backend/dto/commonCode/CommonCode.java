package com.example.backend.dto.commonCode;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommonCode {
    private Integer common_code_key;
    private String common_code;
    private String common_code_name;
    private boolean common_code_active;
    private String common_code_note;
}
