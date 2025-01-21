package com.example.backend.dto.state.retrieve;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Return {
    Integer returnRequestKey;
    Integer returnApproveKey;
    String serialNo;
    String returnNo;
    String franchiseCode;
    String businessEmployeeNo;
    String customerCode;
    String customerConfigurerKey;
    String customerEmployeeNo;
    LocalDate returnRequestDate;
    LocalDate returnDate;
    String returnConsent;
    String returnRequestNote;
    String returnApproveNote;
}
