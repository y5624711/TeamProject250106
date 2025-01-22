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

SELECT
    BI.input_key,
    BI.input_common_code,
    BI.business_employee_no,
    BI.input_no,
    BI.input_consent,
    BI.input_note, 
    IT.item_common_name AS item_common_name, 
    CT.customer_name as customer_name
            FROM TB_BUYIN BI  
    LEFT JOIN TB_PURCH_APPR PR
     ON BI.input_common_code = 'INSTK' AND PR.purchase_no = BI.input_no
    LEFT JOIN TB_PURCH_REQ PRQ  
                ON BI.input_common_code = 'INSTK' AND PRQ.purchase_request_key=PR.purchase_request_key
     LEFT JOIN TB_RTN_APPR RN
        ON BI.input_common_code = 'RETRN' AND RN.return_no = BI.input_no
      LEFT JOIN TB_EMPMST EM
        ON (BI.input_common_code = 'INSTK' AND BI.input_consent=true AND EM.employee_no = PR.customer_employee_no)
        OR (BI.input_common_code = 'RETRN' AND EM.employee_no = RN.customer_employee_no)                       
     LEFT JOIN TB_CUSTMST CT ON (CT.customer_code = EM.employee_workplace_code)
     LEFT JOIN TB_ITEMCOMM IT ON IT.item_common_code = CT.item_code
                                                                

""")
    List<Instk> viewBuyInList();



}
