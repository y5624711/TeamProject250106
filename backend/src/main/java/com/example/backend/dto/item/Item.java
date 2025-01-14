package com.example.backend.dto.item;

import lombok.Data;

@Data
public class Item {
    private Integer itemKey;
    private String itemCommonCode;
    private String itemName;
    private String customerCode;
    private Integer inputPrice;
    private Integer outputPrice;
    private String size;
    private String unit;
    private Boolean itemActive;
    private String itemNote;

    private String itemCommonName;
    private String customerName;
}
