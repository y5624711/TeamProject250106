package com.example.backend.mapper.standard.item;

import com.example.backend.dto.standard.customer.Customer;
import com.example.backend.dto.standard.item.Item;
import org.apache.ibatis.annotations.*;

import java.util.List;

@Mapper
public interface ItemMapper {
    // 품목 추가하기
    @Insert("""
            INSERT INTO TB_ITEMMST
            (item_key, item_common_code, customer_code, input_price, output_price, size, unit, item_note)
            VALUES (#{itemKey}, #{itemCommonCode}, #{customerCode}, #{inputPrice}, #{outputPrice}, #{size}, #{unit}, #{itemNote})
            """)
    @Options(keyProperty = "itemKey", useGeneratedKeys = true)
    int addItem(Item item);

    // 품목 구분 코드, 담당 업체 가져오기
    @Select("""
            SELECT c.item_code AS item_common_code, sc.common_code_name as item_common_name, c.customer_code, c.customer_name
            FROM TB_CUSTMST c LEFT JOIN TB_SYSCOMM sc ON c.item_code = sc.common_code
            WHERE c.item_code NOT IN (SELECT item_common_code FROM TB_ITEMMST)
            AND c.customer_active = 1
            ORDER BY binary(item_common_name)
            """)
    List<Item> getItemCommonCode();

    // 품목 리스트 가져오기
    @Select("""
            <script>
                SELECT\s
                    i.*,
                    sc.common_code_name as item_common_name,
                    c.customer_name
                FROM TB_ITEMMST i
                LEFT JOIN TB_SYSCOMM sc ON i.item_common_code = sc.common_code
                LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                WHERE 1=1
            
                <if test="active == false">
                    AND i.item_active = TRUE
                </if>
            
                <if test="keyword != null and keyword.trim() != ''">
                    <choose>
                        <when test="type == null">
                            AND (
                                sc.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                                OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                OR i.unit LIKE CONCAT('%', #{keyword}, '%')
                                OR i.size LIKE CONCAT('%', #{keyword}, '%')
                                OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                            )
                        </when>
                        <otherwise>
                            AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                        </otherwise>
                    </choose>
                </if>
            
                <if test="sort != null and sort != ''">
                    ORDER BY ${sort} ${order}
                </if>
                <if test="sort == null">
                    ORDER BY i.item_key DESC
                </if>
            
                LIMIT #{offset}, 10
            </script>
            """)
    List<Item> getItemList(Integer offset, Boolean active, String type, String keyword, String sort, String order);

    // 품목 리스트 총 수 가져오기
    @Select("""
                <script>
                    SELECT COUNT(*)
                    FROM TB_ITEMMST i
                    LEFT JOIN TB_SYSCOMM sc ON i.item_common_code = sc.common_code
                    LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
                    WHERE 1=1
                    <if test="active == false">
                        AND i.item_active = TRUE
                    </if>
            
                    <if test="keyword != null and keyword.trim() != ''">
                        <choose>
                            <when test="type == null">
                                AND (
                                    sc.common_code_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR c.customer_name LIKE CONCAT('%', #{keyword}, '%')
                                    OR i.unit LIKE CONCAT('%', #{keyword}, '%')
                                    OR i.size LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.input_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                    OR CAST(i.output_price AS CHAR) LIKE CONCAT('%', #{keyword}, '%')
                                )
                            </when>
                            <otherwise>
                                AND ${type} LIKE CONCAT('%', #{keyword}, '%')
                            </otherwise>
                        </choose>
                    </if>
                </script>
            """)
    Integer countAll(Boolean active, String type, String keyword);

    // 품목 1개 정보 가져오기
    @Select("""
            SELECT i.*, sc.common_code_name as item_common_name, c.customer_name
            FROM TB_ITEMMST i LEFT JOIN TB_SYSCOMM sc ON i.item_common_code = sc.common_code
                              LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
            WHERE i.item_key = #{itemKey}
            """)
    Item getItemView(Integer itemKey);

    // 품목 수정하기
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

    // 품목 중복 검증
    @Select("""
            SELECT item_common_code
            FROM TB_ITEMMST
            WHERE item_active = true
            """)
    List<String> getUsedItemCommonCode();

    // 코드중 시리얼 넘버 최댓값 가져오기 > 정수값으로 변환하도록
    @Select("""
                SELECT MAX(CAST(SUBSTRING(serial_no, 2) AS UNSIGNED))
                FROM TB_ITEMSUB
                WHERE serial_no LIKE 'S%'
            """)
    Integer viewMaxSerialNoByItemCode(String itemCommonCode);

    // 협력 업체 비활성화 시 품목도 비활성화
    @Update("""
            UPDATE TB_ITEMMST
            SET item_active = #{customerActive}
            WHERE customer_code = #{customerCode}
            """)
    int editItemActive(Customer customer);

    // 확정 입고 시 품목 시리얼 번호, 현재 위치 창고로 설정
    @Insert("""
            INSERT INTO TB_ITEMSUB
            (item_common_code,serial_no,current_common_code)
            value
            (#{itemCommonCode},#{insertSerialNo},#{currentCommonCode})
            """)
    int addItemSub(String itemCommonCode, String insertSerialNo, String currentCommonCode);

    // 창고로 현재 위치 변경
    @Update("""
            UPDATE TB_ITEMSUB
            SET current_common_code="WHS"
            where serial_no=#{itemSerialNo}
            """)
    int updateCurrentCommonCodeBySerialNo(String itemSerialNo);

}
