package com.example.backend.mapper.state.purchase;

import com.example.backend.dto.state.purchase.Purchase;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface PurchaseMapper {

    // 구매 요청
    @Insert("""
            INSERT INTO TB_PURCH_REQ
            (employee_no, item_common_code, customer_code, amount, purchase_request_date, purchase_request_note)
            VALUES (#{employeeNo}, #{itemCommonCode}, #{customerCode}, #{amount}, #{purchaseRequestDate}, #{purchaseRequestNote})
            """)
    @Options(keyProperty = "purchaseRequestKey", useGeneratedKeys = true)
    int purchaseRequest(Purchase purchase);

    // 구매 관리 리스트
    @Select("""
            SELECT
                pr.purchase_request_key AS purchaseRequestKey,
                pr.employee_no AS employeeNo,
                emp1.employee_name AS employeeName,
                cus.customer_name AS customerName,
                pa.customer_employee_no AS customerEmployeeNo,
                emp2.employee_name AS customerEmployeeName,
                ic.item_common_name AS itemCommonName,
                pr.purchase_request_date AS purchaseRequestDate,
                pr.purchase_consent AS purchaseConsent
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key -- TB_PURCH_REQ와 TB_PURCH_APPR 테이블 먼저 조인
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no -- 신청자 사번과 이름 매칭
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no -- 승인자 사번과 이름 매칭
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code -- 협력업체 코드와 이름 매칭
            LEFT JOIN TB_ITEMCOMM ic ON pr.item_common_code = ic.item_common_code -- item_common_code를 기준으로 TB_ITEMCOMM 테이블 조인
            """)
    List<Purchase> purchaseList();

    // 구매 승인 팝업 보기
    @Select("""
            SELECT *
            FROM TB_PURCH_REQ
            WHERE purchase_request_key = #{purchaseRequestKey}
            """)
    Purchase viewPurchaseApprove(int purchaseRequestKey);
}
