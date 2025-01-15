package com.example.backend.dto.business;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Business {
    private int business_key;
    private String business_code;
    private String business_name;
    private String business_rep;
    private String business_no;
    private String business_tel;
    private String business_fax;
    private String business_address;
}
