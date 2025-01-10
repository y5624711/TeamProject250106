package com.example.backend.dto.branch;

import lombok.Data;

@Data
public class Branch {
    private Integer branchId;
    private String commonCode;
    private Integer managerId;
    private String branchName;
    private String post;
    private String address;
    private String details;
    private String city1;
    private String city2;
    private String representative;
    private String tel;
    private String fax;
    private String size;
    private boolean active;
    private String note;
}