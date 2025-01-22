package com.example.backend.dto.state.instk;

import lombok.Data;

@Data
public class Instk {
    private int inputKey;
    private String inputCommonCode;
    private String inputNo;
    private String businessEmployeeNo;
    private boolean inputConsent;
    private String inputNote;
    private String itemCommonName;
    private String customerName;
    private String itemAmount;
    private String requestDate;


}
