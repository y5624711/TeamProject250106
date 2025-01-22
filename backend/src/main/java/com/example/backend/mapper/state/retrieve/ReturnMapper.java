package com.example.backend.mapper.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ReturnMapper {


    @Select("""
            SELECT rr.return_request_key, rr.franchise_code, f.franchise_name, ra.return_no, rr.serial_no, item_common_name, 
                   rr.business_employee_no, employee_name AS businessEmployeeName, rr.customer_code, customer_name, ra.customer_employee_no,
                   return_date, return_consent
            FROM TB_RTN_REQ rr
            LEFT JOIN TB_RTN_APPR ra
            ON ra.return_request_key = rr.return_request_key
            LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
            LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
            LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
            LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
            LEFT JOIN TB_EMPMST em ON em.employee_no = rr.business_employee_no
            """)
    List<Return> getReturnList();

    //입출 내역 생기면 franchise도 불러올 수 있음
    @Select("""
            SELECT item_common_name, its.item_common_code, customer_name, customer_code
            FROM TB_ITEMSUB its
            LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
            LEFT JOIN TB_CUSTMST c ON c.item_code = its.item_common_code
            WHERE serial_no=#{serialNo}
            """)
    List<Return> getStandardInfo(String serialNo);

    @Insert("""
            INSERT INTO TB_RTN_REQ
            (serial_no, franchise_code, business_employee_no, customer_code, return_consent, return_request_note) 
            VALUES (#{serialNo}, #{franchiseCode}, #{businessEmployeeNo}, #{customerCode}, #{returnConsent}, #{returnRequestNote})
            """)
    int addRequest(Return requestInfo);

    @Select("""
            SELECT rr.return_request_key, rr.franchise_code, f.franchise_name, ra.return_no, rr.serial_no, item_common_name, 
                   rr.business_employee_no, emb.employee_name AS businessEmployeeName, customer_employee_no, emce.employee_name AS customerEmployeeName, 
                   customer_configurer_no, emcc.employee_name AS customerConfigurerName, rr.customer_code, customer_name, ra.customer_employee_no,
                   return_request_date, return_approve_date,return_date, return_consent, return_request_note
            FROM TB_RTN_REQ rr
            LEFT JOIN TB_RTN_APPR ra
            ON ra.return_request_key = rr.return_request_key
            LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
            LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
            LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
            LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
            LEFT JOIN TB_EMPMST emb ON emb.employee_no = rr.business_employee_no
            LEFT JOIN TB_EMPMST emce ON emce.employee_no = ra.customer_employee_no    
            LEFT JOIN TB_EMPMST emcc ON emcc.employee_no = ra.customer_configurer_no    
            WHERE rr.return_request_key = #{returnRequestKey}
            """)
    List<Return> getRequestInfo(String returnRequestKey);

    //return consent 승인으로 변경
    @Update("""
            UPDATE TB_RTN_REQ
            SET return_consent=true
            WHERE return_request_key=#{returnRequestKey}
            """)
    int changeConsent(Integer returnRequestKey);

    //승인 정보 테이블에 추가
    @Insert("""
            INSERT INTO TB_RTN_APPR
            (return_request_key, customer_configurer_no, customer_employee_no, return_no, return_date, return_approve_note) 
            VALUES (#{returnRequestKey}, #{customerConfigurerNo}, #{customerEmployeeNo}, #{returnNo}, #{returnDate} #{returnApproveNote})
            """)
    int addApprove(Return approveInfo);
}
