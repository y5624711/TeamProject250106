package com.example.backend.dto.employee;

import lombok.Data;

@Data
public class Employee {
    private int employeeKey;
    private String employeeCommonCode;
    private String employeeWorkPlaceCode;
    private String employeeNo;
    private String employeePassword;
    private String employeeName;
    private String employeeTel;
    private String employeeNote;
    private boolean employeeActive;
    private int employeeCount;
}



