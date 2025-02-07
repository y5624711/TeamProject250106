package com.example.backend.dto.state.install;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Install {
    private Integer installRequestKey;
    private Integer installApproveKey;
    private Integer installSubKey;

    private String itemCommonCode;
    private String itemCommonName;

    private String franchiseCode;
    private String franchiseName;
    private String franchiseAddress;

    private String customerCode;
    private String customerName;

    private String businessEmployeeNo;
    private String businessEmployeeName;
    private String customerEmployeeNo;
    private String customerEmployeeName;
    private String customerInstallerNo;
    private String customerInstallerName;
    private String disapproveEmployeeNo;
    private String disapproveEmployeeName;

    private String warehouseCode;
    private String warehouseName;

    private LocalDate installRequestDate;
    private LocalDate installApproveDate;
    private LocalDate disapproveDate;
    private LocalDate inoutHistoryDate;
    private LocalDate installDate; // 설치 리스트에서 사용하는 가장 큰 날짜
    private LocalDate installScheduleDate;

    private String installRequestNote;
    private String installApproveNote;
    private String disapproveNote;
    private String inoutHistoryNote;

    private Boolean installRequestConsent;
    private Boolean installApproveConsent;

    private Integer installRequestAmount;
    private Integer countItem; // 가능한 수량
    private String outputNo;
    private String serialNo;
    private String serialNumbers;
}
