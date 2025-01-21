package com.example.backend.mapper.state.retrieve;

import com.example.backend.dto.state.retrieve.Return;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ReturnMapper {


    @Select("""
            SELECT rr.franchise_code, f.franchise_name, ra.return_no, rr.serial_no, item_common_name, 
                   rr.business_employee_no, rr.customer_code, customer_name, ra.customer_employee_no,
                   return_date, return_consent
            FROM TB_RTN_REQ rr
            LEFT JOIN TB_RTN_APPR ra
            ON ra.return_request_key = rr.return_request_key
            LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
            LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
            LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
            LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
            """)
    List<Return> getReturnList();
}
