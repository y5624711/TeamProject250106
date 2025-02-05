package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

import java.util.List;

@Data
public class StocktakingItem {
    private String serialNo;
    //    창고 위치와 아이템코드로 시리얼번호들 가져올 수 있음
//
    private Integer locationKey;

    private List<Integer> locationKeyList;

    private Boolean stockMinusState;
    //    true, false 로 구분하여 if문에 따라 코드입력값 달라지게
    private Boolean stockPlusState;

}
