package com.example.backend.dto.Franchise;

import lombok.Data;

@Data
public class Franchise {
    private Integer franchiseKey;
    private String businessEmployeeNo;
    private String franchiseCode;
    private String franchiseName;
    private String franchiseRep;
    private String franchiseNo;
    private String franchiseTel;
    private String franchiseAddress;
    private String franchiseAddressDetail;
    private String franchisePost;
    private String franchiseState;
    private String franchiseCity;
    private boolean franchiseActive;
    private String franchiseNote;
}