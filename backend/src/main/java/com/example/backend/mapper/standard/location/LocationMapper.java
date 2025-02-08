package com.example.backend.mapper.standard.location;

import com.example.backend.dto.standard.location.Location;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface LocationMapper {

    @Select("""
            <script>
            SELECT 
                l.warehouse_code,
                l.row,
                l.col,
                l.shelf,
                l.location_key,
                l.location_note,
                l.located,
                w.warehouse_name,
                l.location_active,
                sys.common_code_name itemName,
                cu.item_code,
                cu.customer_code,
                cu.customer_name
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code = w.warehouse_code
            LEFT JOIN TB_CUSTMST cu ON w.customer_code=cu.customer_code
            LEFT JOIN TB_SYSCOMM sys ON cu.item_code=sys.common_code
            WHERE 
                <if test="active == false">
                    location_active = TRUE
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND (
                    <if test="workplace == 'CUS'">
                        w.customer_code=#{workplaceCode}
                    </if>
                    <if test="workplace == 'BIZ'">
                        1=1
                    </if>
                )  
                <if test="searchType == 'all'">
                    AND (
                        l.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.row LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.col LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.shelf LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.location_note LIKE CONCAT('%',#{searchKeyword},'%')
                    )                   
                </if>
                <if test="searchType != 'all'">
                    <choose>
                        <when test="searchType == 'warehouse'">
                            AND (
                                l.warehouse_code LIKE CONCAT('%', #{searchKeyword}, '%')
                            )
                            OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                        </when>
                        <when test="searchType == 'row'">
                            AND (
                                l.row LIKE CONCAT('%', #{searchKeyword}, '%')
                            )
                        </when>
                        <when test="searchType == 'col'">
                            AND (
                                l.col LIKE CONCAT('%', #{searchKeyword}, '%')
                            )
                        </when>
                        <when test="searchType == 'shelf'">
                            AND (
                                l.shelf LIKE CONCAT('%', #{searchKeyword}, '%')
                            )
                        </when>
                        <when test="searchType == 'note'">
                            AND (
                                l.location_note LIKE CONCAT('%', #{searchKeyword}, '%')
                            )
                        </when>
                    </choose>
                </if>
                ORDER BY
                <if test="sort != null and sort != ''">
                    ${sort} ${order}
                </if>
                <if test="sort == null">
                    l.location_key DESC
                </if>
            LIMIT #{pageList},10    
            
            </script>
            """)
    List<Location> list(String searchType, String searchKeyword, Integer pageList, String sort, String order, String workplaceCode, String workplace, Boolean active);

    @Insert("""
            INSERT INTO TB_LOCMST (warehouse_code, row, col, shelf, location_note)
            VALUES ( #{warehouseCode}, #{row}, #{col}, #{shelf}, #{locationNote} )
            """)
    Integer add(Location location);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            LEFT JOIN TB_CUSTMST cu ON w.customer_code=cu.customer_code
            LEFT JOIN TB_SYSCOMM sys ON cu.item_code=sys.common_code
            WHERE
                <if test="active == false">
                    location_active = TRUE
                </if>
                <if test="active == true">
                    1=1
                </if>
                AND (
                    <if test="workplace == 'CUS'">
                        w.customer_code=#{workplaceCode}
                    </if>
                    <if test="workplace == 'BIZ'">
                        1=1
                    </if>
                )  
                <if test="searchType == 'all'">
                    AND (
                        l.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.row LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.col LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.shelf LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.location_note LIKE CONCAT('%',#{searchKeyword},'%')
                    )                   
                </if>
                    <if test="searchType != 'all'">
                         <choose>
                             <when test="searchType == 'warehouse'">
                                AND (
                                 l.warehouse_code LIKE CONCAT('%', #{searchKeyword}, '%')
                                    )
                              OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                             </when>
                             <when test="searchType == 'row'">
                                AND (
                                 l.row LIKE CONCAT('%', #{searchKeyword}, '%')
                                    )
                             </when>
                             <when test="searchType == 'col'">
                                AND (
                                 l.col LIKE CONCAT('%', #{searchKeyword}, '%')
                                    )
                             </when>
                             <when test="searchType == 'shelf'">
                                AND (
                                 l.shelf LIKE CONCAT('%', #{searchKeyword}, '%')
                                    )
                             </when>
                             <when test="searchType == 'note'">
                                AND (
                                 l.location_note LIKE CONCAT('%', #{searchKeyword}, '%')
                                    )
                             </when>
                               </choose>
                     </if>
            </script>
            """)
    Integer countAllLocation(String searchType, String searchKeyword, String workplaceCode, String workplace, Boolean active);

    @Select("""
            <script>
            SELECT 
                l.warehouse_code,
                l.row,
                l.col,
                l.shelf,
                l.location_key,
                l.location_note,
                l.located,
                w.warehouse_name,
                l.location_active, 
                sys.common_code_name itemName,
                cu.item_code,
                cu.customer_code,
                cu.customer_name
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            LEFT JOIN TB_CUSTMST cu ON w.customer_code=cu.customer_code
            LEFT JOIN TB_SYSCOMM sys ON cu.item_code=sys.common_code
            WHERE l.location_key=#{locationKey}
            </script>
            """)
    Location view(Integer locationKey);

    @Update("""
            UPDATE TB_LOCMST
            SET location_note=#{locationNote}, located=#{located}, location_active=#{locationActive}
            WHERE location_key=#{locationKey}
            """)
    Integer edit(Location location);

    @Select("""
            <script>
            SELECT warehouse_code, warehouse_name
            FROM TB_WHMST
            <if test="workplace == 'BIZ'">
            </if>
            <if test="workplace == 'CUS'">
            WHERE customer_code=#{workplaceCode}
            </if>
            </script>
            """)
    List<Location> getLocationWarehouseList(String workplaceCode, String workplace);

    @Select("""
            SELECT COUNT(*)
            FROM TB_LOCMST
            WHERE warehouse_code=#{warehouseCode} AND row=#{row} AND col=#{col} AND shelf=#{shelf}
            """)
    Integer checkLocation(String warehouseCode, String row, String col, Integer shelf);

    //    창고 사용여부 변화에 따른 로케이션의 사용여부 변화
    @Update("""
            UPDATE TB_LOCMST
            SET location_active=#{active}
            WHERE warehouse_code=#{warehouseCode}
            """)
    int changeLocationActive(String warehouseCode, Boolean active);

    @Select("""
            SELECT warehouse_name
            FROM TB_WHMST
            WHERE warehouse_code=#{warehouseCode}
            """)
    String getWarehouseName(String warehouseCode);

    @Select("""
            SELECT ins.serial_no
            FROM TB_LOCMST l
            LEFT JOIN TB_INSTK_SUB ins ON l.location_key=ins.location_key
            LEFT JOIN TB_ITEMSUB its ON ins.serial_no=its.serial_no
            WHERE l.location_key=#{locationKey} AND its.current_common_code='WHS'
            ORDER BY ins.input_stock_sub_key DESC
            LIMIT 1
            """)
    String findSerialNo(Integer locationKey);
}
