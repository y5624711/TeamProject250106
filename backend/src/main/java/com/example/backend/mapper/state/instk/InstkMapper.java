package com.example.backend.mapper.state.instk;

import com.example.backend.dto.state.instk.Instk;
import lombok.RequiredArgsConstructor;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
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
    SC.common_code AS item_common_code, 
    SC.common_code_name AS item_common_name, 
    CT.customer_name as customer_name,
    EM.employee_name as request_approval_employee_name,
    EM2.employee_name as request_employee_name,
   <if test="BI.input_consent==true">
    CASE 
        WHEN BI.input_consent=TRUE  THEN INS.input_stock_date 
        ELSE NULL
        END AS  input_stock_date,
    </if>
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
      <if test="BI.input_consent==true">
        LEFT JOIN TB_INSTK INS ON( INS.input_key=Bi.input_key)                  
        LEFT JOIN TB_ITEMSUB ITS ON (ITS.serial_no=INS.serial_no)
      </if>
            
      </script>                              
""")
    List<Instk> viewBuyInList();



}
