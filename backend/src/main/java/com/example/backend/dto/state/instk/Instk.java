package com.example.backend.dto.state.instk;

import lombok.Data;

import java.util.Date;

@Data
public class Instk {
    private int inputKey;
    private String inputCommonCode;
    private String inputNo;
    private String businessEmployeeNo;
    private boolean inputConsent;
    private String inputNote;
    private String itemCommonCode;
    private String itemCommonName;
    private String customerName;
    private String itemAmount;
    private Date requestDate;
    private Date inputStockDate;
    private String employeeName;
    private String requestEmployeeName;
    private String requestApprovalEmployeeName;


}
