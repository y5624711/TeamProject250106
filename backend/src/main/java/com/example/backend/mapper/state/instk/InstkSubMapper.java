package com.example.backend.mapper.state.instk;


import com.example.backend.dto.state.instk.InstkSerialLocation;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;
import java.util.Map;

@Mapper
public interface InstkSubMapper {


    @Select("""
                select  serial_no, location_key
                from  TB_INSTK_SUB
                where input_key=#{input_key}
            """)
    List<InstkSerialLocation> getSerialNoByInputKey(int inputKey);


}
