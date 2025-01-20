package com.example.backend.mapper.warehouse;

import com.example.backend.dto.warehouse.Warehouse;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface WarehouseMapper {

    //    customer_code를 customer 이름으로 변경
    @Select("""
                        <script>
                        SELECT *
                        FROM TB_WHMST
                        WHERE 
                                            <if test="searchType == 'all'">
                                                warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                                             OR customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                                             OR customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                                             OR warehouse_state LIKE CONCAT('%',#{searchKeyword},'%')
                                             OR warehouse_city LIKE CONCAT('%',#{searchKeyword},'%')
                                             OR warehouse_active LIKE CONCAT('%',#{searchKeyword},'%')
                                            </if>
                                            <if test="searchType != 'all'">
                                                 <choose>
                                                     <when test="searchType == 'warehouseName'">
                                                         warehouse_name LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <when test="searchType == 'customer'">
                                                         customer_code LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <when test="searchType == 'customerEmployee'">
                                                         customer_employee_no LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <when test="searchType == 'warehouseState'">
                                                         warehouse_state LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <when test="searchType == 'warehouseCity'">
                                                         warehouse_city LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <when test="searchType == 'warehouseActive'">
                                                         warehouse_active LIKE CONCAT('%', #{searchKeyword}, '%')
                                                     </when>
                                                     <otherwise>
                                                         1 = 0 
                                                     </otherwise>
                                                 </choose>
                                             </if>
                                    ORDER BY warehouse_name DESC
                        LIMIT #{pageList},10    
                                    </script>
            """)
    List<Warehouse> list(String searchType, String searchKeyword, Integer pageList);

    @Select("""
            SELECT *
            FROM TB_WHMST
            WHERE warehouse_key=#{warehouseKey}
            """)
    Warehouse view(Integer warehouseKey);

    @Insert("""
            INSERT INTO TB_WHMST (warehouse_code, warehouse_name, customer_code, warehouse_address, warehouse_address_detail, warehouse_post,warehouse_state,warehouse_city,customer_employee_no, warehouse_tel, warehouse_active, warehouse_note)
            VALUES(#{warehouseCode}, #{warehouseName}, #{customerCode}, #{warehouseAddress}, #{warehouseAddressDetail}, #{warehousePost}, #{warehouseState}, #{warehouseCity}, #{customerEmployeeNo}, #{warehouseTel}, #{warehouseActive}, #{warehouseNote})
            """)
    int add(Warehouse warehouse);

    @Update("""
            UPDATE TB_WHMST
            SET warehouse_code=#{warehouseCode}, warehouse_name=#{warehouseName}, customer_code=#{customerCode}, warehouse_address=#{warehouseAddress}, warehouse_address_detail=#{warehouseAddressDetail}, warehouse_post=#{warehousePost},warehouse_state=#{warehouseState},warehouse_city=#{warehouseCity},customer_employee_no=#{customerEmployeeNo}, warehouse_tel=#{warehouseTel}, warehouse_active=#{warehouseActive}, warehouse_note=#{warehouseNote}
            WHERE warehouse_key=#{warehouseKey}
            """)
    int edit(Warehouse warehouse);

    @Delete("""
            DELETE FROM TB_WHMST
            WHERE warehouse_key=#{warehouseKey}
            """)
    int delete(Integer warehouseKey);

    @Select("""
            <script>
            SELECT COUNT(*)
                                    FROM TB_WHMST
                                    WHERE 
                                                        <if test="searchType == 'all'">
                                                            warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                                                         OR customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                                                         OR customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                                                         OR warehouse_state LIKE CONCAT('%',#{searchKeyword},'%')
                                                         OR warehouse_city LIKE CONCAT('%',#{searchKeyword},'%')
                                                         OR warehouse_active LIKE CONCAT('%',#{searchKeyword},'%')
                                                        </if>
                                                        <if test="searchType != 'all'">
                                                             <choose>
                                                                 <when test="searchType == 'warehouseName'">
                                                                     warehouse_name LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <when test="searchType == 'customer'">
                                                                     customer_code LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <when test="searchType == 'customerEmployee'">
                                                                     customer_employee_no LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <when test="searchType == 'warehouseState'">
                                                                     warehouse_state LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <when test="searchType == 'warehouseCity'">
                                                                     warehouse_city LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <when test="searchType == 'warehouseActive'">
                                                                     warehouse_active LIKE CONCAT('%', #{searchKeyword}, '%')
                                                                 </when>
                                                                 <otherwise>
                                                                     1 = 0 
                                                                 </otherwise>
                                                             </choose>
                                                         </if>
                                                ORDER BY warehouse_name DESC
                                                </script>
            
            """)
    Integer countAllWarehouse(String searchType, String searchKeyword);
}
