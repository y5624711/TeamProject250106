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
        WHEN BI.input_consent=FALSE  THEN EM4.employee_name 
        ELSE NULL
    END AS disapprove_employee_name,
    CASE 
        WHEN BI.input_consent=FALSE  THEN EM4.employee_no 
        ELSE NULL
    END AS disapprove_employee_no,
    CASE 
        WHEN BI.input_consent=FALSE  THEN DISP.disapprove_date 
        ELSE NULL
    END AS disapprove_date ,
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
         ON (BI.input_common_code = 'INSTK' AND PRQ.customer_code = CT.customer_code)
        OR (BI.input_common_code = 'RETRN' AND RNRQ.customer_code = CT.customer_code)    
    LEFT JOIN TB_SYSCOMM SC 
        ON SC.common_code = CT.item_code
    LEFT JOIN TB_SYSCOMM SC2 
        ON SC2.common_code = BI.input_common_code
    LEFT JOIN TB_INSTK INS 
        ON (BI.input_consent = TRUE AND INS.input_key = BI.input_key)
    LEFT JOIN TB_EMPMST EM3 
        ON (BI.input_consent = TRUE AND EM3.employee_no = INS.customer_employee_no)
    LEFT JOIN TB_DISPR DISP
            ON BI.input_consent = FALSE AND DISP.state_request_key = BI.input_key AND (DISP.state_common_code="INSTK")
    LEFT JOIN TB_EMPMST EM4 
            ON BI.input_consent = FALSE AND EM4.employee_no = DISP.disapprove_employee_no

WHERE 1=1
          AND (#{company} IS NULL OR CT.customer_code = #{company})
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
        <choose>
            <when test="type == 'input_common_code_name'">
                AND SC2.common_code_name LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'input_no'">
                AND BI.input_no LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'item_common_name'">
                AND SC.common_code_name LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'customer_name'">
                AND CT.customer_name LIKE CONCAT('%', #{keyword}, '%') 
            </when>
            <when test="type == 'request_employee_name'">
                AND EM2.employee_name LIKE CONCAT('%', #{keyword}, '%')
                OR  EM2.employee_no    LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'input_stock_employee_name'">
                       AND (
                           (BI.input_consent = TRUE AND (
                               EM3.employee_name LIKE CONCAT('%', #{keyword}, '%')
                               OR EM3.employee_no LIKE CONCAT('%', #{keyword}, '%')
                           ))
                           OR
                           (BI.input_consent = FALSE AND (
                               EM4.employee_name LIKE CONCAT('%', #{keyword}, '%')
                               OR EM4.employee_no LIKE CONCAT('%', #{keyword}, '%')
                           ))
                       )
                   </when>
            <otherwise>
                AND (
                    SC2.common_code_name LIKE CONCAT('%', #{keyword}, '%') OR
                    BI.input_no LIKE CONCAT('%', #{keyword}, '%') OR
                    SC.common_code_name LIKE CONCAT('%', #{keyword}, '%') OR
                    CT.customer_name LIKE CONCAT('%', #{keyword}, '%') OR
                    EM2.employee_name LIKE CONCAT('%', #{keyword}, '%') OR
                    EM3.employee_name LIKE CONCAT('%', #{keyword}, '%') OR
                    EM4.employee_name LIKE CONCAT('%', #{keyword}, '%') OR                                   
                )
            </otherwise>
        </choose>
    </if>
        <if test="sort != null and sort != ''">
            <choose>
                <when test="sort == 'combined_date'">
                               ORDER BY COALESCE(INS.input_stock_date,DISP.disapprove_date, request_date ) ${order}
                 </when>
                  <otherwise>
                               ORDER BY ${sort} ${order}
                  </otherwise>
            </choose>
        </if>
        <if test="sort == null or sort == ''">
                ORDER BY COALESCE(INS.input_stock_date,DISP.disapprove_date, request_date) DESC
        </if>
LIMIT #{offset}, 10    
</script>
""")
    List<Instk> viewBuyInList(
            @Param("offset") int offset,
            @Param("state") String state,
            @Param("keyword") String keyword,
            @Param("sort") String sort,
            @Param("order") String order,
            @Param("type")String type, String company);

    @Select("""
            select input_stock_note
            from  TB_INSTK
            where  input_key=#{inputKey}
            """)
    String getInstkNoteByInputKey(int inputKey);



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

    //가입고 상태 false
    @Update("""
        UPDATE TB_BUYIN
        SET input_consent = TRUE
        WHERE input_key = #{inputKey}
       """)
    int updateFalseBuyInConsentByInputKey(int inputKey);

    @Insert("""
            INSERT INTO TB_INSTK
            (input_key, customer_employee_no,input_stock_note)
            VALUES (#{inputKey},#{inputStockEmployeeNo},#{inputStockNote})
            
            """)
    int addInstk(int inputKey, String inputStockNote, String inputStockEmployeeNo);


    // 구매 입고시  창고 주소  
    @Select("""
           SELECT  AR.warehouse_code ,WHMST.warehouse_address 
           FROM TB_PURCH_APPR AR
           LEFT JOIN  TB_WHMST WHMST
           ON AR.warehouse_code=WHMST.warehouse_code
           WHERE purchase_no=#{inputNo}
           """)
    InstkDetail viewWareHouse(String inputNo);

    // 반품 입고시 창고 주소 가져오는 쿼리
    @Select("""
             SELECT  WHM.warehouse_address
           FROM  TB_RTN_APPR APPR
            LEFT JOIN TB_RTN_REQ REQ ON REQ.return_request_key=APPR.return_request_key
            LEFT JOIN TB_WHMST WHM ON WHM.customer_code=REQ.customer_code
             WHERE APPR.return_no=#{inputNo}
         
             """)
    InstkDetail viewReturnWareHouse(String inputNo);

    //입고 상세시 발생해야하는 일들 처리
    @Insert("""
    <script>
        -- 1. 사용 가능한 location_key 찾기
        SELECT location_key INTO @selected_location
        FROM TB_LOCMST 
        WHERE located = FALSE AND warehouse_code = #{warehouseCode}
        ORDER BY row ASC, col ASC, shelf ASC 
        LIMIT 1;

        -- 2. 찾은 location_key를 업데이트
        UPDATE TB_LOCMST
        SET located = TRUE
        WHERE location_key = @selected_location;

        -- 3. 동일한 location_key를 사용하여 INSERT 실행
        INSERT INTO TB_INSTK_SUB (input_key, serial_no, location_key)
        VALUES (#{inputKey}, #{insertSerialNo}, @selected_location);
    </script>
""")
    int addInstkSub(@Param("inputKey") int inputKey, @Param("insertSerialNo") String insertSerialNo, @Param("warehouseCode") String warehouseCode);

    @Insert("""
            <script>
                 INSERT INTO TB_INOUT_HIS
                 (serial_no, warehouse_code, inout_common_code, customer_employee_no, business_employee_no, inout_history_note, inout_no, location_key)
                 VALUES
                 (#{serialNo}, #{warehouseCode}, #{inoutCommonCode}, #{customerEmployeeNo}, #{businessEmployeeNo}, #{inoutHistoryNote}, #{inoutNo},
                 (SELECT location_key FROM TB_INSTK_SUB WHERE serial_no = #{serialNo} AND input_key = #{inputKey} LIMIT 1));
             </script>
            """)
    int addInOutHistory(
            @Param("serialNo") String serialNo,
            @Param("inoutCommonCode") String inoutCommonCode,
            @Param("warehouseCode") String warehouseCode,
            @Param("customerEmployeeNo") String customerEmployeeNo,
            @Param("businessEmployeeNo") String businessEmployeeNo,
            @Param("inoutHistoryNote") String inoutHistoryNote,
            @Param("inoutNo") String inoutNo, int inputKey);

    // 입고 반려 버튼 클릭시 거절
    @Insert("""
            INSERT INTO TB_DISPR
           (state_request_key,state_common_code,disapprove_employee_no,disapprove_note)
           VALUES (#{inputKey},"INSTK",#{disApproveEmployeeNo},#{disApproveNote});
        
            """)
    int rejectInstk(int inputKey, String disApproveEmployeeNo, String disApproveNote);

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
        LEFT JOIN TB_DISPR DISP
            ON BI.input_consent = FALSE AND DISP.state_request_key = BI.input_key
         LEFT JOIN TB_EMPMST EM4 
            ON BI.input_consent = FALSE AND EM4.employee_no = DISP.disapprove_employee_no
        
        WHERE 1=1
                   AND (#{company} IS NULL OR CT.customer_code = #{company})
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
        <choose>
            <when test="type == 'input_common_code_name'">
                AND SC2.common_code_name LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'input_no'">
                AND BI.input_no LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'item_common_name'">
                AND SC.common_code_name LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'customer_name'">
                AND CT.customer_name LIKE CONCAT('%', #{keyword}, '%') 
            </when>
            <when test="type == 'request_employee_name'">
                AND EM2.employee_name LIKE CONCAT('%', #{keyword}, '%')
                OR  EM2.employee_no    LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <when test="type == 'input_stock_employee_name'">
                AND EM3.employee_name LIKE CONCAT('%', #{keyword}, '%')
                AND EM3.employee_no    LIKE CONCAT('%', #{keyword}, '%')
            </when>
            <otherwise>
                AND (
                    SC2.common_code_name LIKE CONCAT('%', #{keyword}, '%') OR
                    BI.input_no LIKE CONCAT('%', #{keyword}, '%') OR
                    SC.common_code_name LIKE CONCAT('%', #{keyword}, '%') OR
                    CT.customer_name LIKE CONCAT('%', #{keyword}, '%') OR
                    EM2.employee_name LIKE CONCAT('%', #{keyword}, '%') OR
                    EM3.employee_name LIKE CONCAT('%', #{keyword}, '%')
                )
            </otherwise>
        </choose>
    </if>
    </script>
""")
    int countByConsent(@Param("state") String state , String keyword, String type, String company);


    // 입고 승인자의 사번을 창고 코드 조회 해오기
    // 주문
    @Select("""
            SELECT WHM.warehouse_code
            FROM TB_BUYIN BI
            LEFT JOIN TB_PURCH_APPR APPR ON APPR.purchase_no=BI.input_no
            LEFT JOIN TB_WHMST  WHM  ON WHM.warehouse_code=APPR.warehouse_code
            WHERE BI.input_key=#{inputKey} 
            """)
    String viewWareHouseCode(int inputKey);

    // 일반입고  창고이름
    @Select("""
            SELECT  WHM.warehouse_name
            FROM TB_BUYIN BI
            LEFT JOIN TB_PURCH_APPR APPR ON APPR.purchase_no=BI.input_no
            LEFT JOIN TB_WHMST  WHM  ON WHM.warehouse_code=APPR.warehouse_code
            WHERE BI.input_key=#{inputKey} 
            """)
    String viewWareHouseName(int inputKey);

    //반품입고 창고이름
    @Select("""
            SELECT  WHM.warehouse_name
            FROM TB_BUYIN BI
            LEFT JOIN TB_RTN_APPR APPR ON APPR.return_no=BI.input_no
            LEFT JOIN TB_RTN_REQ REQ ON REQ.return_request_key=APPR.return_request_key
            LEFT JOIN TB_WHMST WHM ON WHM.customer_code=REQ.customer_code
            WHERE BI.input_key=#{inputKey} 
             """)
    
    String viewReturnWareHouseName(int inputKey);

    @Select("""
            SELECT  WHM.warehouse_code
            FROM TB_BUYIN BI
            LEFT JOIN TB_RTN_APPR APPR ON APPR.return_no=BI.input_no
            LEFT JOIN TB_RTN_REQ REQ ON REQ.return_request_key=APPR.return_request_key
            LEFT JOIN TB_WHMST WHM ON WHM.customer_code=REQ.customer_code
            WHERE BI.input_key=#{inputKey} 
           """)
    String viewRetrunWareHouseCode(int inputKey);

    // 권한 설정 :  로그인 아이디로 회사 코드 가져오기
    @Select("""
            SELECT e.employee_workplace_code
            FROM TB_EMPMST e
                     JOIN TB_CUSTMST c ON e.employee_workplace_code = c.customer_code
            WHERE e.employee_no = #{id}
            """)
    String selectCompanyById(String id);


    @Select("""
        SELECT C.customer_code 
        FROM TB_CUSTMST C 
        WHERE C.customer_name = #{customerName} 
        AND C.customer_code = (
            SELECT E.employee_workplace_code
            FROM TB_EMPMST E 
            WHERE E.employee_no = #{loginEmployeeNo}
        )
        """)
    String  authorityCheck(String loginEmployeeNo, String customerName);

    @Select("""
            SELECT D.disapprove_employee_no,D.disapprove_date,D.disapprove_note,E.employee_name as disapprove_employee_name
            FROM TB_DISPR D 
            JOIN TB_EMPMST E ON D.disapprove_employee_no=E.employee_no
            WHERE state_common_code="INSTK" AND state_request_key=#{inputKey}
            """)
    Instk viewDisapproveByInputKey(int inputKey);
}
