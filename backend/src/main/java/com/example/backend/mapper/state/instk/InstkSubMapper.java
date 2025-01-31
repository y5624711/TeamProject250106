package com.example.backend.mapper.state.instk;


import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface InstkSubMapper {


    @Select("""
                select  serial_no
                from  TB_INSTK_SUB
                where input_key=#{input_key}
            """)
    List<String> getSerialNoByInputKey(int inputKey);

}
