package com.example.backend.dto.stock.stocktaking;

import lombok.Data;

import java.util.List;

@Data
public class StocktakingItem {
    private String serialNo;
    //    창고 위치와 아이템코드로 시리얼번호들 가져올 수 있음
//
    private String itemCode;
    private String itemName;
    private Integer locationKey;
    private String warehouseCode;

    //    입출내역에 들어갈 코드
    private String newStocktakingNo;
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

    // 실사입고: in, 실사출고: out
    private String makeDifference;

    // 새 물품: new, 기존 물품: old, 출고: lost
    private String putStocktakingType;

}
