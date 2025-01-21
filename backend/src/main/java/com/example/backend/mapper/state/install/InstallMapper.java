package com.example.backend.mapper.state.install;

import com.example.backend.dto.state.install.Install;
import org.apache.ibatis.annotations.*;

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
            SELECT i.install_request_key, f.franchise_name, ic.item_common_name, c.customer_name, i.business_employee_no, e.employee_name as business_employee_name, w.warehouse_name, i.install_request_date
            FROM TB_INSTL_REQ i
            LEFT JOIN TB_FRNCHSMST f ON i.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
            LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
            LEFT JOIN TB_EMPMST e ON i.business_employee_no = e.employee_no
            LEFT JOIN TB_WHMST w ON i.customer_code = w.customer_code
            """)
    List<Install> getInstallRequestList();

    // 설치 요청에 대한 정보 가져오기
    @Select("""
            SELECT f.franchise_name, i.item_common_code, ic.item_common_name, i.install_request_amount, f.franchise_address, i.business_employee_no, e.employee_name as business_employee_name, w.warehouse_name, w.warehouse_address, i.install_request_note
            FROM TB_INSTL_REQ i
            LEFT JOIN TB_FRNCHSMST f ON i.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
            LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
            LEFT JOIN TB_EMPMST e ON i.business_employee_no = e.employee_no
            LEFT JOIN TB_WHMST w ON i.customer_code = w.customer_code
            WHERE i.install_request_key = #{installKey}
            """)
    List<Install> getInstallRequestView(int installKey);

    // 설치 기사 사번으로 이름 가져오기
    @Select("""
            SELECT employee_name as customer_installer_name
            FROM TB_EMPMST
            WHERE employee_no = #{customerInstallerNo}
            """)
    String getCustomerInstaller(String customerInstallerNo);

    // 출고 번호 등록
    @Select("""
            <script>
                SELECT COALESCE(MAX(CAST(SUBSTRING(output_no, 4) AS UNSIGNED)), 0) AS maxNumber
                FROM TB_INSTL_APPR
                WHERE output_no LIKE CONCAT(#{outputCode}, '%')
                AND output_no REGEXP '^[A-Za-z]+[0-9]+$'
            </script>
            """)
    Integer viewMaxOutputNo(String outputCode);

    // 설치 승인 테이블에 추가
    @Insert("""
            INSERT INTO TB_INSTL_APPR
            (install_approve_key, install_request_key, customer_employee_no, customer_installer_no, output_no, install_schedule_date, install_approve_note)
            VALUES (#{installApproveKey}, #{installRequestKey}, #{customerEmployeeNo}, #{customerInstallerNo}, #{outputNo}, #{installScheduleDate}, #{installApproveNote})
            """)
    @Options(keyProperty = "installApproveKey", useGeneratedKeys = true)
    int installApprove(Install install);

    // 설치 요청에서 수량만큼 시리얼 번호 가져오기
    @Select("""
            SELECT serial_no
            FROM TB_ITEMSUB
            WHERE item_common_code = #{itemCommonCode}
              AND item_sub_active = 1
            ORDER BY item_sub_key DESC
            LIMIT #{num}
            """)
    List<String> getSerials(String itemCommonCode, int num);

    // 가져온 시리얼 번호 리스트를 TB_INSTL_SUB에 삽입
    @Insert("""
            Insert INTO TB_INSTL_SUB
            (output_no, serial_no)
            VALUES ( #{outputNo}, #{serialNo})
            """)
    @Options(keyProperty = "installSubKey", useGeneratedKeys = true)
    int addSerialToApprove(Install install);

    // ITEM_SUB에서 해당 시리얼 번호 품목의 active 값을 0으로 업데이트
    @Update("""
            UPDATE TB_ITEMSUB
            SET item_sub_active = 0
            WHERE serial_no = #{serialNo}
            """)
    int updateItemSubActive(String serialNo);
}
