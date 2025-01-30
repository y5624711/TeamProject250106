package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StocktakingMapper {
    @Select("""
            <script>
            SELECT s.stocktaking_key,
                   s.item_code,
                   s.warehouse_code,
                   s.location_key,
                   s.customer_employee_no,
                   s.count_current,
                   s.count_configuration,
                   s.count_difference,
                   s.stocktaking_type,
                   s.stocktaking_date,
                   w.warehouse_name,
                   w.customer_code,
                   itcm.item_common_name itemName,
                   cus.customer_name,
                   emp.employee_name customerEmployeeName
            FROM TB_STKTK s
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE
                <if test="searchType == 'all'">
                    w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'customer'">
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'item'">
                             itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'warehouse'">
                             s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'customerEmployee'">
                             s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'type'">
                             s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'date'">
                             s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <otherwise>
                             1 = 0 
                         </otherwise>
                     </choose>
                 </if>
            ORDER BY s.stocktaking_date DESC
            LIMIT #{pageList},10
            </script>
            """)
    List<Stocktaking> list(String searchType, String searchKeyword, Integer pageList);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_STKTK s
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE
                <if test="searchType == 'all'">
                    w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                 OR s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'customer'">
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'item'">
                             itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'warehouse'">
                             s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'customerEmployee'">
                             s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'type'">
                             s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <when test="searchType == 'date'">
                             s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                         </when>
                         <otherwise>
                             1 = 0 
                         </otherwise>
                     </choose>
                 </if>
            ORDER BY s.stocktaking_date DESC
            </script>
            """)
    Integer count(String searchType, String searchKeyword);

    @Select("""
            SELECT s.stocktaking_key,
                   s.item_code,
                   s.warehouse_code,
                   s.location_key,
                   s.customer_employee_no,
                   s.count_current,
                   s.count_configuration,
                   s.count_difference,
                   s.stocktaking_date,
                   w.warehouse_name,
                   w.customer_code,
                   itcm.item_common_name itemName,
                   cus.customer_name,
                   emp.employee_name customerEmployeeName
            FROM TB_STKTK s 
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE stocktaking_key=#{stocktakingKey}
            """)
    Stocktaking view(Integer stocktakingKey);

    @Insert("""
            INSERT INTO TB_STKTK (
                                  item_code, 
                                  warehouse_code, 
                                  location_key,
                                  customer_employee_no,
                                  count_current,
                                  count_configuration,
                                  stocktaking_type,
                                  stocktaking_date)
            VALUES (#{itemCode}, #{warehouseCode}, #)
            """)
    int add(Stocktaking stocktaking);
}
