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
            (employee_no, item_common_code, customer_code, amount, purchase_request_date, purchase_request_note)
            VALUES (#{employeeNo}, #{itemCommonCode}, #{customerCode}, #{amount}, #{purchaseRequestDate}, #{purchaseRequestNote})
            """)
    @Options(keyProperty = "purchaseRequestKey", useGeneratedKeys = true)
    int purchaseRequest(Purchase purchase);

//    // 구매 관리 리스트
//    @Select("""
//            SELECT
//                pr.purchase_request_key AS purchaseRequestKey,
//                pr.employee_no AS businessEmployeeNo,
//                emp1.employee_name AS businessEmployeeName, -- 신청자 이름
//                pr.supplier_name AS supplierName,
//                pr.approver_employee_no AS customerEmployeeNo,
//                emp2.employee_name AS customerName, -- 승인자 이름
//                pr.item_common_code AS itemCommonCode,
//                pr.purchase_request_date AS purchaseRequestDate,
//                pr.purchase_consent AS purchaseConsent
//            FROM TB_PURCH_REQ pr
//            LEFT JOIN TB_EMPMST emp1 ON pr.business_employee_no = emp1.employee_no
//            LEFT JOIN TB_EMPMST emp2 ON pr.approver_employee_no = emp2.employee_no
//            """)
//    List<Purchase> purchaseList();
}
