package com.example.backend.dto.state.purchase;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Purchase {
    private Integer purchaseRequestKey;
    private String employeeNo;
    private String employeeName;
    private String itemCommonCode;
    private String itemCommonName;
    private String customerCode;
    private String customerName;
    private Integer amount;
    private LocalDate purchaseRequestDate;
    private Boolean purchaseConsent;
    private String purchaseRequestNote;

    private Integer purchaseApproveKey;
    private String customerEmployeeNo;
    private String customerEmployeeName;
    private String warehouseCode;
    private String purchaseNo;
    private LocalDate purchaseApproveDate;
    private String purchaseApproveNote;
}