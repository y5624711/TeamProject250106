package com.example.backend.mapper.item;

import com.example.backend.dto.item.Item;
import org.apache.ibatis.annotations.*;

import java.util.List;
import java.util.Map;

@Mapper
public interface ItemMapper {
    @Insert("""
            INSERT INTO TB_ITEMMST
            (item_key, item_common_code, customer_code, input_price, output_price, size, unit, item_note)
            VALUES (#{itemKey}, #{itemCommonCode}, #{customerCode}, #{inputPrice}, #{outputPrice}, #{size}, #{unit}, #{itemNote})
            """)
    @Options(keyProperty = "itemKey", useGeneratedKeys = true)
    int addItem(Item item);

    @Select("""
            SELECT c.item_code AS item_common_code, ic.item_common_name
            FROM TB_CUSTMST c LEFT JOIN TB_ITEMCOMM ic ON c.item_code = ic.item_common_code
            WHERE c.item_code NOT IN (SELECT item_common_code FROM TB_ITEMMST)
            ORDER BY binary(item_common_name)
            """)
    List<Map<String, String>> getItemCommonCode();

    @Select("""
            <script>
                SELECT\s
                    i.item_key,
                    ic.item_common_name,
                    c.customer_name,
                    i.input_price,
                    i.output_price,
                    i.item_active
                FROM TB_ITEMMST i\s
                LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
                LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                <trim prefix="WHERE" prefixOverrides="AND">
                    <if test="active == 1">
                        i.item_active = 1
                    </if>
                   \s
                    <if test="keyword != null and keyword != ''">
                        <choose>
                            <when test="type == 'all'">
                                AND (
                                    ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </when>
                            <when test="type == 'itemName'">
                                AND ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'customerName'">
                                AND c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'inputPrice'">
                                AND CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'outputPrice'">
                                AND CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                        </choose>
                    </if>
                </trim>
               \s
                <trim prefix="ORDER BY">
                    <choose>
                        <when test="sort != null and sort != ''">
                            <choose>
                                <when test="sort == 'itemKey'">i.item_key</when>
                                <when test="sort == 'itemCommonName'">ic.item_common_name</when>
                                <when test="sort == 'customerName'">c.customer_name</when>
                                <when test="sort == 'inputPrice'">i.input_price</when>
                                <when test="sort == 'outputPrice'">i.output_price</when>
                                <otherwise>i.item_key</otherwise>
                            </choose>
                            ${order}
                        </when>
                        <otherwise>
                            i.item_key ASC
                        </otherwise>
                    </choose>
                </trim>
               \s
                LIMIT #{offset}, 10
            </script>
            """)
    List<Item> getItemList(Integer offset, Integer active, String type, String keyword, String sort, String order);


    @Select("""
            SELECT i.*, ic.item_common_name, c.customer_name
            FROM TB_ITEMMST i LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
                              LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
            WHERE i.item_key = #{itemKey}
            """)
    List<Item> getItemView(Integer itemKey);

    @Update("""
            UPDATE TB_ITEMMST
            SET item_active = 0
            WHERE item_key = #{itemKey}
            """)
    int deleteItem(int itemKey);

    @Select("""
            SELECT customer_name, customer_code
            FROM TB_CUSTMST
            WHERE item_code = #{itemCommonCode}
            """)
    List<Item> getCustomerName(String itemCommonCode);

    @Update("""
            UPDATE TB_ITEMMST
            SET input_price = #{item.inputPrice},
            output_price = #{item.outputPrice},
            size = #{item.size},
            unit = #{item.unit},
            item_note = #{item.itemNote}
            WHERE item_key = #{itemKey}
            """)
    int editItem(int itemKey, Item item);

    @Select("""
            SELECT item_common_code
            FROM TB_ITEMMST
            """)
    List<String> getUsedItemCommonCode();

    @Select("""
            <script>
                SELECT COUNT(*)
                    FROM TB_ITEMMST i
                    LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
                    LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                   <trim prefix="WHERE" prefixOverrides="AND">
                    <if test="active == 1">
                        i.item_active = 1
                    </if>
                   \s
                    <if test="keyword != null and keyword != ''">
                        <choose>
                            <when test="type == 'all'">
                                AND (
                                    ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </when>
                            <when test="type == 'itemName'">
                                AND ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'customerName'">
                                AND c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'inputPrice'">
                                AND CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                            <when test="type == 'outputPrice'">
                                AND CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                            </when>
                        </choose>
                    </if>
                </trim>
            
            </script>
            """)
    Integer countAll(Integer active, String type, String keyword);

}
