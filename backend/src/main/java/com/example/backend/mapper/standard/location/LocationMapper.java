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
                l.item_common_code,
                l.location_note,
                w.warehouse_name,
                itc.item_common_name
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            LEFT JOIN TB_ITEMCOMM itc ON l.item_common_code=itc.item_common_code
            WHERE 1=1
                    <if test="searchType == 'all'">
                        l.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                     OR itc.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.row LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.col LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.shelf LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR l.location_note LIKE CONCAT('%',#{searchKeyword},'%')
                    </if>
                    <if test="searchType != 'all'">
                         <choose>
                             <when test="searchType == 'warehouse'">
                                 l.warehouse_code LIKE CONCAT('%', #{searchKeyword}, '%')
                              OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
                             </when>
                             <when test="searchType == 'row'">
                                 l.row LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'col'">
                                 l.col LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'shelf'">
                                 l.shelf LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'item'">
                                 l.item_common_code LIKE CONCAT('%', #{searchKeyword}, '%')
                              OR itc.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
                             </when>
                             <when test="searchType == 'note'">
                                 l.location_note LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <otherwise>
                            i${searchType} LIKE CONCAT('%', #{searchKeyword}, '%')
                        </otherwise>
                         </choose>
                     </if>
                <if test="sort != null and sort != ''">
                    ORDER BY ${sort} ${order}
                </if>
                <if test="sort == null">
                    ORDER BY l.warehouse_code DESC
                </if>
            LIMIT #{pageList},10    
            
            </script>
            """)
    List<Location> list(String searchType, String searchKeyword, Integer pageList, String sort, String order);

    @Insert("""
            INSERT INTO TB_LOCMST (warehouse_code, row, col, shelf, item_common_code, location_note)
            VALUES ( #{warehouseCode}, #{row}, #{col}, #{shelf}, #{itemCommonCode}, #{locationNote} )
            """)
    int add(Location location);

    @Select("""
            <script>
            SELECT COUNT(*)
            FROM TB_LOCMST
            WHERE 
                    <if test="searchType == 'all'">
                        warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR row LIKE CONCAT('%',#{searchKeyword},'%')
                     OR col LIKE CONCAT('%',#{searchKeyword},'%')
                     OR shelf LIKE CONCAT('%',#{searchKeyword},'%')
                     OR item_common_code LIKE CONCAT('%',#{searchKeyword},'%')
                     OR location_note LIKE CONCAT('%',#{searchKeyword},'%')
                    </if>
                    <if test="searchType != 'all'">
                         <choose>
                             <when test="searchType == 'warehouseName'">
                                 warehouse_code LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'row'">
                                 row LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'col'">
                                 col LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'shelf'">
                                 shelf LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'itemName'">
                                 item_common_code LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <when test="searchType == 'locationNote'">
                                 location_note LIKE CONCAT('%', #{searchKeyword}, '%')
                             </when>
                             <otherwise>
                                 1 = 0 
                             </otherwise>
                         </choose>
                     </if>
            ORDER BY warehouse_code DESC
            </script>
            """)
    Integer countAllLocation(String searchType, String searchKeyword);

    @Select("""
            <script>
            SELECT 
                l.warehouse_code,
                l.row,
                l.col,
                l.shelf,
                l.location_key,
                l.item_common_code,
                l.location_note,
                w.warehouse_name,
                itc.item_common_name
            FROM TB_LOCMST l
            LEFT JOIN TB_WHMST w ON l.warehouse_code=w.warehouse_code
            LEFT JOIN TB_ITEMCOMM itc ON l.item_common_code=itc.item_common_code
            WHERE l.location_key=#{locationKey}
            </script>
            """)
    Location view(Integer locationKey);

    @Update("""
            UPDATE TB_LOCMST
            SET warehouse_code=#{warehouseCode},item_common_code=#{itemCommonCode}, location_note=#{locationNote}
            WHERE location_key=#{locationKey}
            """)
    int edit(Location location);
}
