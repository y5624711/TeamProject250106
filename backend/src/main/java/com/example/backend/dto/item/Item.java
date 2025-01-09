package com.example.backend.dto.item;

import lombok.Data;

@Data
public class Item {
    private Integer itemId;
    private String itemCode;
    private String itemName;
    private String commonCode;
    private Integer partnerId;
    private Integer managerId;
    private String itemType;
    private String size;
    private String unit;
    private Integer inPrice;
    private Integer outPrice;
    private Integer tax;
    private Integer minimumStock;
    private Boolean active;
    private String note;
}
