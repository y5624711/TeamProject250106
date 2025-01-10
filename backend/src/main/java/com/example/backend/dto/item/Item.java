package com.example.backend.dto.item;

import lombok.Data;

@Data
public class Item {
    private Integer itemId;
    private String itemCode;
    private Integer partnerId;
    private Integer managerId;
    private String itemName;
    private String size;
    private String unit;
    private Integer inPrice;
    private Integer outPrice;
    private Integer tax;
    private Integer minimumStock;
    private Boolean active;
    private String note;

    private String commonCode;
    private String itemCodeName;
    private String partnerName;
    private String managerName;
    private Integer itemCurrentCount;
}
