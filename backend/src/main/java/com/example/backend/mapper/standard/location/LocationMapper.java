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
                        SELECT *
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
    List<Location> list(String searchType, String searchKeyword);

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
            SELECT *
            FROM TB_LOCMST
            WHERE location_key=#{locationKey}
            """)
    Location view(Integer locationKey);

    @Update("""
                    UPDATE TB_LOCMST
                    SET warehouse_code=#{warehouseCode}, row=#{row}, col=#{col}, shelf=#{shelf}, item_common_code=#{itemCommonCode}, location_note=#{locationNote}
            WHERE location_key=#{locationKey}
            """)
    int edit(Location location);
}
