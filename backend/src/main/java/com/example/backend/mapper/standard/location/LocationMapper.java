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
                w.warehouse_name
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            WHERE 
                    <if test="workplace == 'CUS'">
                        w.customer_code=#{workplaceCode}
                    </if>
                    <if test="workplace == 'BIZ'">
                        1=1
                    </if>
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
    List<Location> list(String searchType, String searchKeyword, Integer pageList, String sort, String order, String workplaceCode, String workplace);

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
            WHERE 
                    <if test="workplace == 'CUS'">
                        w.customer_code=#{workplaceCode}
                    </if>
                    <if test="workplace == 'BIZ'">
                        1=1
                    </if>
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
    Integer countAllLocation(String searchType, String searchKeyword, String workplaceCode, String workplace);

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
                l.location_active
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
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
            SELECT warehouse_code, warehouse_name 
            FROM TB_WHMST
            """)
    List<Location> getLocationWarehouseList();

    @Select("""
            SELECT COUNT(*)
            FROM TB_LOCMST
            WHERE warehouse_code=#{warehouseCode} AND row=#{row} AND col=#{col} AND shelf=#{shelf}
            """)
    Integer checkLocation(String warehouseCode, String row, String col, Integer shelf);

    @Update("""
            UPDATE TB_LOCMST
            SET location_active=#{active}
            WHERE warehouse_code=#{warehouseCode}
            """)
    int changeLocationActive(String warehouseCode, Boolean active);
}
