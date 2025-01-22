package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class Stocktaking {
    private Integer stocktakingKey;
    private String itemCode;
    private String warehouseCode;
    private Integer locationKey;
    private String customerEmployeeNo;
    private Integer countCurrent;
    private Integer countConfiguration;
    private LocalDateTime stocktakingDate;

    //    창고명
    private String warehouseName;
    //    품목명
    private String itemName;
    //    협력사 직원 이름
    private String customerEmployeeName;
    //    전화번호
    private String employeeTel;

}
