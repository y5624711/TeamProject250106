package com.example.backend.mapper.standard.main;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.dto.state.install.Install;
import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.purchase.Purchase;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface MainMapper {


    @Select("""
            <script>
            SELECT
                a.employee_key,
                a.employee_name,
                a.employee_common_code,
                CASE
                    WHEN #{str} = 'BIZ' THEN c.business_name
                    WHEN #{str} = 'CUS' THEN d.customer_name
                    ELSE NULL
                END AS employeeWorkPlaceName,
                a.employee_no,
                a.employee_password,
                a.employee_tel,
                a.employee_note
            FROM
                TB_EMPMST a
                LEFT JOIN  TB_DEPARTMST b
                    ON #{str} = 'BIZ'
                    AND a.employee_workplace_code = b.department_code
                LEFT JOIN TB_BIZMST c
                    ON #{str} = 'BIZ'
                    AND c.business_common_code = b.department_common_code
                LEFT JOIN TB_CUSTMST d
                    ON #{str} = 'CUS'
                    AND a.employee_workplace_code = d.customer_code
            
            WHERE 
                a.employee_no = #{id}
            </script>
            """)
    Employee selectById(String str, String id);

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
            WHERE cus.customer_name =#{company}
            ORDER BY pr.purchase_request_date DESC
            LIMIT 0,3
            """)
    List<Purchase> selectPurchaseListByCustomer(String company);

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
            WHERE emp1.employee_no =#{name}
            ORDER BY pr.purchase_request_date DESC
            LIMIT 0,3
            """)
    List<Purchase> selectPurchaseListByRequester(String name);

    @Select("""
            SELECT DISTINCT ir.install_request_key as installRequestKey,
                ia.install_approve_key,
                f.franchise_name           as franchiseName,
                sc.common_code_name        as itemCommonName,
                c.customer_name            as customerName,
                ir.business_employee_no,
                e1.employee_name           as businessEmployeeName,
                w.warehouse_name           as warehouseName,
                ir.install_request_consent as requestConsent,
                ia.output_no               as outputNo,
                ia.customer_employee_no,
                e2.employee_name           as customerEmployeeName,
                e3.employee_name           as customerInstallerName,
                ia.install_approve_date    as installApproveDate,
                ir.install_request_date    as installRequestDate,
                ia.install_approve_consent as approveConsent,
                COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                                       ir.install_request_date,
                                       ia.install_approve_date) AS installDate
            FROM TB_INSTL_REQ ir
                LEFT JOIN TB_INSTL_APPR ia ON ir.install_request_key = ia.install_request_key
                LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
                LEFT JOIN TB_SYSCOMM sc ON ir.item_common_code = sc.common_code
                LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 요청자 조인
                LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
                LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
                LEFT JOIN TB_CUSTMST c ON sc.common_code = c.item_code
                LEFT JOIN TB_WHMST w ON ir.customer_code = w.customer_code
            WHERE c.customer_name = #{company}
            ORDER BY COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                              ir.install_request_date,
                              ia.install_approve_date) DESC
            LIMIT 0,3
            """)
    List<Install> selectInstallListByCustomer(String company);

    @Select("""
            SELECT DISTINCT ir.install_request_key as installRequestKey,
                ia.install_approve_key,
                f.franchise_name           as franchiseName,
                sc.common_code_name        as itemCommonName,
                c.customer_name            as customerName,
                ir.business_employee_no,
                e1.employee_name           as businessEmployeeName,
                w.warehouse_name           as warehouseName,
                ir.install_request_consent as requestConsent,
                ia.output_no               as outputNo,
                ia.customer_employee_no,
                e2.employee_name           as customerEmployeeName,
                e3.employee_name           as customerInstallerName,
                ia.install_approve_date    as installApproveDate,
                ir.install_request_date    as installRequestDate,
                ia.install_approve_consent as approveConsent,
                COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                                       ir.install_request_date,
                                       ia.install_approve_date) AS installDate
            FROM TB_INSTL_REQ ir
                LEFT JOIN TB_INSTL_APPR ia ON ir.install_request_key = ia.install_request_key
                LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
                LEFT JOIN TB_SYSCOMM sc ON ir.item_common_code = sc.common_code
                LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 신청자 조인
                LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
                LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
                LEFT JOIN TB_CUSTMST c ON sc.common_code = c.item_code
                LEFT JOIN TB_WHMST w ON ir.customer_code = w.customer_code
            WHERE ir.business_employee_no = #{id}
            ORDER BY COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                              ir.install_request_date,
                              ia.install_approve_date) DESC
            LIMIT 0,3
            """)
    List<Install> selectInstallListByRequester(String id);

    @Select("""
            
                        SELECT
                BI.input_key,
                BI.input_common_code,
                BI.business_employee_no,
                BI.input_no,
                BI.input_consent,
                BI.input_note,\s
                SC2.common_code_name AS input_common_code_name,
                SC.common_code_name AS item_common_name,\s
                CT.customer_name AS customer_name,
                EM.employee_name AS request_approval_employee_name,
                EM.employee_no AS request_approval_employee_no,
                EM2.employee_name AS request_employee_name,
                EM2.employee_no AS request_employee_no,
                CASE
                    WHEN BI.input_consent = TRUE THEN INS.input_stock_date\s
                    ELSE NULL
                END AS input_stock_date,
                CASE
                    WHEN BI.input_consent = TRUE THEN EM3.employee_name\s
                    ELSE NULL
                END AS input_stock_employee_name,
                CASE
                    WHEN BI.input_consent = TRUE THEN EM3.employee_no\s
                    ELSE NULL
                END AS input_stock_employee_no,
                CASE
                    WHEN BI.input_common_code = 'INSTK' THEN PRQ.amount\s
                    ELSE 1
                END AS item_amount,
                CASE
                    WHEN BI.input_common_code = 'INSTK' THEN PRQ.purchase_request_date\s
                    WHEN BI.input_common_code = 'RETRN' THEN RNRQ.return_request_date
                    ELSE NULL
                END AS request_date
            FROM TB_BUYIN BI 
                LEFT JOIN TB_PURCH_APPR PR
                    ON BI.input_common_code = 'INSTK' AND PR.purchase_no = BI.input_no
                LEFT JOIN TB_PURCH_REQ PRQ 
                    ON BI.input_common_code = 'INSTK' AND PRQ.purchase_request_key = PR.purchase_request_key
                LEFT JOIN TB_RTN_APPR RN
                    ON BI.input_common_code = 'RETRN' AND RN.return_no = BI.input_no
                LEFT JOIN TB_RTN_REQ RNRQ
                    ON BI.input_common_code = 'RETRN' AND RNRQ.return_request_key = RN.return_request_key
                LEFT JOIN TB_EMPMST EM
                    ON (BI.input_common_code = 'INSTK' AND EM.employee_no = PR.customer_employee_no)
                    OR (BI.input_common_code = 'RETRN' AND EM.employee_no = RN.customer_employee_no)
                LEFT JOIN TB_EMPMST EM2
                    ON (BI.input_common_code = 'INSTK' AND EM2.employee_no = PRQ.employee_no)
                    OR (BI.input_common_code = 'RETRN' AND EM2.employee_no = RNRQ.business_employee_no)   \s
                LEFT JOIN TB_CUSTMST CT
                    ON CT.customer_code = EM.employee_workplace_code
                LEFT JOIN TB_SYSCOMM SC
                    ON SC.common_code = CT.item_code  -- 이 부분 확인 필요
                LEFT JOIN TB_SYSCOMM SC2
                    ON SC2.common_code = BI.input_common_code
                LEFT JOIN TB_INSTK INS
                    ON INS.input_key = BI.input_key  -- 수정
                LEFT JOIN TB_EMPMST EM3
                    ON EM3.employee_no = INS.customer_employee_no  -- 수정
            WHERE EM.employee_no = #{name}
            ORDER BY COALESCE(INS.input_stock_date, RNRQ.return_request_date)  -- 수정
            LIMIT 3;  -- 수정
            """)
    List<Instk> selectInstkList(String name);

    @Select("""
            SELECT COUNT(*)
            FROM TB_PURCH_REQ
            WHERE employee_no=#{id};
            """)
    int selectByRequester(String id);

    @Select("""
            SELECT COUNT(*)
            FROM TB_INSTL_REQ
            WHERE business_employee_no = #{auth}
            """)
    int selectInstallByRequseter(String auth);
}
