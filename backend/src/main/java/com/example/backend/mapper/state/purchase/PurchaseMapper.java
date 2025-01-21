package com.example.backend.mapper.state.purchase;

import com.example.backend.dto.state.purchase.Purchase;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;

@Mapper
public interface PurchaseMapper {

    // 구매 요청
    @Insert("""
            INSERT INTO TB_PURCH_REQ
            (business_employee_no, item_common_code, customer_code, amount, purchase_request_date, purchase_request_note) 
            VALUES (#{businessEmployeeNo}, #{itemCommonCode}, #{customerCode}, #{amount}, #{purchaseRequestDate}, #{purchaseRequestNote})
            """)
    @Options(keyProperty = "purchaseRequestKey", useGeneratedKeys = true)
    int purchaseRequest(Purchase purchase);
}
