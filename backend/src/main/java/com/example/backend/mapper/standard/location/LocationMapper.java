package com.example.backend.mapper.standard.location;

import com.example.backend.dto.standard.location.Location;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface LocationMapper {

    @Select("""
            SELECT *
            FROM TB_LOCMST
            """)
    List<Location> list();

    @Insert("""
            INSERT INTO TB_LOCMST (warehouse_code, row, col, shelf, item_common_code, location_note)
            VALUES ( #{warehouseCode}, #{row}, #{col}, #{shelf}, #{itemCommonCode}, #{locationNote} )
            """)
    int add(Location location);

    @Select("""
            SELECT COUNT(*)
            FROM TB_LOCMST
            """)
    Integer countAllLocation();
}
