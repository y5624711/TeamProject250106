package com.example.backend.mapper.stock.storageRetrieval;

import com.example.backend.dto.stock.storageRetrieval.StorageRetrieval;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface StorageRetrievalMapper {

    @Select("""
            SELECT *
            FROM TB_INOUT_HIS
            """)
    List<StorageRetrieval> list();

    @Insert("""
            INSERT INTO TB_INOUT_HIS()
            VALUES()
            """)
    int add(StorageRetrieval storageRetrieval);
}
