package com.example.backend.dto.department;

import lombok.Data;

@Data
public class Department {
    private Integer departmentKey;
    private String departmentCommonCode;
    private String departmentCode;
    private String departmentName;
    private String departmentTel;
    private String departmentFax;
    private Boolean departmentActive;
    private String departmentNote;
}
