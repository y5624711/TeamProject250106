package com.example.backend.mapper.state.instk;

import com.example.backend.dto.state.instk.Instk;
import com.example.backend.dto.state.purchase.Purchase;
import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

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
                    END AS  input_stock_date,
                CASE 
                    WHEN BI.input_consent=TRUE  THEN EM3.employee_name 
                    ELSE NULL
                    END AS  input_stock_employee_name,
                 CASE 
                    WHEN BI.input_consent=TRUE  THEN EM3.employee_no 
                    ELSE NULL
                    END AS  input_stock_employee_no,
                CASE 
                    WHEN BI.input_common_code ='INSTK' THEN PRQ.amount 
                   ELSE 1
                   END AS item_amount ,
                CASE
                    WHEN BI.input_common_code='INSTK'  THEN PRQ.purchase_request_date 
                    WHEN BI.input_common_code='RETRN'  THEN RNRQ.return_request_date
                    ELSE NULL
                    END AS request_date
                        FROM TB_BUYIN BI  
                LEFT JOIN TB_PURCH_APPR PR
                 ON BI.input_common_code = 'INSTK' AND PR.purchase_no = BI.input_no
                LEFT JOIN TB_PURCH_REQ PRQ  
                            ON BI.input_common_code = 'INSTK' AND PRQ.purchase_request_key=PR.purchase_request_key
            
                 LEFT JOIN TB_RTN_APPR RN
                    ON BI.input_common_code = 'RETRN' AND RN.return_no = BI.input_no
                 LEFT JOIN TB_RTN_REQ RNRQ 
                    ON BI.input_common_code ='RETRN' AND RNRQ.return_request_key=RN.return_request_key
            
                  LEFT JOIN TB_EMPMST EM
                    ON (BI.input_common_code = 'INSTK' AND EM.employee_no = PR.customer_employee_no)
                    OR (BI.input_common_code = 'RETRN' AND EM.employee_no = RN.customer_employee_no)
            
                     LEFT JOIN TB_EMPMST EM2
                    ON (BI.input_common_code = 'INSTK' AND EM2.employee_no = PRQ.employee_no)
                    OR (BI.input_common_code = 'RETRN' AND EM2.employee_no = RNRQ.business_employee_no)    
            
                 LEFT JOIN TB_CUSTMST CT ON (CT.customer_code = EM.employee_workplace_code)
                 LEFT JOIN TB_SYSCOMM SC ON SC.common_code = CT.item_code
                 LEFT JOIN TB_SYSCOMM SC2 ON SC2.common_code = BI.input_common_code
            
                LEFT JOIN TB_INSTK INS ON( BI.input_consent=true and  INS.input_key=BI.input_key)                  
                LEFT JOIN TB_ITEMSUB ITS ON (BI.input_consent=true and ITS.serial_no=INS.serial_no)
                LEFT JOIN TB_EMPMST EM3 ON(BI.input_consent=true and EM3.employee_no=INS.customer_employee_no)
                  </script>                              
            """)
    List<Instk> viewBuyInList();


    @Select("""
                select  serial_no
                from  TB_INSTK
                where input_key=#{input_key}
            """)
    List<Integer> getSerialNoByInputKey(int inputKey);

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
}
