USE teamPrj0106;

CREATE TABLE TB_ITEMSUB
(
    item_sub_key     INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code VARCHAR(5) NOT NULL,
    serial_no        VARCHAR(6) NOT NULL UNIQUE,
    item_sub_active  BOOLEAN DEFAULT TRUE,
    item_sub_note    VARCHAR(50),

    CONSTRAINT fk_item_sub FOREIGN KEY (item_common_code)
        REFERENCES TB_SYSCOMM (common_code) ON UPDATE CASCADE
);

INSERT INTO TB_ITEMSUB
    (item_common_code, serial_no)
VALUES ('WAR', '00000000000000000012');

INSERT INTO TB_EMPMST
(employee_common_code, employee_workplace_code, employee_no, employee_name, employee_tel)
VALUES ('CUS', 'CUS0000000005', 'CUSEMP0000023', '김몽룡', '01044657885');

SELECT common_code_name, its.item_common_code, customer_name, customer_code
FROM TB_ITEMSUB its
         LEFT JOIN TB_SYSCOMM itc ON itc.common_code = its.item_common_code
         LEFT JOIN TB_CUSTMST c ON c.item_code = its.item_common_code
WHERE serial_no = 00000000000000000016;

ALTER TABLE TB_ITEMSUB
    ADD current_common_code VARCHAR(10) AFTER serial_no;

SELECT c.item_code AS item_common_code, sc.common_code_name as item_common_name
FROM TB_CUSTMST c
         LEFT JOIN TB_SYSCOMM sc ON c.item_code = sc.common_code
WHERE c.item_code NOT IN (SELECT item_common_code FROM TB_ITEMMST)
  AND c.customer_active = 1
ORDER BY binary (item_common_name);

SELECT item_common_code
FROM TB_ITEMMST;

DROP TABLE TB_ITEMSUB;

desc TB_ITEMSUB;

#  ITEMSUB 에 현재 위치 나타내는 컬럼 없길래 추가  > VARCHAR 5 아니면 수정좀 부탁드려요
ALTER TABLE TB_ITEMSUB
    add column current_common_code VARCHAR(5);