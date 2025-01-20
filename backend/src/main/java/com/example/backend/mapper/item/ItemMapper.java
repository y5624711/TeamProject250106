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
                    SELECT 
                        i.*,
                        ic.item_common_name,
                        c.customer_name
                    FROM TB_ITEMMST i
                    LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
                    LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                    <trim prefix="WHERE" prefixOverrides="AND">
                        <if test="active == false">
                            i.item_active = TRUE
                        </if>
                        <if test="active == true">
                            1=1
                        </if>
                        <if test="keyword != null and keyword != ''">
                            <if test="type == 'all'">
                                AND (
                                    ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR i.unit LIKE CONCAT('%', #{keyword}, '%')
                                    OR i.size LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </if>
                            <if test="type != 'all' and type != null">
                                AND `${type}` LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                        </if>
                    </trim>
                    <choose>
                        <when test="sort != null and sort != ''">
                            ORDER BY `${sort}` ${order}
                        </when>
                        <otherwise>
                            ORDER BY i.item_key DESC
                        </otherwise>
                    </choose>
                    LIMIT #{offset}, 10
                </script>
            """)
    List<Item> getItemList(Integer offset, Boolean active, String type, String keyword, String sort, String order);

    @Select("""
                <script>
                    SELECT COUNT(*)
                    FROM TB_ITEMMST i
                    LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
                    LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                    <trim prefix="WHERE" prefixOverrides="AND">
                        <if test="active == false">
                            i.item_active = TRUE
                        </if>
                        <if test="active == true">
                            1=1
                        </if>
                        <if test="keyword != null and keyword != ''">
                            <if test="type == 'all'">
                                AND (
                                    ic.item_common_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </if>
                            <if test="type != 'all' and type != null">
                                AND `${type}` LIKE CONCAT('%', #{keyword}, '%')
                            </if>
                        </if>
                    </trim>
                </script>
            """)
    Integer countAll(Boolean active, String type, String keyword);


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
            SELECT item_key
            FROM TB_ITEMMST
            WHERE item_active = false
            """)
    List<Integer> deletedItem();
}
