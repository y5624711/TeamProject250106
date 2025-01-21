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
    // 설치 요청 데이터 추가
    @Insert("""
            INSERT INTO TB_INSTL_REQ
            (install_request_key, item_common_code, franchise_code, business_employee_no, customer_code, install_request_amount, install_request_note)
            VALUES (#{installRequestKey}, #{itemCommonCode}, #{franchiseCode}, #{businessEmployeeNo}, #{customerCode}, #{installRequestAmount}, #{installRequestNote})
            """)
    @Options(keyProperty = "installRequestKey", useGeneratedKeys = true)
    int installRequest(Install install);

    // 설치 가능한 품목-협럭업체 리스트
    @Select("""
            SELECT i.item_common_code, ic.item_common_name, c.customer_code, c.customer_name
            FROM TB_ITEMMST i 
            LEFT JOIN TB_CUSTMST c ON i.item_common_code = c.item_code
            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
            """)
    List<Map<String, String>> getInstallItemList();

    // 설치 요청 리스트 출력
    @Select("""
            SELECT franchise_name, item_common_name, customer_name, business_employee_no, warehouse_name, install_request_date
            FROM TB_INSTL_REQ i
            LEFT JOIN TB_FRNCHMST f ON i.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
            LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
            LEFT JOIN TB_WHMST w ON i.customer_code = w.customer_code
            """)
    List<Install> getInstallRequest();
}
