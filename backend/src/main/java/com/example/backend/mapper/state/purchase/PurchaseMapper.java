package com.example.backend.mapper.state.purchase;

import com.example.backend.dto.standard.item.Item;
import com.example.backend.dto.state.purchase.Purchase;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface PurchaseMapper {

    // 품목 구분 코드 리스트 가져오기
    @Select("""
            SELECT ite.item_common_code AS item_common_code,
                   sys.common_code_name AS item_common_name
            FROM TB_ITEMMST ite
            LEFT JOIN TB_SYSCOMM sys ON ite.item_common_code = sys.common_code
            WHERE ite.item_active = 1  -- 품목에서 사용중인 것만 가져오기
            ORDER BY BINARY(item_common_name)
            """)
    List<Map<String, Object>> getItemCommonCodeList();

    // 해당 품목을 담당하는 협력 업체 이름, 가격 가져오기
    @Select("""
            SELECT cus.customer_name, cus.customer_code, ite.input_price
            FROM TB_CUSTMST cus
            LEFT JOIN TB_ITEMMST ite ON cus.item_code = ite.item_common_code
            WHERE item_code = #{itemCommonCode}
            """)
    List<Item> getCustomerName(String itemCommonCode);

    // 구매 요청
    @Insert("""
            INSERT INTO TB_PURCH_REQ
            (employee_no, item_common_code, customer_code, amount, purchase_request_note)
            VALUES (#{employeeNo}, #{itemCommonCode}, #{customerCode}, #{amount}, #{purchaseRequestNote})
            """)
    @Options(keyProperty = "purchaseRequestKey", useGeneratedKeys = true)
    int purchaseRequest(Purchase purchase);

    // 구매 관리 리스트
    @Select("""
            <script>
            SELECT
                pr.purchase_request_key AS purchaseRequestKey,
                pr.employee_no AS employeeNo,
                emp1.employee_name AS employeeName,
                cus.customer_name AS customerName,
                pa.customer_employee_no AS customerEmployeeNo,
                emp2.employee_name AS customerEmployeeName,
                sys.common_code_name AS itemCommonName,
                pr.purchase_request_date AS purchaseRequestDate,
                pr.purchase_consent AS purchaseConsent,
                pa.purchase_approve_date AS purchaseApproveDate,
                emp3.employee_name AS disapproveEmployeeName,
                COALESCE(
                        GREATEST(pr.purchase_request_date, pa.purchase_approve_date, dis.disapprove_date),
                        pr.purchase_request_date,
                        pa.purchase_approve_date,
                        dis.disapprove_date
                    ) AS purchaseDate
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code
            LEFT JOIN TB_SYSCOMM sys ON pr.item_common_code = sys.common_code
            LEFT JOIN (SELECT * FROM TB_DISPR WHERE state_common_code='PURCH') dis ON pr.purchase_request_key = dis.state_request_key
            LEFT JOIN TB_EMPMST emp3 ON emp3.employee_no = dis.disapprove_employee_no
            WHERE
            <if test="state == 'all'">
                (1=1 || purchase_consent IS NOT TRUE || purchase_consent IS NOT FALSE)
            </if>
            <if test="state == 'request'">
                purchase_consent IS NULL
            </if>
            <if test="state == 'approve'">
                purchase_consent = TRUE
            </if>
            <if test="state == 'disapprove'">
                purchase_consent = FALSE
            </if>
            <!-- company 값에 따라 조건 추가 -->
            <if test="company != null">
                <choose>
                        <when test="company.startsWith('CUS')">
                             AND pr.customer_code = #{company}
                        </when>
                        <when test="company.startsWith('BIZ')">
                            AND 1=1
                        </when>
                </choose>
            </if>
            <if test="keyword != null and keyword.trim()!=''">
                AND (
                    <trim prefixOverrides="OR">
                        <if test="type=='all' or type=='customerName'">
                            cus.customer_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='itemCommonName'">
                            OR sys.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='employeeName'">
                            OR emp1.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR pr.employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeName'">
                            OR emp2.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR pa.customer_employee_no LIKE CONCAT('%', #{keyword}, '%')
                            OR emp3.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR disapprove_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                    </trim>
                    )
            </if>
            <if test="sort != null and sort != ''">
                    ORDER BY ${sort} ${order}
            </if>
            <if test="sort == null or sort == ''">
                ORDER BY purchaseDate DESC
            </if>
            LIMIT #{offset}, 10
            </script>
            """)
    List<Purchase> getPurchaseList(Integer offset, String type, String keyword, String state, String sort, String order, String company);

    // 총 데이터 개수 (페이지네이션을 위해 사용)
    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code
            LEFT JOIN TB_SYSCOMM sys ON pr.item_common_code = sys.common_code
            LEFT JOIN (SELECT * FROM TB_DISPR WHERE state_common_code='PURCH') dis ON pr.purchase_request_key = dis.state_request_key
            LEFT JOIN TB_EMPMST emp3 ON emp3.employee_no = dis.disapprove_employee_no
            WHERE
            <if test="state == 'all'">
                (1=1 || purchase_consent IS NOT TRUE || purchase_consent IS NOT FALSE)
            </if>
            <if test="state == 'request'">
                purchase_consent IS NULL
            </if>
            <if test="state == 'approve'">
                purchase_consent = true
            </if>
            <if test="state == 'disapprove'">
                purchase_consent = false
            </if>
            <!-- company 값에 따라 조건 추가 -->
            <if test="company != null">
                <choose>
                        <when test="company.startsWith('CUS')">
                             AND pr.customer_code = #{company}
                        </when>
                        <when test="company.startsWith('BIZ')">
                            AND 1=1
                        </when>
                </choose>
            </if>
            <if test="keyword != null and keyword.trim()!=''">
                AND (
                    <trim prefixOverrides="OR">
                        <if test="type=='all' or type=='customerName'">
                            cus.customer_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='itemCommonName'">
                            OR sys.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='employeeName'">
                            OR emp1.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR pr.employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeName'">
                            OR emp2.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR pa.customer_employee_no LIKE CONCAT('%', #{keyword}, '%')
                            OR emp3.employee_name LIKE CONCAT('%', #{keyword}, '%')
                            OR disapprove_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                    </trim>
                    )
            </if>
            </script>
            """)
    Integer countAll(String type, String keyword, String state, String company);

    // 구매 승인 팝업 보기
    @Select("""
            SELECT
                pr.purchase_request_key AS purchaseRequestKey,
                pr.employee_no AS employeeNo,
                emp1.employee_name AS employeeName,
                pr.customer_code AS customerCode,
                cus.customer_name AS customerName,
                pa.customer_employee_no AS customerEmployeeNo,
                emp2.employee_name AS customerEmployeeName,
                sys.common_code_name AS itemCommonName,
                pr.purchase_request_date AS purchaseRequestDate,
                pr.purchase_request_note AS purchaseRequestNote,
                pr.amount AS amount,
                ite.input_price * pr.amount AS totalPrice,
                pr.purchase_consent AS purchaseConsent,
                wh.warehouse_code AS warehouseCode,
                wh.warehouse_name AS warehouseName,
                pa.purchase_no AS purchaseNo,
                pa.purchase_approve_date AS purchaseApproveDate,
                pa.purchase_approve_note AS purchaseApproveNote
            FROM TB_PURCH_REQ pr
            LEFT JOIN TB_PURCH_APPR pa ON pr.purchase_request_key = pa.purchase_request_key
            LEFT JOIN TB_EMPMST emp1 ON pr.employee_no = emp1.employee_no
            LEFT JOIN TB_EMPMST emp2 ON pa.customer_employee_no = emp2.employee_no
            LEFT JOIN TB_CUSTMST cus ON pr.customer_code = cus.customer_code
            LEFT JOIN TB_SYSCOMM sys ON pr.item_common_code = sys.common_code
            LEFT JOIN TB_WHMST wh ON cus.customer_code = wh.customer_code
            LEFT JOIN TB_ITEMMST ite ON cus.item_code = ite.item_common_code
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
            SELECT COALESCE(MAX(CAST(SUBSTRING(purchase_no, 4) AS UNSIGNED)), 0) AS maxNumber
            FROM TB_PURCH_APPR
            WHERE purchase_no LIKE 'PUR%'
            AND purchase_no REGEXP '^[A-Za-z]+[0-9]+$'
            """)
    Long viewMaxPurchaseNo();

    // 상태 현황 업데이트
    @Update("""
            UPDATE TB_PURCH_REQ
            SET purchase_consent = TRUE
            WHERE purchase_request_key = #{purchaseRequestKey}
            """)
    int updatePurchaseConsent(Integer purchaseRequestKey);

    // 구매 승인 반려
    @Update("""
            UPDATE TB_PURCH_REQ
            SET purchase_consent = FALSE
            WHERE purchase_request_key = #{purchaseRequestKey};
            """)
    int disapprovePurchase(Integer purchaseRequestKey);

    // 구매 승인 반려에 값 인서트
    @Insert("""
            INSERT INTO TB_DISPR
            (state_request_key, state_common_code, disapprove_employee_no, disapprove_note)
            VALUES (#{purchaseRequestKey}, 'PURCH', #{disapproveEmployeeNo}, #{purchaseApproveNote})
            """)
    int insetDisapprove(Purchase purchase);

    // 반려 데이터 가져오기
    @Select("""
            SELECT dis.disapprove_employee_no AS disapproveEmployeeNo,
                   emp.employee_name AS disapproveEmployeeName,
                   dis.disapprove_date AS disapproveDate,
                   dis.disapprove_note AS disapproveNote
            FROM TB_DISPR dis
            LEFT JOIN TB_EMPMST emp ON dis.disapprove_employee_no = emp.employee_no
            WHERE state_request_key = #{purchaseRequestKey}
            AND state_common_code = 'PURCH'
            """)
    Purchase getPurchaseDisapprove(int purchaseRequestKey);
}