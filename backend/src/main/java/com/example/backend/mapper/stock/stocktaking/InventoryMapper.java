package com.example.backend.mapper.stock.stocktaking;

import com.example.backend.dto.stock.stocktaking.Inventory;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InventoryMapper {

    @Select("""
                <script>
                SELECT *
                FROM V_ITEM_CRNT
                    <where>
                        <trim prefixOverrides="OR">
                            <if test="keyword != null and keyword != ''">
                                <if test="type == 'all' or type == 'warehouseCity'">
                                    OR warehouse_city LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                                   <if test="type == 'all' or type == 'wareHouseName'">
                                    OR warehouse_name LIKE CONCAT('%', #{keyword}, '%')
                                    </if>
                                <if test="type == 'all' or type == 'customerName'">
                                    OR customer_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                                <if test="type == 'all' or type == 'itemName'">
                                    OR common_code_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                                <if test="type == 'all' or type == 'warehouseAddress'">
                                    OR warehouse_address LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                            </if>
                        </trim>
                            <if test="slice != 'BIZ'">
                                    AND warehouse_code = #{warehouseCode}
                            </if>
                    </where>
                        ORDER BY
                            <choose>
                                <when test="sortColum == 'inOutHistoryDate'">inout_history_date</when>
                                <when test="sortColum == 'wareHouseName'">warehouse_name</when>
                                <when test="sortColum == 'wareHouseCity'">warehouse_city</when>
                                <when test="sortColum == 'wareHouseAddress'">warehouse_address</when>
                                <when test="sortColum == 'wareHouseAddressDetail'">warehouse_address_detail</when>
                                <when test="sortColum == 'customerName'">customer_name</when>
                                <when test="sortColum == 'commonCodeName'">common_code_name</when>
                                <when test="sortColum == 'count'">count</when>
                                    <otherwise> inout_history_date DESC</otherwise> <!-- 기본 정렬 -->
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
    List<Inventory> selectList(int offset, String type, String keyword, String sortColum, String sortOrder,
                               String slice, String warehouseCode);

    @Select("""
                <script>
               SELECT COUNT(*)
                FROM V_ITEM_CRNT
                    <where>
                        <trim prefixOverrides="OR">
                            <if test="keyword != null and keyword != ''">
                                <if test="type == 'all' or type == 'warehouseCity'">
                                    OR warehouse_city LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                                   <if test="type == 'all' or type == 'wareHouseName'">
                                    OR warehouse_name LIKE CONCAT('%', #{keyword}, '%')
                                    </if>
                                <if test="type == 'all' or type == 'customerName'">
                                    OR customer_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                                <if test="type == 'all' or type == 'itemName'">
                                    OR common_code_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>
                            </if>
                        </trim>
                            <if test="slice != 'BIZ'">
                                    AND warehouse_code = #{warehouseCode}
                            </if>
                    </where>
                 </script>
            """)
    int countAll(String type, String keyword, String slice, String warehouseCode);

    @Select("""
            SELECT *
            FROM V_ITEM_CRNT
            """)
    List<Inventory> selectGraphList();

    @Select("""
            SELECT warehouse_code
            FROM TB_WHMST
            WHERE customer_code = #{name}
            """)
    String SelectWarehouseCodeByCustomerCode(String name);

    @Select("""
            SELECT employee_workplace_code
            FROM TB_EMPMST
            WHERE employee_no = #{name}
            """)
    String selectCustomerCode(String name);
}
