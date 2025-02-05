package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

import java.util.List;

@Data
public class StocktakingItem {
    private String serialNo;
    //    창고 위치와 아이템코드로 시리얼번호들 가져올 수 있음
//
    private Integer locationKey;

    //    로케이션 키 리스트
    private List<Integer> locationKeyList;
    //    행 리스트
    private List<String> rowList;
    private String row;
    //    열 리스트
    private List<String> colList;
    private String col;
    //    단 리스트
    private List<Integer> shelfList;
    private Integer shelf;
    private Boolean stockMinusState;
    //    true, false 로 구분하여 if문에 따라 코드입력값 달라지게
    private Boolean stockPlusState;

}
