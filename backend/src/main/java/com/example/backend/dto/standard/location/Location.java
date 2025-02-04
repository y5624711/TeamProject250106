package com.example.backend.dto.standard.location;

import lombok.Data;

@Data
public class Location {
    private Integer locationKey;
    private String warehouseCode;
    private String warehouseName;
    private String row;
    private String col;
    private Integer shelf;
    private Boolean located;
    private String locationNote;
    private Boolean locationActive;
}
