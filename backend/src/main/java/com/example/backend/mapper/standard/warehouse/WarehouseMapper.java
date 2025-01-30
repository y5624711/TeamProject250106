package com.example.backend.mapper.standard.warehouse;

import com.example.backend.dto.standard.warehouse.Warehouse;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface WarehouseMapper {

    //    customer_code를 customer 이름으로 변경
    @Select("""
            <script>
            SELECT w.warehouse_name,
                   w.warehouse_key,
                   w.warehouse_state,
                   w.warehouse_city,
                   w.warehouse_tel,
                   cus.customer_name,
                   e.employee_name
            FROM TB_WHMST w 
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_EMPMST e ON w.customer_employee_no=e.employee_no
            WHERE 
                <if test="searchType == 'all'">
                    w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
                 OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
                 OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_state LIKE CONCAT('%',#{searchKeyword},'%')
                 OR w.warehouse_city LIKE CONCAT('%',#{searchKeyword},'%')
                </if>
                <if test="searchType != 'all'">
                 <choose>
                     <when test="searchType == 'warehouse'">
                         w.warehouse_name LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR w.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')   
                     </when>
                     <when test="searchType == 'customer'">
                         w.customer_code LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
                     </when>
                     <when test="searchType == 'employee'">
                         w.customer_employee_no LIKE CONCAT('%', #{searchKeyword}, '%')
                      OR e.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
                     </when>
                     <when test="searchType == 'warehouseState'">
                         warehouse_state LIKE CONCAT('%', #{searchKeyword}, '%')
                     </when>
                     <when test="searchType == 'warehouseCity'">
                         warehouse_city LIKE CONCAT('%', #{searchKeyword}, '%')
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
                   w.warehouse_name DESC
                </if>
            LIMIT #{pageList},10    
            </script>
            """)
    List<Warehouse> list(String searchType, String searchKeyword, Integer pageList, String sort, String order);

    @Select("""
            SELECT 
                w.warehouse_name,
                w.warehouse_code,
                cus.customer_name,
                w.customer_code,
                w.warehouse_tel,
                e.employee_name,
                w.customer_employee_no,
                w.warehouse_state,
                w.warehouse_city,
                w.warehouse_address,
                w.warehouse_post,
                w.warehouse_address_detail,
                w.warehouse_note,
                w.warehouse_active
            FROM TB_WHMST w 
                LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
                LEFT JOIN TB_EMPMST e ON w.customer_employee_no=e.employee_no
            WHERE warehouse_key=#{warehouseKey}
            """)
    Warehouse viewWarehouse(Integer warehouseKey);

    @Update("""
            UPDATE TB_WHMST
            SET warehouse_name=#{warehouseName},
                customer_code=#{customerCode},
                warehouse_address=#{warehouseAddress},
                warehouse_address_detail=#{warehouseAddressDetail},
                warehouse_post=#{warehousePost},
                warehouse_state=#{warehouseState},
                warehouse_city=#{warehouseCity},
                customer_employee_no=#{customerEmployeeNo},
                warehouse_tel=#{warehouseTel},
                warehouse_active=#{warehouseActive},
                warehouse_note=#{warehouseNote}
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
            </script>
            
            """)
    Integer countAllWarehouse(String searchType, String searchKeyword);

    @Select("""
            SELECT *
            FROM TB_WHMST
            WHERE warehouse_address=#{warehouseAddress} AND warehouse_address_detail=#{warehouseAddressDetail}
            """)
    Integer checkWarehouse(String warehoueAddress, String warehouseAddressDetail);

    //창고 코드 최대값
    @Select("""
                <script>
               SELECT COALESCE(MAX(CAST(SUBSTRING(warehouse_code, 4) AS UNSIGNED)), 0) AS maxNumber
                FROM TB_WHMST
                WHERE warehouse_code LIKE CONCAT(#{whs}, '%')
                AND warehouse_code REGEXP '^[A-Za-z]+[0-9]+$'
                </script>
            """)
    Integer viewMaxWarehouseCode(String whs);

    @Insert("""
            INSERT INTO TB_WHMST
            (warehouse_code, 
             warehouse_name,
             customer_code,
             warehouse_address,
             warehouse_address_detail,
             warehouse_post,
             warehouse_state,
             warehouse_city,
             customer_employee_no,
             warehouse_tel,
             warehouse_active,
             warehouse_note)
            VALUES
            (#{warehouseCode},
             #{warehouseName},
             #{customerCode},
             #{warehouseAddress},
             #{warehouseAddressDetail},
             #{warehousePost},
             #{warehouseState},
             #{warehouseCity},
             #{customerEmployeeNo},
             #{warehouseTel},
             #{warehouseActive},
             #{warehouseNote})
            """)
    int addWarehouse(Warehouse warehouse);
}
