package com.example.backend.mapper.customer;

import com.example.backend.dto.customer.Customer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface CustomerMapper {

    @Insert("""
            INSERT INTO TB_CUSTMST
            (customer_key, customer_name, customer_code, item_code, customer_rep, 
             customer_no, customer_tel, customer_fax, customer_address, customer_address_details, 
             customer_post, customer_active, customer_note)
            VALUES (#{customerKey}, #{customerNo}, #{customerTel}, #{customerFax}, 
                    #{customerRep}, #{post}, #{address}, #{details}, #{city1}, 
                    #{customerAddress}, #{customerAddressDetail}, #{customerPost}, 
                    #{customerActive}, #{customerNote})
            """)
    int add(Customer customer);


}
