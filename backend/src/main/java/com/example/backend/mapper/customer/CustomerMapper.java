package com.example.backend.mapper.customer;

import com.example.backend.dto.commonCode.CommonCode;
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
            <script>
            SELECT customer_key, customer_name, customer_code, item_code, item_common_name AS itemName, customer_rep, customer_active 
            FROM TB_CUSTMST LEFT OUTER JOIN TB_ITEMCOMM ON item_code = item_common_code
            WHERE 
                <if test="active == false">
                    customer_active = TRUE
                </if>
                <if test="active == true">
                    1=1
                </if>
            <if test="keyword != null and keyword.trim()!=''">
                AND (
                    <trim prefixOverrides="OR">
                        <if test="type=='all' or type=='customerName'">
                            customer_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='itemName'">
                            OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='customerRep'">
                            OR customer_rep LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                    </trim>
                )    
            </if>
            ORDER BY customer_key
            LIMIT #{offset}, 10
            </script>
            """)
    List<Customer> getCustomerList(Boolean active, int offset, String type, String keyword);

    @Select("""
            SELECT *
            FROM TB_CUSTMST
            WHERE customer_key = #{customerKey}
            """)
    Customer viewCustomer(String customerKey);

    @Update("""
            UPDATE TB_CUSTMST
            SET customer_active = FALSE
            WHERE customer_key = #{customerKey}    
            """)
    int deleteCustomer(String customerKey);

    @Update("""
            UPDATE TB_CUSTMST
            SET customer_name = #{customerName}, item_code = #{itemCode}, 
            customer_rep = #{customerRep}, customer_no = #{customerNo}, 
            customer_tel = #{customerTel}, customer_fax = #{customerFax},
            customer_address = #{customerAddress}, customer_address_details = #{customerAddressDetail}, 
            customer_post = #{customerPost}, customer_active = #{customerActive}, customer_note = #{customerNote}
            WHERE customer_key = #{customerKey}    
            """)
    int editCustomer(Customer customer);

    @Select("""
            SELECT ic.*
            FROM TB_ITEMCOMM ic
                     LEFT JOIN (SELECT DISTINCT item_code
                                FROM TB_CUSTMST
                                WHERE customer_active = TRUE) cm ON ic.item_common_code = cm.item_code
            WHERE cm.item_code IS NULL
              AND ic.item_common_code_active = TRUE
            """)
    List<CommonCode> itemCodeList();

    @Select("""
            <script>
                SELECT COUNT(*)
                FROM TB_CUSTMST LEFT OUTER JOIN TB_ITEMCOMM ON item_code = item_common_code
                WHERE 
                <if test="active == false">
                    customer_active = TRUE
                </if>
                <if test="active == true">
                    1=1
                </if>
                    <if test="keyword != null and keyword.trim()!=''">
                        AND (
                            <trim prefixOverrides="OR">
                                <if test="type=='all' or type=='customerName'">
                                    customer_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>                
                                <if test="type=='all' or type=='itemName'">
                                    OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>                
                                <if test="type=='all' or type=='customerRep'">
                                    OR customer_rep LIKE CONCAT('%', #{keyword}, '%')
                                </if>                
                            </trim>
                        )    
                </if>
            </script>
            """)
    Integer countCustomerList(Boolean active, String type, String keyword);
}
