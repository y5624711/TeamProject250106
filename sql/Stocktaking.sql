USE teamPrj0106;

CREATE TABLE TB_STKTK
(
    stocktaking_key      INT         NULL AUTO_INCREMENT PRIMARY KEY,
    item_code            VARCHAR(5)  NOT NULL,
    warehouse_code       VARCHAR(13) NOT NULL,
    location_key         INT         NULL,
    customer_employee_no VARCHAR(13) NOT NULL,
    count_current        INT         NULL,
    count_configuration  INT         NULL,
    stocktaking_type     BOOLEAN     NOT NULL,
    stocktaking_date     DATETIME    NULL DEFAULT NOW()
);

INSERT INTO TB_STKTK (item_code, warehouse_code, location_key, customer_employee_no, count_current, count_configuration)
VALUES ('POS', 'WH4328332', '2', 'CUSEMP0000024', '100', '100');

DELETE
FROM TB_STKTK
WHERE stocktaking_key = 1;

SELECT s.stocktaking_key,
       s.item_code,
       s.warehouse_code,
       s.location_key,
       s.customer_employee_no,
       s.count_current,
       s.count_configuration,
       s.stocktaking_type,
       s.stocktaking_date,
       w.warehouse_name,
       w.customer_code,
       itcm.item_common_name itemName,
       cus.customer_name,
       emp.employee_name customerEmployeeName
FROM TB_STKTK s
         LEFT JOIN TB_WHMST w ON s.warehouse_code=w.warehouse_code
         LEFT JOIN TB_CUSTMST cus ON w.customer_code=cus.customer_code
         LEFT JOIN TB_ITEMCOMM itcm ON s.item_code=itcm.item_common_code
         LEFT JOIN TB_EMPMST emp ON s.customer_employee_no=emp.employee_no
WHERE
    <if test="searchType == 'all'">
    w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
   OR cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
   OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
    </if>
    <if test="searchType != 'all'">
    <choose>
    <when test="searchType == 'customer'">
    cus.customer_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR w.customer_code LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <when test="searchType == 'item'">
    itcm.item_common_name LIKE CONCAT('%',#{searchKeyword},'%')
   OR s.item_code LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <when test="searchType == 'warehouse'">
    s.warehouse_code LIKE CONCAT('%',#{searchKeyword},'%')
   OR w.warehouse_name LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <when test="searchType == 'customerEmployee'">
    s.customer_employee_no LIKE CONCAT('%',#{searchKeyword},'%')
   OR emp.employee_name LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <when test="searchType == 'type'">
    s.stocktaking_type LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <when test="searchType == 'date'">
    s.stocktaking_date LIKE CONCAT('%',#{searchKeyword},'%')
    </when>
    <otherwise>
    1 = 0
    </otherwise>
    </choose>
    </if>
ORDER BY s.stocktaking_date DESC
    LIMIT #{pageList},10;