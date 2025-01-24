package com.example.backend.dto.state.install;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Install {
    private Integer installRequestKey;
    private String itemCommonCode;
    private String franchiseCode;
    private String businessEmployeeNo;
    private String customerCode;
    private Integer installRequestAmount;
    private LocalDate installRequestDate;
    private Boolean installRequestConsent;
    private String installRequestNote;

    private String itemCommonName;
    private String franchiseName;
    private String franchiseAddress;
    private String businessEmployeeName;
    private String customerName;
    private String warehouseName;
    private String warehouseAddress;
    private String customerEmployeeNo;
    private String customerInstallerNo;
    private String customerInstallerName;
    private LocalDate installScheduleDate;
    private String outputNo;
    private Integer installApproveKey;
    private String installApproveNote;

    private Integer installSubKey;
    private String serialNo;
    private LocalDate installApproveDate;
    private String customerEmployeeName;
    private String serialNote;
    private String serialNumbers;
    private String serialNotes;
    private Integer installConfigurationKey;
    private Boolean installConfiguration;
    private String warehouseCode;
    private String inoutHistoryNote;
    private Boolean requestConsent;
    private Boolean approveConsent;
    private Integer countItem;
    private LocalDate inoutHistoryDate;

}
