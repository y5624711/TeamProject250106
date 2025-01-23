package com.example.backend.mapper.standard.customer;

import com.example.backend.dto.standard.commonCode.CommonCode;
import com.example.backend.dto.standard.customer.Customer;
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
            SELECT customer_key, customer_name, customer_no, customer_code, item_code, common_code_name AS itemName, customer_rep, customer_tel, customer_active 
            FROM TB_CUSTMST c LEFT OUTER JOIN TB_SYSCOMM s ON c.item_code = s.common_code
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
                        <if test="type=='all' or type=='customerNo'">
                            OR customer_no LIKE CONCAT('%', #{keyword}, '%')
                        </if>                                
                        <if test="type=='all' or type=='itemName'">
                            OR item_common_name LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='customerRep'">
                            OR customer_rep LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                        <if test="type=='all' or type=='customerTel'">
                            OR customer_tel LIKE CONCAT('%', #{keyword}, '%')
                        </if>                
                    </trim>
                )    
            </if>
            ORDER BY ${sort} ${order}
            LIMIT #{offset}, 10
            </script>
            """)
    List<Customer> getCustomerList(Boolean active, int offset, String type, String keyword, String sort, String order);

    @Select("""
            SELECT *, common_code_name AS itemName 
            FROM TB_CUSTMST
            LEFT OUTER JOIN TB_SYSCOMM ON item_code = common_code
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
            FROM TB_SYSCOMM ic
                     LEFT JOIN (SELECT DISTINCT item_code
                                FROM TB_CUSTMST
                                WHERE customer_active = TRUE) cm 
                     ON ic.common_code = cm.item_code
            WHERE cm.item_code IS NULL
              AND ic.common_code_active = TRUE
              AND common_code_type='ITEM'
            """)
    List<CommonCode> itemCodeList();

    @Select("""
            <script>
                SELECT COUNT(*)
                 FROM TB_CUSTMST c LEFT OUTER JOIN TB_SYSCOMM s ON c.item_code = s.common_code
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
                                <if test="type=='all' or type=='customerNo'">
                                    OR customer_no LIKE CONCAT('%', #{keyword}, '%')
                                </if>           
                                <if test="type=='all' or type=='itemName'">
                                    OR common_code_name LIKE CONCAT('%', #{keyword}, '%')
                                </if>                
                                <if test="type=='all' or type=='customerRep'">
                                    OR customer_rep LIKE CONCAT('%', #{keyword}, '%')
                                </if>                
                                <if test="type=='all' or type=='customerTel'">
                                    OR customer_tel LIKE CONCAT('%', #{keyword}, '%')
                                </if>       
                            </trim>
                        )    
                </if>
            </script>
            """)
    Integer countCustomerList(Boolean active, String type, String keyword);

    @Select("""
                <script>
               SELECT COALESCE(MAX(CAST(SUBSTRING(customer_code, 4) AS UNSIGNED)), 0) AS maxNumber
                FROM TB_CUSTMST
                WHERE customer_code LIKE CONCAT(#{cus}, '%')
                AND customer_code REGEXP '^[A-Za-z]+[0-9]+$'
                </script>
            """)
    Integer viewMaxCustomerCode(String cus);

    @Select("""
                        select customer_code,customer_name
                        from TB_CUSTMST
                        where customer_active = TRUE
            """)
    List<Customer> customerCodeNames();

    @Select("""
            SELECT item_code
            FROM TB_CUSTMST
            WHERE customer_active=true
            """)
    List<String> getUsedItemCode();

    @Select("""
            SELECT customer_name
            FROM TB_CUSTMST
            WHERE customer_active=true
            """)
    List<String> getUsedCustomerName();

    @Select("""
            SELECT customer_no
            FROM TB_CUSTMST
            WHERE customer_active=true
            """)
    List<String> getUsedCustomerNo();

    @Select("""
            SELECT customer_tel
            FROM TB_CUSTMST
            WHERE customer_active=true
            """)
    List<String> getUsedCustomerTel();

    @Select("""
            SELECT customer_key
            FROM TB_CUSTMST
            WHERE customer_active=false
            """)
    List<String> getDeletedCustomer();
}
