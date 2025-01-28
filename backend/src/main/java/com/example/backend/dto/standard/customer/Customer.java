package com.example.backend.dto.standard.customer;

import lombok.Data;

@Data
public class Customer {
    private Integer customerKey;
    private String customerName;
    private String customerCode;
    private String itemCode;
    private String itemName;
    private String customerRep;
    private String customerNo;
    private String customerTel;
    private String customerFax;
    private String customerAddress;
    private String customerAddressDetails;
    private String customerPost;
    private Boolean customerActive;
    private String customerNote;
}
