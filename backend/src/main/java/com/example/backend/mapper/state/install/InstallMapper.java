package com.example.backend.mapper.state.install;

import com.example.backend.dto.state.install.Install;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Options;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface InstallMapper {
    @Insert("""
            INSERT INTO TB_INSTL_REQ
            (install_request_key, item_common_code, franchise_code, business_employee_no, customer_code, install_request_amount, install_request_note)
            VALUES (#{installRequestKey}, #{itemCommonCode}, #{franchiseCode}, #{businessEmployeeNo}, #{customerCode}, #{installRequestAmount}, #{installRequestNote})
            """)
    @Options(keyProperty = "installRequestKey", useGeneratedKeys = true)
    int installRequest(Install install);

    @Select("""
            SELECT i.item_common_code, ic.item_common_name, c.customer_code, c.customer_name
            FROM TB_ITEMMST i LEFT JOIN TB_CUSTMST c ON i.item_common_code = c.item_code
                            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
            """)
    List<Map<String, String>> getInstallItemList();
}
