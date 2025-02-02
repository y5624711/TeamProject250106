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
                   s.customer_employee_no,
                   s.count_current,
                   s.count_configuration,
                   s.count_difference,
                   s.stocktaking_type,
                   s.stocktaking_date,
                   w.warehouse_name,
                   w.customer_code,
                   itcm.common_code_name itemName,
                   cus.customer_name,
                   emp.employee_name customerEmployeeName
            FROM TB_STKTK s
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_SYSCOMM itcm ON s.item_code=itcm.common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE
                <if test="searchType == 'all'">
                    w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
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
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
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
            ORDER BY 
             <if test="sort != null and sort != ''">
                ${sort} ${order}
            </if>
            <if test="sort == null">
               s.stocktaking_date DESC
            </if>
            LIMIT #{pageList},10
            </script>
            """)
    List<Stocktaking> list(String searchType, String searchKeyword, Integer pageList, String sort, String order);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_STKTK s
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_SYSCOMM itcm ON s.item_code=itcm.common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE
                <if test="searchType == 'all'">
                    w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
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
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
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
            </script>
            """)
    Integer count(String searchType, String searchKeyword);

    @Select("""
            SELECT s.stocktaking_key,
                   s.item_code,
                   s.warehouse_code,
                   s.customer_employee_no,
                   s.count_current,
                   s.count_configuration,
                   s.count_difference,
                   s.stocktaking_date,
                   w.warehouse_name,
                   w.customer_code,
                   s.stocktaking_type,
                   itcm.common_code_name itemName,
                   cus.customer_name,
                   emp.employee_name customerEmployeeName
            FROM TB_STKTK s 
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_SYSCOMM itcm ON s.item_code=itcm.common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE stocktaking_key=#{stocktakingKey}
            """)
    Stocktaking view(Integer stocktakingKey);

    @Insert("""
            INSERT INTO TB_STKTK (
                                  item_code, 
                                  warehouse_code, 
                                  customer_employee_no,
                                  count_current,
                                  count_configuration,
                                  stocktaking_type)
            VALUES (#{itemCode}, #{warehouseCode}, #{customerEmployeeNo}, #{countCurrent}, #{countConfiguration}, #{stocktakingType})
            """)
    int add(Stocktaking stocktaking);

    @Select("""
            SELECT warehouse_name, warehouse_code
            FROM TB_WHMST
            WHERE customer_code=#{customerCode}
            """)
    List<Stocktaking> getStocktakingWarehouseList(String customerCode);

    @Select("""
            SELECT i.item_common_code itemCode, s.common_code_name itemName
            FROM TB_WHMST w 
            LEFT JOIN TB_ITEMMST i ON w.customer_code=i.customer_code
            LEFT JOIN TB_SYSCOMM s ON i.item_common_code=s.common_code
            WHERE w.warehouse_code=#{warehouseCode}
            """)
    List<Stocktaking> getStocktakingItemList(String warehouseCode);

    @Select("""
            SELECT COUNT(*)
            FROM TB_INOUT_HIS h
            LEFT JOIN TB_ITEMSUB s ON h.serial_no=s.serial_no
            WHERE h.warehouse_code=#{warehouseCode} AND s.item_common_code=#{itemCode}
            """)
    Integer getStocktakingAll(String warehouseCode, String itemCode);

    @Select("""
            SELECT COUNT(*)
            FROM TB_INOUT_HIS h
            LEFT JOIN TB_ITEMSUB s ON h.serial_no=s.serial_no
            WHERE h.warehouse_code=#{warehouseCode} AND s.item_common_code=#{itemCode} AND h.inout_common_code='OUT'
            """)
    Integer getStocktakingOut(String warehouseCode, String itemCode);

    @Select("""
            SELECT employee_workplace_code
            FROM TB_EMPMST
            WHERE employee_no=#{name}
            """)
    String getCustomerCode(String name);
}
