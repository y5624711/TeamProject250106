package com.example.backend.mapper.standard.main;

import com.example.backend.dto.standard.employee.Employee;
import com.example.backend.dto.state.install.Install;
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
            WHERE emp1.employee_no =#{id}
            ORDER BY pr.purchase_request_date DESC
            LIMIT 0,3
            """)
    List<Purchase> selectPurchaseList(String name);

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
            WHERE e1.employee_no = #{id}
            ORDER BY COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                              ir.install_request_date,
                              ia.install_approve_date) DESC
            LIMIT 0,3
            """)
    List<Install> selectInstallList(String auth);
}
