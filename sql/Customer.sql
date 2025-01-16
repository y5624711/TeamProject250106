CREATE TABLE TB_CUSTMST
(
    customer_key             INT PRIMARY KEY AUTO_INCREMENT,
    item_code                VARCHAR(5),
    customer_code            VARCHAR(13) NOT NULL,
    customer_name            VARCHAR(30) NOT NULL,
    customer_rep             VARCHAR(5)  NOT NULL,
    customer_no              VARCHAR(13) NOT NULL,
    customer_tel             VARCHAR(15) NOT NULL,
    customer_fax             VARCHAR(15),
    customer_address         VARCHAR(50) NOT NULL,
    customer_address_details VARCHAR(50),
    customer_post            VARCHAR(10) NOT NULL,
    customer_active          BOOLEAN DEFAULT true,
    customer_note            VARCHAR(50)
);


# DROP TABLE partner;


INSERT INTO TB_CUSTMST
(customer_name, customer_code, item_code, customer_rep, customer_no,
 customer_tel, customer_fax, customer_address, customer_address_details,
 customer_post, customer_active, customer_note)
VALUES ('중앙셀로', 'CUS0002', 'CEL', '백종원', '1123027845',
        '0321223213', '0321223213', '용산', null,
        '10327', true, null);

SELECT *
FROM TB_ITEMCOMM;
# WHERE item_common_code NOT IN
SELECT item_code
FROM TB_CUSTMST
WHERE customer_active = TRUE;

SELECT ic.*
FROM TB_ITEMCOMM ic
         LEFT JOIN (SELECT DISTINCT item_code
                    FROM TB_CUSTMST
                    WHERE customer_active = TRUE) cm ON ic.item_common_code = cm.item_code
WHERE cm.item_code IS NULL;

SELECT customer_key, customer_name, customer_code, item_code, item_common_name, customer_rep, customer_active
FROM TB_CUSTMST
         LEFT OUTER JOIN TB_ITEMCOMM ON item_code = item_common_code;

SELECT customer_key, customer_name, customer_code, item_code, item_common_name itemName, customer_rep, customer_active
FROM TB_CUSTMST
         LEFT OUTER JOIN TB_ITEMCOMM ON item_code = item_common_code
WHERE customer_active = false
  AND customer_name LIKE CONCAT('중앙');

SELECT customer_key, customer_name, customer_code, item_code, item_common_name itemName, customer_rep, customer_active
FROM TB_CUSTMST
         LEFT OUTER JOIN TB_ITEMCOMM ON item_code = item_common_code
WHERE customer_active != false
  AND item_common_name LIKE CONCAT('%', '냉', '%');