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
            WHERE i.install_request_consent IS NULL OR i.install_request_consent = 0
            """)
    List<Install> getInstallRequestList();

    // 설치 요청에 대한 정보 가져오기
    @Select("""
            SELECT f.franchise_name, i.item_common_code, ic.item_common_name, i.install_request_amount, f.franchise_address, i.business_employee_no, e.employee_name as business_employee_name, w.warehouse_name, w.warehouse_address, i.install_request_note
            FROM TB_INSTL_REQ i
            LEFT JOIN TB_FRNCHSMST f ON i.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
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
              AND current_common_code='WH'
            ORDER BY item_sub_key DESC
            LIMIT #{num}
            """)
    List<String> getSerials(String itemCommonCode, int num);

    // 가져온 시리얼 번호 리스트를 TB_INSTL_SUB에 삽입
    @Insert("""
            INSERT INTO TB_INSTL_SUB
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

    // 요청 테이블의 승인 여부 false 처리
    @Update("""
            UPDATE TB_INSTL_REQ
            SET install_request_consent = true
            WHERE install_request_key = #{installRequestKey}
            """)
    int updateRequestConsent(Integer installRequestKey);

    // 설치 승인 리스트 출력
    @Select("""
            SELECT ia.install_approve_key, f.franchise_name, ic.item_common_name, ia.output_no, ir.business_employee_no, e1.employee_name as business_employee_name,
            ia.customer_employee_no, e2.employee_name as customer_employee_name, e3.employee_name as customer_installer_name, w.warehouse_name, ia.install_approve_date
            FROM TB_INSTL_APPR ia
            LEFT JOIN TB_INSTL_REQ ir ON ia.install_request_key = ir.install_request_key
            LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON ir.item_common_code = ic.item_common_code
            LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 신청자 조인
            LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
            LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
            LEFT JOIN TB_WHMST w ON ir.customer_code = w.customer_code
            """)
    List<Install> getInstallApproveList();

    // 설치 승인에 대한 정보 가져오기
    @Select("""
            SELECT ia.install_approve_key, f.franchise_name, ic.item_common_name, ia.output_no, f.franchise_code, f.franchise_address, 
            ir.business_employee_no, e1.employee_name as business_employee_name,
            ia.customer_employee_no, e2.employee_name as customer_employee_name,  
            ia.customer_installer_no, e3.employee_name as customer_installer_name, ia.install_approve_note,
            GROUP_CONCAT(ts.serial_no) AS serial_numbers
            FROM TB_INSTL_APPR ia
            LEFT JOIN TB_INSTL_REQ ir ON ia.install_request_key = ir.install_request_key
            LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
            LEFT JOIN TB_ITEMCOMM ic ON ir.item_common_code = ic.item_common_code
            LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 신청자 조인
            LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
            LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
            LEFT JOIN TB_INSTL_SUB ts ON ia.output_no = ts.output_no
            WHERE ia.install_approve_key = #{installKey}
            GROUP BY ia.install_approve_key
            """)
    Install getInstallApproveView(int installKey);

    // 해당 시리얼 번호의 비고 내용 추가
    @Update("""
            UPDATE TB_INSTL_SUB
            SET serial_note = #{serialNote}
            WHERE serial_no = #{serialNo}
            """)
    int addSerialNote(String serialNo, String serialNote);

    // 설치(검수)테이블에 추가
    @Insert("""
            INSERT INTO TB_INSTL_CONF
            (output_no, install_configuration)
            VALUES (#{outputNo}, true)
            """)
    @Options(keyProperty = "installConfigurationKey", useGeneratedKeys = true)
    int addConfiguration(Install install);

    // 시리얼 번호로 입출력 테이블에서 입고된 기록 가져오기(창고 코드)
    @Select("""
            SELECT warehouse_code
            FROM TB_INOUT_HIS
            WHERE serial_no = #{serialNo}
            """)
    String getWarehouseCode(String serialNo);

    // 시리얼 번호 상세에 현재 위치 가맹점으로 변경
    @Update("""
            UPDATE TB_ITEMSUB
            SET current_common_code = 'FRN'
            WHERE serial_no = #{serialNo}
            """)
    int updateSerialCurrent(String serialNo);

    // 품목 입출력 테이블에 데이터 추가
    @Insert("""
            INSERT INTO TB_INOUT_HIS
            (serial_no, warehouse_code, inout_common_code, customer_employee_no, business_employee_no, franchise_code, location_key, inout_history_note)
            VALUES (#{serialNo}, #{warehouseCode}, 'OUT', #{customerEmployeeNo}, #{businessEmployeeNo}, #{franchiseCode}, NULL,  #{inoutHistoryNote})
            """)
    int addOutHistory(Install install);
}
