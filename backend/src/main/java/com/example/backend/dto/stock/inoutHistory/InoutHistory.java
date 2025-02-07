package com.example.backend.dto.stock.inoutHistory;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class InoutHistory {
    private Integer inoutHistoryKey;
    private String serialNo;
    private String warehouseCode;
    private String inoutCommonCode;
    private String customerEmployeeNo;
    private String businessEmployeeNo;
    private String franchiseCode;
    private Integer locationKey;
    private LocalDateTime inoutHistoryDate;
    private Integer countCurrent;
    private String inoutHistoryNote;

    private String customerName;

    private String warehouseAddress;

    private String inoutNo;

    //    아이템 이름
    private String itemName;
    //    아이템 코드
    private String itemCode;
    //    창고 이름
    private String warehouseName;
    //    가맹점 이름
    private String installFranchiseName;
    private String returnFranchiseName;
    //    본사직원 이름
    private String businessEmployeeName;
    //    협력업체 직원 이름
    private String customerEmployeeName;

    //    로케이션 정보
    private String row;
    private String col;
    private String shelf;
}
