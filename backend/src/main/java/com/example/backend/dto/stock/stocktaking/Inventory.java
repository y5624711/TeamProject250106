package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

@Data
public class Inventory {
    private Integer itemCurrentKey;
    private String itemCode;
    private String itemCurrentCommonCode;
    private String customerName;
    private Integer count;
}
