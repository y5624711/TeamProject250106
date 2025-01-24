package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InventoryMapper {
    @Select("""
                <script>
                SELECT a.item_code,
                       a.warehouse_code,
                       b.common_code_name,
                       d.warehouse_name,
                       d.warehouse_city,
                       d.warehouse_address,
                       d.warehouse_address_detail,
                       c.customer_name,
                       a.count
                FROM V_ITEM_CRNT a
                         JOIN TB_SYSCOMM b ON a.item_code = b.common_code
                         JOIN TB_CUSTMST c ON a.item_code = c.item_code
                         JOIN TB_WHMST d ON c.customer_code = d.customer_code
                 <where>
                     <trim prefixOverrides="OR">
                         <if test="keyword != null and keyword != ''">
                             <if test="type == 'all' or type == 'wareHouseName'">
                                 OR d.warehouse_name LIKE CONCAT('%', #{keyword}, '%')
                                 </if>
                             <if test="type == 'all' or type == 'customerName'">
                                  OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                             </if>
                             <if test="type == 'all' or type == 'itemName'">
                                  OR b.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                             </if>
                         </if>
                     </trim>
                 </where>
                ORDER BY 
                            <choose>
                                <when test="sortColum == 'wareHouseName'">d.warehouse_name</when>
                                <when test="sortColum == 'wareHouseCity'">d.warehouse_city</when>
                                <when test="sortColum == 'wareHouseAddress'">d.warehouse_address</when>
                                <when test="sortColum == 'wareHouseAddressDetail'">d.warehouse_address_detail</when>
                                <when test="sortColum == 'customerName'">c.customer_name</when>
                                <when test="sortColum == 'commonCodeName'">b.common_code_name</when>
                                <when test="sortColum == 'count'">a.count</when>
                                <otherwise> a.item_current_key DESC</otherwise> <!-- 기본 정렬 -->
                            </choose>
                            <if test="sortOrder == 'desc'">
                                DESC
                            </if>
                            <if test="sortOrder == 'asc'">
                                ASC
                            </if>
                LIMIT #{offset},10
                </script>
            """)
    List<Inventory> selectList(int offset, String type, String keyword, String sortColum, String sortOrder);

    @Select("""
                <script>
                 SELECT COUNT(*) 
                 FROM V_ITEM_CRNT a
                          JOIN TB_SYSCOMM b ON a.item_code = b.common_code
                          JOIN TB_CUSTMST c ON a.item_code = c.item_code
                          JOIN TB_WHMST d ON c.customer_code = d.customer_code
                 <where>
                     <trim prefixOverrides="OR">
                         <if test="keyword != null and keyword != ''">
                             <if test="type == 'all' or type == 'wareHouseName'">
                                 OR d.warehouse_name LIKE CONCAT('%', #{keyword}, '%')
                                 </if>
                             <if test="type == 'all' or type == 'customerName'">
                                  OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                             </if>
                             <if test="type == 'all' or type == 'itemName'">
                                  OR b.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                             </if>
                         </if>
                     </trim>
                 </where>
                 </script>
            """)
    int countAll(String type, String keyword);
}
