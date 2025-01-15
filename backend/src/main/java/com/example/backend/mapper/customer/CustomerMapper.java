package com.example.backend.mapper.customer;

import com.example.backend.dto.customer.Customer;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;
import org.apache.ibatis.annotations.Update;

import java.util.List;

@Mapper
public interface CustomerMapper {

    @Insert("""
            INSERT INTO TB_CUSTMST
            (customer_name, customer_code, item_code, customer_rep, customer_no, 
             customer_tel, customer_fax, customer_address, customer_address_details, 
             customer_post, customer_note)
            VALUES (#{customerName},#{customerCode},#{itemCode}, #{customerRep}, #{customerNo}, 
                    #{customerTel}, #{customerFax}, #{customerAddress}, #{customerAddressDetail}, 
                    #{customerPost}, #{customerNote})
            """)
    int addCustomer(Customer customer);


    @Select("""
            SELECT customer_key, customer_name, customer_code, item_code, customer_rep, customer_active 
            FROM TB_CUSTMST    
            """)
    List<Customer> selectAllCustomer();

    @Select("""
            SELECT *
            FROM TB_CUSTMST
            WHERE customer_key = #{customerKey}
            """)
    Customer selectByCustomerKey(String customerKey);

    @Update("""
            UPDATE TB_CUSTMST
            SET customer_active = FALSE
            WHERE customer_key = #{customerKey}    
            """)
    int deactivateCustomer(String customerKey);

    @Update("""
            UPDATE TB_CUSTMST
            SET customer_name = #{customerName}, item_code = #{itemCode}, 
            customer_rep = #{customerRep}, customer_no = #{customerNo}, 
            customer_tel = #{customerTel}, customer_fax = #{customerFax},
            customer_address = #{customerAddress}, customer_address_details = #{customerAddressDetail}, 
            customer_post = #{customerPost}, customer_active = #{customerActive}, customer_note = #{customerNote}
            WHERE customer_key = #{customerKey}    
            """)
    int updateCustomer(Customer customer);
}
