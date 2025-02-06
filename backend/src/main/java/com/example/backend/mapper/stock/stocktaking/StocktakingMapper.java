package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Stocktaking;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Set;

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
                <if test="workplace == 'CUS'">
                    w.customer_code=#{workplaceCode}
                </if>
                <if test="workplace == 'BIZ'">
                    1=1
                </if>
                <if test="searchType == 'all'">
                AND (
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
                    )
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'customer'">
                        AND(
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'item'">
                        AND(
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'warehouse'">
                        AND(
                             s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'customerEmployee'">
                        AND(
                             s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'type'">
                        AND(
                             s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                             )
                         </when>
                         <when test="searchType == 'date'">
                        AND(
                             s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                             )
                         </when>
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
    List<Stocktaking> list(String searchType, String searchKeyword, Integer pageList, String sort, String order, String workplaceCode, String workplace);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_STKTK s
                LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_SYSCOMM itcm ON s.item_code=itcm.common_code
                LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
            WHERE
                <if test="workplace == 'CUS'">
                    w.customer_code=#{workplaceCode}
                </if>
                <if test="workplace == 'BIZ'">
                    1=1
                </if>
                <if test="searchType == 'all'">
                AND (
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
                    )
                </if>
                <if test="searchType != 'all'">
                     <choose>
                         <when test="searchType == 'customer'">
                        AND(
                             cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'item'">
                        AND(
                             itcm.common_code_name LIKE CONCAT('%',#{searchKeyword},'%')
                          OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'warehouse'">
                        AND(
                             s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                          OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'customerEmployee'">
                        AND(
                             s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                          OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                          )
                         </when>
                         <when test="searchType == 'type'">
                        AND(
                             s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
                             )
                         </when>
                         <when test="searchType == 'date'">
                        AND(
                             s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
                             )
                         </when>
                     </choose>
                 </if>
            </script>
            """)
    Integer count(String searchType, String searchKeyword, String workplaceCode, String workplace);

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
                                  stocktaking_note,
                                  stocktaking_type)
            VALUES (#{itemCode}, #{warehouseCode}, #{customerEmployeeNo}, #{countCurrent}, #{countConfiguration}, #{stocktakingNote}, #{stocktakingType})
            """)
    int add(Stocktaking stocktaking);

    @Select("""
            <script>
            SELECT warehouse_name, warehouse_code
            FROM TB_WHMST
            <if test="workplace == 'BIZ'">
            </if>
            <if test="workplace == 'CUS'">
            WHERE 
            customer_code=#{workplaceCode}
            </if>
            </script>
            """)
    List<Stocktaking> getStocktakingWarehouseList(String workplaceCode, String workplace);

    @Select("""
            SELECT i.item_common_code itemCode, s.common_code_name itemName
            FROM TB_WHMST w 
            LEFT JOIN TB_ITEMMST i ON w.customer_code=i.customer_code
            LEFT JOIN TB_SYSCOMM s ON i.item_common_code=s.common_code
            WHERE w.warehouse_code=#{warehouseCode}
            """)
    List<Stocktaking> getStocktakingItemList(String warehouseCode);

    //    물품입출내역 찍힌 모든 것
    @Select("""
            SELECT COUNT(*)
            FROM TB_INOUT_HIS h
            LEFT JOIN TB_ITEMSUB s ON h.serial_no=s.serial_no
            WHERE h.warehouse_code=#{warehouseCode} AND s.item_common_code=#{itemCode}
            """)
    Integer getStocktakingAll(String warehouseCode, String itemCode);

    //    물품입출내역에서 OUT 된 애들만
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
    String getWorkplaceCode(String name);

    @Select("""
            SELECT l.row
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            WHERE w.warehouse_code=#{warehouseCode}  AND l.location_active=1
            ORDER BY l.row ASC
            """)
    Set<String> getWarehouseRowList(String warehouseCode);

    @Select("""
            SELECT l.col
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            WHERE w.warehouse_code=#{warehouseCode}  AND l.location_active=1 AND l.row=#{row}
            ORDER BY l.col ASC
            """)
    Set<String> getWarehouseColList(String warehouseCode, String row);

    @Select("""
            SELECT l.shelf
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            WHERE w.warehouse_code=#{warehouseCode}  AND l.location_active=1 AND l.row=#{row} AND l.col=#{col}
            ORDER BY l.shelf ASC
            """)
    Set<Integer> getWarehouseShelfList(String warehouseCode, String row, String col);

    @Select("""
            SELECT l.location_key
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            WHERE w.warehouse_code=#{warehouseCode} AND l.row=#{row} AND l.col=#{col} AND l.shelf=#{shelf} AND l.location_active=1
            """)
    Integer getStocktakingLocation(String warehouseCode, String row, String col, Integer shelf);

    @Select("""
            SELECT s.serial_no
            FROM TB_INSTK_SUB s
            LEFT JOIN TB_LOCMST l ON s.location_key=l.location_key
            WHERE l.located=1 AND l.location_active AND s.location_key=#{locationKey}
            ORDER BY s.input_stock_sub_key DESC
            LIMIT 1
            """)
    String getLocationValue(Integer locationKey);

    //    실제 수량이 더 많을 때 사용
//    @Select("""
//            SELECT l.location_key
//            FROM TB_LOCMST l
//            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
//            WHERE w.warehouse_code=#{warehouseCode} AND l.located=#{getCode} AND l.location_active=1
//            """)
//    List<Integer> getStocktakingLocationList(String warehouseCode, Integer getCode);

//    //    실제 수량이 더 많을 때 사용
//    @Select("""
//            SELECT l.location_key
//            FROM TB_LOCMST l
//            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
//            LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
//            LEFT JOIN TB_ITEMSUB ist ON cus.item_code=ist.item_common_code
//            WHERE w.warehouse_code=#{warehouseCode} AND l.located=#{getCode} AND l.location_active=1
//            """)
//    List<StocktakingItem> getStocktakingLocationList(String warehouseCode, Integer getCode);
}
