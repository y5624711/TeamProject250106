package com.example.backend.dto.state.retrieve;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Return {
    Integer returnRequestKey;
    Integer returnApproveKey;
    String serialNo;
    String itemCommonCode;
    String itemCommonName;
    String returnNo;
    String franchiseCode;
    String franchiseName;
    String businessEmployeeNo;
    String businessEmployeeName;
    String customerCode;
    String customerName;
    String customerConfigurerKey;
    String customerConfigurerName;
    String customerEmployeeNo;
    String customerEmployeeName;
    LocalDate returnRequestDate;
    LocalDate returnDate;
    String returnConsent;
    String returnRequestNote;
    String returnApproveNote;
}
