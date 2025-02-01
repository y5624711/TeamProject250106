package com.example.backend.mapper.stock.inoutHistory;

import com.example.backend.dto.stock.inoutHistory.InoutHistory;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InoutHistoryMapper {

    @Select("""
            <script>
            SELECT
                h.inout_history_key,
                h.serial_no,
                h.warehouse_code,
                h.inout_common_code,
                h.customer_employee_no,
                h.business_employee_no,
                h.franchise_code,
                h.location_key,
                h.inout_history_date,
                h.inout_history_note,
                w.warehouse_name,
                itsb.item_common_code itemCode,
                itcm.common_code_name itemName,
                fr.franchise_name,
                cusemp.employee_name customerEmployeeName,
                bizemp.employee_name businessEmployeeName,
                cus.customer_name
            FROM TB_INOUT_HIS h
                 LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
                 LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                 LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
                 LEFT JOIN TB_SYSCOMM itcm ON itsb.item_common_code = itcm.common_code
                 LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
                 LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
                 LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
            WHERE 1=1
                <if test="state == 'storage'">
                  AND (h.inout_common_code = 'RETRN' OR h.inout_common_code = 'INSTK')
                </if>
                <if test="state == 'retrieval'">
                  AND (h.inout_common_code = 'INSTL' )
                </if>
                <if test="state == 'all'">
                   AND (h.inout_common_code = 'RETRN' OR h.inout_common_code = 'INSTK' OR h.inout_common_code = 'INSTL')
                </if>
                <if test="searchType == 'all'">
                AND(
                    h.serial_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itsb.item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR fr.franchise_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR fr.franchise_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR bizemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cusemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.inout_history_date LIKE CONCAT('%',#{searchKeyword},'%')
                 )
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'serialNo'">
                         AND(
                             h.serial_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'item'">
                         AND(
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR itsb.item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'customer'">
                         AND(
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR cus.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'warehouse'">
                         AND(
                             w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'franchise'">
                         AND(
                             fr.franchise_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR fr.franchise_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'businessEmployee'">
                         AND(
                             bizemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'customerEmployee'">
                         AND(
                             cusemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'employeeNumber'">
                         AND(
                             h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'date'">
                         AND(
                             h.inout_history_date LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <otherwise>
                            AND  ${searchType} LIKE CONCAT('%', #{searchKeyword}, '%')
                         </otherwise>
                     </choose>
                 </if>
            ORDER BY 
             <if test="sort != null and sort != ''">
                ${sort} ${order}
            </if>
            <if test="sort == null">
               h.inout_history_date DESC
            </if>
            LIMIT #{pageList},10
            </script>
            """)
    List<InoutHistory> list(Integer pageList, String searchKeyword, String searchType, String sort, String order, String state);

    @Insert("""
            INSERT INTO TB_INOUT_HIS()
            VALUES()
            """)
    int add(InoutHistory InoutHistory);

    @Select("""
            SELECT
                h.inout_history_key,
                h.serial_no,
                h.warehouse_code,
                h.inout_common_code,
                h.customer_employee_no,
                h.business_employee_no,
                h.franchise_code,
                h.location_key,
                h.inout_history_date,
                h.inout_history_note,
                w.warehouse_name,
                w.warehouse_address,
                itsb.item_common_code itemCode,
                itcm.common_code_name itemName,
                fr.franchise_name,
                cusemp.employee_name customerEmployeeName,
                bizemp.employee_name businessEmployeeName
            FROM TB_INOUT_HIS h
                 LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
                 LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
                 LEFT JOIN TB_SYSCOMM itcm ON itsb.item_common_code = itcm.common_code
                 LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
                 LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
                 LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
            WHERE h.inout_history_key = ${inoutHistoryKey}
            """)
    InoutHistory view(Integer inoutHistoryKey);

    @Select("""
            <script>
            SELECT
                COUNT(*)
            FROM TB_INOUT_HIS h
                 LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
                 LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                 LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
                 LEFT JOIN TB_SYSCOMM itcm ON itsb.item_common_code = itcm.common_code
                 LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
                 LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
                 LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
            WHERE 1=1
                <if test="state == 'storage'">
                  AND (h.inout_common_code = 'RETRN' OR h.inout_common_code = 'INSTK')
                </if>
                <if test="state == 'retrieval'">
                  AND (h.inout_common_code = 'INSTL' )
                </if>
                <if test="state == 'all'">
                   AND (h.inout_common_code = 'RETRN' OR h.inout_common_code = 'INSTK' OR h.inout_common_code = 'INSTL')
                </if>
                <if test="searchType == 'all'">
                AND(
                    h.serial_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itsb.item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR fr.franchise_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR fr.franchise_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR bizemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cusemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR h.inout_history_date LIKE CONCAT('%',#{searchKeyword},'%')
                 )
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'serialNo'">
                         AND(
                             h.serial_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'item'">
                         AND(
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR itsb.item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'customer'">
                         AND(
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR cus.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'warehouse'">
                         AND(
                             w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'franchise'">
                         AND(
                             fr.franchise_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR fr.franchise_code LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'businessEmployee'">
                         AND(
                             bizemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'customerEmployee'">
                         AND(
                             cusemp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'employeeNumber'">
                         AND(
                             h.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR h.business_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <when test="searchType == 'date'">
                         AND(
                             h.inout_history_date LIKE CONCAT('%',#{searchKeyword},'%')
                            )
                         </when>
                         <otherwise>
                            AND  ${searchType} LIKE CONCAT('%', #{searchKeyword}, '%')
                         </otherwise>
                     </choose>
                 </if>
            </script>
            """)
    Integer count(String searchKeyword, String searchType, String state);
}
