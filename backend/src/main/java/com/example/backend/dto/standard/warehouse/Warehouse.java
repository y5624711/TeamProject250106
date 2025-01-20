package com.example.backend.dto.standard.warehouse;

import lombok.Data;

@Data
public class Warehouse {
    private Integer warehouseKey;
    private String customerCode;
    private String customerEmployeeNo;
    private String warehouseName;
    private String warehouseCode;
    private String warehouseTel;
    private String warehouseAddress;
    private String warehouseAddressDetail;
    private String warehousePost;
    private String warehouseState;
    private String warehouseCity;
    private Boolean warehouseActive;
    private String warehouseNote;
}
