package com.example.backend.mapper.state.purchase;

import com.example.backend.dto.state.purchase.Purchase;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface PurchaseMapper {

    // 품목 구분 코드 리스트 가져오기
    @Select("""
            SELECT cus.item_code AS item_common_code,
                   sys.common_code_name AS item_common_name
            FROM TB_CUSTMST cus
            LEFT JOIN TB_SYSCOMM sys ON cus.item_code = sys.common_code
            ORDER BY BINARY(item_common_name)
            """)
    List<Map<String, String>> getItemCommonCodeList();

    // 구매 신청
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
                sys.common_code_name AS itemCommonName,
                pr.purchase_request_date AS purchaseRequestDate,
                pr.purchase_consent AS purchaseConsent
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code
            LEFT JOIN TB_SYSCOMM sys ON pr.item_common_code = sys.common_code
            """)
    List<Purchase> purchaseList();

    // 구매 승인 팝업 보기
    @Select("""
            SELECT
                pr.purchase_request_key AS purchaseRequestKey,
                pr.employee_no AS employeeNo,
                emp1.employee_name AS employeeName,
                cus.customer_name AS customerName,
                pa.customer_employee_no AS customerEmployeeNo,
                emp2.employee_name AS customerEmployeeName,
                sys.common_code_name AS itemCommonName,
                pr.purchase_request_date AS purchaseRequestDate,
                pr.purchase_request_note AS purchaseRequestNote,
                pr.amount AS amount,
                pr.purchase_consent AS purchaseConsent,
                wh.warehouse_code AS warehouseCode,
                wh.warehouse_name AS warehouseName
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code
            LEFT JOIN TB_SYSCOMM sys ON pr.item_common_code = sys.common_code
            LEFT JOIN TB_WHMST wh ON cus.customer_code = wh.customer_code
            WHERE pr.purchase_request_key = #{purchaseRequestKey}
            """)
    Purchase viewPurchaseApprove(int purchaseRequestKey);

    // 구매 승인
    @Insert("""
            INSERT INTO TB_PURCH_APPR
            (purchase_request_key, customer_employee_no, warehouse_code, purchase_no, purchase_approve_date, purchase_approve_note)
            VALUES (#{purchaseRequestKey}, #{customerEmployeeNo}, #{warehouseCode}, #{purchaseNo}, NOW(), #{purchaseApproveNote})
            """)
    int purchaseApprove(Purchase purchase);

    // 기존 발주 번호에서 최대 번호 조회
    @Select("""
            SELECT MAX(CAST(purchase_no AS UNSIGNED))
            FROM TB_PURCH_APPR
            """)
    Long viewMaxPurchaseNo();

    // 상태 현황 업데이트
    @Update("""
            UPDATE TB_PURCH_REQ
            SET purchase_consent = TRUE
            WHERE purchase_request_key = #{purchaseRequestKey}
            """)
    int updatePurchaseConsent(Integer purchaseRequestKey);
}
