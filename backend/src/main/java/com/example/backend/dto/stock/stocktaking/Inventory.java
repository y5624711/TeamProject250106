package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

@Data
public class Inventory {
    private Integer itemCurrentKey;
    private String itemCode;
    private String wareHouseCode;
    private String commonCodeName;
    private String wareHouseName;
    private String wareHouseCity;
    private String wareHouseAddress;
    private String wareHouseAddressDetail;
    private String customerName;
    private Integer count;
}
