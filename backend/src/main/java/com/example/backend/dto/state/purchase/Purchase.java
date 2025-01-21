package com.example.backend.dto.state.purchase;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Purchase {
    private Integer purchaseRequestKey;
    private String businessEmployeeNo;
    private String itemCommonCode;
    private String customerCode;
    private Integer amount;
    private Integer inputPrice;
    private LocalDateTime purchaseRequestDate;
    private Boolean purchaseConsent;
    private String purchaseRequestNote;

    private Integer purchaseApproveKey;
    private String customerEmployeeNo;
    private String warehouseCode;
    private String purchaseNo;
    private LocalDateTime purchaseApproveDate;
    private String purchaseApproveNote;

    private String businessEmployeeName;
    private String customerName;
}