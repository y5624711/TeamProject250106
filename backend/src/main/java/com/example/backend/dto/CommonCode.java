package com.example.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CommonCode {
    private String common_code;
    private String name;
    private boolean active;
    private String note;
}
