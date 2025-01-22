package com.example.backend.mapper.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface ReturnMapper {

    //반품 관리 리스트
    @Select("""
            <script>  
            SELECT rr.return_request_key, rr.franchise_code, f.franchise_name, ra.return_no, rr.serial_no, item_common_name, 
                   rr.business_employee_no, emb.employee_name AS businessEmployeeName, rr.customer_code, customer_name, 
                   customer_employee_no, emce.employee_name customerEmployeeName, customer_configurer_no, emcc.employee_name customerConfigurerName,
                   return_request_date, return_approve_date, return_consent
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
            WHERE  
            <if test="state == 'all'">
                1=1
            </if>
            <if test="state == 'request'">
                return_consent IS NOT true || false
            </if>
            <if test="state == 'approve'">
                return_consent = true
            </if>
            <if test="state == 'disapprove'">
                return_consent = false
            </if>
            <if test="keyword != null and keyword.trim()!=''">
                AND (
                    <trim prefixOverrides="OR">
                        <if test="type=='all' or type=='franchiseName'">
                            franchise_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='serialNo'">
                            OR rr.serial_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>                                
                        <if test="type=='all' or type=='returnNo'">
                            OR ra.return_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='customerName'">
                            OR customer_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='businessEmployeeNo'">
                            OR rr.business_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='businessEmployeeName'">
                            OR emb.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeNo'">
                            OR ra.customer_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeName'">
                            OR emce.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerConfigurerNo'">
                            OR ra.customer_configurer_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerConfigurerName'">
                            OR emcc.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>             
                    </trim>
                )    
            </if>
            ORDER BY COALESCE(return_approve_date, return_request_date) DESC
            LIMIT #{offset}, 10    
            </script>      
            """)
    List<Return> getReturnList(String state, Integer offset, String type, String keyword, String sort, String order);

    //입출 내역 생기면 franchise도 불러올 수 있음
    @Select("""
            SELECT item_common_name, its.item_common_code, customer_name, customer_code
            FROM TB_ITEMSUB its
            LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
            LEFT JOIN TB_CUSTMST c ON c.item_code = its.item_common_code
            WHERE serial_no=#{serialNo}
            """)
    List<Return> getStandardInfo(String serialNo);

    //요청 저장
    @Insert("""
            INSERT INTO TB_RTN_REQ
            (serial_no, franchise_code, business_employee_no, customer_code, return_consent, return_request_note) 
            VALUES (#{serialNo}, #{franchiseCode}, #{businessEmployeeNo}, #{customerCode}, #{returnConsent}, #{returnRequestNote})
            """)
    int addRequest(Return requestInfo);

    //요청/승인 내용 (1개) 반환
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
            VALUES (#{returnRequestKey}, #{customerConfigurerNo}, #{customerEmployeeNo}, #{returnNo}, #{returnDate}, #{returnApproveNote})
            """)
    int addApprove(Return approveInfo);

    //발주 최대값 조회
    @Select("""
            <script>
                SELECT COALESCE(MAX(CAST(return_no AS UNSIGNED)), 0) AS maxReturnNo
                FROM TB_RTN_APPR
            </script>
            """)
    Integer viewMaxReturnNo();

    @Select("""
            <script>  
            SELECT COUNT(*)
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
            WHERE  
            <if test="state == 'all'">
                1=1
            </if>
            <if test="state == 'request'">
                return_consent IS NOT true || false
            </if>
            <if test="state == 'approve'">
                return_consent = true
            </if>
            <if test="state == 'disapprove'">
                return_consent = false
            </if>
            <if test="keyword != null and keyword.trim()!=''">
                AND (
                    <trim prefixOverrides="OR">
                        <if test="type=='all' or type=='franchiseName'">
                            franchise_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='serialNo'">
                            OR rr.serial_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>                                
                        <if test="type=='all' or type=='returnNo'">
                            OR ra.return_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='customerName'">
                            OR customer_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='businessEmployeeNo'">
                            OR rr.business_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='businessEmployeeName'">
                            OR emb.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeNo'">
                            OR ra.customer_employee_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerEmployeeName'">
                            OR emce.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerConfigurerNo'">
                            OR ra.customer_configurer_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>
                        <if test="type=='all' or type=='customerConfigurerName'">
                            OR emcc.employee_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>             
                    </trim>
                )    
            </if>
            </script>      
            """)
    int countAll(String state, String type, String keyword);
}
