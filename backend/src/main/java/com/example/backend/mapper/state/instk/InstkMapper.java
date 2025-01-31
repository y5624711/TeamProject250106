package com.example.backend.mapper.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.instk.InstkDetail;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface InstkMapper {

    @Select("""
<script>
SELECT
    BI.input_key,
    BI.input_common_code,
    BI.business_employee_no,
    BI.input_no,
    BI.input_consent,
    BI.input_note, 
    SC2.common_code_name AS input_common_code_name,
    SC.common_code_name AS item_common_name, 
    CT.customer_name as customer_name,
    EM.employee_name as request_approval_employee_name,
    EM.employee_no as request_approval_employee_no,
    EM2.employee_name as request_employee_name,
    EM2.employee_no as request_employee_no,
    CASE 
        WHEN BI.input_consent=TRUE  THEN INS.input_stock_date 
        ELSE NULL
    END AS input_stock_date,
    CASE 
        WHEN BI.input_consent=TRUE  THEN EM3.employee_name 
        ELSE NULL
    END AS input_stock_employee_name,
    CASE 
        WHEN BI.input_consent=TRUE  THEN EM3.employee_no 
        ELSE NULL
    END AS input_stock_employee_no,
    CASE 
        WHEN BI.input_common_code = 'INSTK' THEN PRQ.amount 
        ELSE 1
    END AS item_amount,
    CASE
        WHEN BI.input_common_code='INSTK'  THEN PRQ.purchase_request_date 
        WHEN BI.input_common_code='RETRN'  THEN RNRQ.return_request_date
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
        OR (BI.input_common_code = 'RETRN' AND EM2.employee_no = RNRQ.business_employee_no)    
    LEFT JOIN TB_CUSTMST CT 
        ON CT.customer_code = EM.employee_workplace_code
    LEFT JOIN TB_SYSCOMM SC 
        ON SC.common_code = CT.item_code
    LEFT JOIN TB_SYSCOMM SC2 
        ON SC2.common_code = BI.input_common_code
    LEFT JOIN TB_INSTK INS 
        ON (BI.input_consent = TRUE AND INS.input_key = BI.input_key)
    LEFT JOIN TB_EMPMST EM3 
        ON (BI.input_consent = TRUE AND EM3.employee_no = INS.customer_employee_no)
WHERE 1=1
    <if test="state == 'request'">
        AND input_consent IS NULL
    </if>
    <if test="state == 'approve'">
        AND input_consent = TRUE
    </if>
    <if test="state == 'reject'">
        AND input_consent = FALSE
    </if>
    <if test="keyword != null and keyword != ''">
        AND (
            BI.input_common_code LIKE CONCAT('%', #{keyword}, '%') OR
            BI.input_no LIKE CONCAT('%', #{keyword}, '%') OR
            SC.common_code_name LIKE CONCAT('%', #{keyword}, '%') OR
            CT.customer_name LIKE CONCAT('%', #{keyword}, '%') OR
            INS.input_stock_date LIKE CONCAT('%', #{keyword}, '%') OR
            EM2.employee_name LIKE CONCAT('%', #{keyword}, '%') OR
            EM3.employee_name LIKE CONCAT('%', #{keyword}, '%')
        )
    </if>
ORDER BY 
    CASE WHEN #{sort} = 'default' THEN COALESCE(INS.input_stock_date, RNRQ.return_request_date) END,
    ${sort} ${order}
LIMIT #{offset}, 10    
</script>
""")
    List<Instk> viewBuyInList(
            @Param("offset") int offset,
            @Param("state") String state,
            @Param("keyword") String keyword,
            @Param("sort") String sort,
            @Param("order") String order);


    @Select("""
            select input_stock_note
            from  TB_INSTK
            where   serial_no=#{serialNo}
            """)
    String getInstkNoteByInputKey(int inputKey, Integer serialNo);

    @Insert("""
            INSERT INTO TB_BUYIN
            (input_common_code, business_employee_no, input_no, input_note) 
            VALUES ('RETRN', #{businessEmployeeNo}, #{returnNo}, #{returnApproveNote})
            """)
    int addBuyIn(Return approveInfo);

    // 구매 승인 데이터 가입고 테이블에 넘기기
    @Insert("""
            INSERT INTO TB_BUYIN
            (input_common_code, business_employee_no, input_no, input_note)
            VALUES ('INSTK', #{employeeNo}, #{purchaseNo}, #{purchaseApproveNote})
            """)
    int addPurchaseInfo(Purchase purchase);

    // 가입고 상태변환
    @Update("""
        UPDATE TB_BUYIN
        SET input_consent = TRUE
        WHERE input_key = #{inputKey}
       """)
    int updateBuyInConsentByInputKey(int inputKey);

    @Insert("""
            INSERT INTO TB_INSTK
            (input_key, customer_employee_no,input_stock_note)
            VALUES (#{inputKey},#{inputStockEmployeeNo},#{inputStockNote})
            
            """)
    int addInstk(int inputKey, String inputStockNote, String inputStockEmployeeNo);


    // 구매 입고시  창고 주소  TODO 창고 로케이션도 추가로 해야할거 같은데.
    @Select("""
           SELECT  AR.warehouse_code ,WHMST.warehouse_address 
           FROM TB_PURCH_APPR AR
           LEFT JOIN  TB_WHMST WHMST
           ON AR.warehouse_code=WHMST.warehouse_code
           WHERE purchase_no=#{inputNo}
           """)
    InstkDetail viewWareHouse(String inputNo);

    // 반품 입고시 창고 주소 가져오는 DTO
    @Select("""
             SELECT  APPR.customer_employee_no ,EMPMST.employee_workplace_code, WHMST.warehouse_address
             FROM TB_RTN_APPR APPR
             LEFT JOIN TB_EMPMST EMPMST 
             ON APPR.customer_employee_no=EMPMST.employee_no
             LEFT JOIN TB_WHMST WHMST
             ON EMPMST.employee_workplace_code=WHMST.customer_code
             WHERE APPR.return_no=#{inputNo}
         
             """)
    InstkDetail viewReturnWareHouse(String inputNo);


    // 입고 상세 추가
    @Insert("""
            INSERT  INTO TB_INSTK_SUB
                   (input_key,serial_no)
            VALUES 
             (#{inputKey},#{insertSerialNo})
           """)
    int addInstkSub(int inputKey, String insertSerialNo);

    @Insert("""
            INSERT INTO TB_INOUT_HIS
            (serial_no, warehouse_code,'IN',customer_employee_no,business_employee_no,inout_history_note,inout_no)
            VALUES
            ()
             """)
    int addInOutHistoryy();


    // 입고 반려 버튼 클릭시 거절
    @Update("""
            UPDATE TB_BUYIN
            SET input_consent=FALSE
            WHERE input_key = #{inputKey}
            """)
    int rejectInstk(int inputKey);

    //  입고키 기준 입고 상태 가져오는 쿼리
    @Select("""
            SELECT  input_consent
            FROM TB_BUYIN
            WHERE input_key = #{inputKey}
            """)
    Boolean selectedConsent(int inputKey);

    // 회수 번호로 시리얼 번호 가져오기
    @Select("""
            SELECT REQ.serial_no
            FROM TB_RTN_APPR  APPR
            LEFT JOIN TB_RTN_REQ REQ ON APPR.return_request_key=REQ.return_request_key 
            WHERE return_no=#{inputNo}
            """)

    String getReturnSerialNo(String inputNo);

    // 리스트 총행 세기
    @Select("""
    <script>
        SELECT COUNT(BI.input_key)
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
            OR (BI.input_common_code = 'RETRN' AND EM2.employee_no = RNRQ.business_employee_no)
        LEFT JOIN TB_CUSTMST CT 
            ON CT.customer_code = EM.employee_workplace_code
        LEFT JOIN TB_SYSCOMM SC 
            ON SC.common_code = CT.item_code
        LEFT JOIN TB_SYSCOMM SC2 
            ON SC2.common_code = BI.input_common_code
        LEFT JOIN TB_INSTK INS 
            ON BI.input_consent = TRUE AND INS.input_key = BI.input_key
        LEFT JOIN TB_EMPMST EM3 
            ON BI.input_consent = TRUE AND EM3.employee_no = INS.customer_employee_no
        WHERE 1=1
        <!-- state 조건 -->
        <if test="state == 'request'">
            AND BI.input_consent IS NULL
        </if>
        <if test="state == 'approve'">
            AND BI.input_consent = TRUE
        </if>
        <if test="state == 'reject'">
            AND BI.input_consent = FALSE
        </if>
        <if test="state == 'all'">
            <!-- 아무 조건도 추가하지 않음 -->
        </if>
        <!-- keyword 조건 -->
        <if test="keyword != null and keyword != ''">
            AND (
                BI.input_common_code LIKE CONCAT('%', #{keyword}, '%')                -- BI 테이블의 input_common_code
                OR BI.input_no LIKE CONCAT('%', #{keyword}, '%')                     -- BI 테이블의 input_no
--                OR SC.common_name LIKE CONCAT('%', #{keyword}, '%')                  -- SC 테이블의 item_common_name
                OR CT.customer_name LIKE CONCAT('%', #{keyword}, '%')                -- CT 테이블의 customer_name
                OR INS.input_stock_date LIKE CONCAT('%', #{keyword}, '%')            -- INS 테이블의 input_stock_date
                OR EM2.employee_name LIKE CONCAT('%', #{keyword}, '%')               -- 요청 담당자 이름 (EM2 테이블)
                OR EM3.employee_name LIKE CONCAT('%', #{keyword}, '%')               -- 재고 담당자 이름 (EM3 테이블)
            )
        </if>
    </script>
""")
    int countByConsent(@Param("state") String state , String keyword);


    @Select("""
            SELECT *
            FROM 
            """)
    String viewLocationKey(String inputStockEmployeeNo);
}
