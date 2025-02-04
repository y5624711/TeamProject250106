CREATE TABLE TB_CUSTMST
(
    customer_key             INT PRIMARY KEY AUTO_INCREMENT,
    item_code                VARCHAR(5)  NOT NULL REFERENCES TB_SYSCOMM (common_code) ON UPDATE CASCADE,
    customer_code            VARCHAR(13) NOT NULL UNIQUE,
    customer_name            VARCHAR(30) NOT NULL UNIQUE,
    customer_rep             VARCHAR(5)  NOT NULL,
    customer_no              VARCHAR(13) NOT NULL UNIQUE,
    customer_tel             VARCHAR(15) NOT NULL UNIQUE,
    customer_fax             VARCHAR(15),
    customer_address         VARCHAR(50) NOT NULL,
    customer_address_details VARCHAR(50),
    customer_post            VARCHAR(10) NOT NULL,
    customer_active          BOOLEAN DEFAULT true,
    customer_note            VARCHAR(50)
);


DROP TABLE TB_CUSTMST;

DESC TB_CUSTMST;

INSERT INTO TB_CUSTMST
(customer_name, customer_code, item_code, customer_rep, customer_no,
 customer_tel, customer_fax, customer_address, customer_post)
VALUES ('중앙포스', 'CUS0000000001', 'POS', '백종숙', '20113324468',
        '0321156483', '0321156483', '용산 한강로동 17가', '10327');


SELECT item_code
FROM TB_CUSTMST
WHERE customer_active = TRUE;

UPDATE TB_ITEMMST
SET item_active = 0
WHERE customer_code = 'CUS0000000011';

SELECT *
FROM TB_ITEMMST
WHERE customer_code = 'CUS0000000011';

SELECT ic.*
FROM TB_SYSCOMM ic
         LEFT JOIN (SELECT DISTINCT item_code
                    FROM TB_CUSTMST
                    WHERE customer_active = TRUE) cm
                   ON ic.common_code = cm.item_code
WHERE cm.item_code IS NULL
  AND ic.common_code_active = TRUE
  AND common_code_type = 'ITEM'