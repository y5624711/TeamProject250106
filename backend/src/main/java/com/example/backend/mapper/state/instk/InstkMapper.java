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
    BI.input_note
    <if test="BI.input_common_code == 'INSTK' or BI.input_common_code == 'RETRN'">
    , IT.item_common_name
    , CT.customer_name
    </if>
FROM TB_BUYIN BI
<choose>
    <when test="BI.input_common_code == 'INSTK'">
        LEFT JOIN TB_PURCH_APPR PR ON PR.purchase_no = BI.input_no
        LEFT JOIN TB_EMPMST EM ON EM.employee_no = BI.business_employee_no
        LEFT JOIN TB_CUSTMST CT ON CT.customer_code = EM.employee_workplace_code
        LEFT JOIN TB_ITEMCOMM IT ON IT.item_common_code = CT.item_code
    </when>
    <when test="BI.input_common_code == 'RETRN'">
        LEFT JOIN TB_RTN_APPR RN ON RN.return_no = BI.input_no
        LEFT JOIN TB_EMPMST EM ON EM.employee_no = BI.business_employee_no
        LEFT JOIN TB_CUSTMST CT ON CT.customer_code = EM.employee_workplace_code
        LEFT JOIN TB_ITEMCOMM IT ON IT.item_common_code = CT.item_code
    </when>
</choose>
</script>
""")
    List<Instk> viewBuyInList();



}
