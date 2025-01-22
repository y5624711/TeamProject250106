package com.example.backend.dto.state.install;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Data
public class Install {
    private Integer installRequestKey;
    private String itemCommonCode;
    private String franchiseCode;
    private String businessEmployeeNo;
    private String customerCode;
    private Integer installRequestAmount;
    private LocalDateTime installRequestDate;
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
    private LocalDateTime installScheduleDate;
    private String outputNo;
    private Integer installApproveKey;
    private String installApproveNote;

    private Integer installSubKey;
    private String serialNo;
    private LocalDateTime installApproveDate;
    private String customerEmployeeName;
    private String serialNote;
    private String serialNumbers;

    // 시리얼 번호를 리스트로 변환
    public List<String> getSerialNumberList() {
        return serialNumbers == null ? Collections.emptyList() : Arrays.asList(serialNumbers.split(","));
    }
}
