package com.example.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Partner {
    private Integer partnerId;
    private String commonCode;
    private String productCode;
    private String managerId;
    private String partnerName;
    private String post;
    private String address;
    private String details;
    private String city1;
    private String city2;
    private String representative;
    private String tel;
    private String fax;
    private LocalDate startDate;
    private LocalDate endDate;
    private Boolean active;
    private String note;
}
