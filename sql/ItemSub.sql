USE teamPrj0106;

CREATE TABLE TB_ITEMSUB
(
    item_sub_key     INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code VARCHAR(5)  NOT NULL,
    serial_no        VARCHAR(20) NOT NULL UNIQUE,
    item_sub_active  BOOLEAN DEFAULT TRUE,
    item_sub_note    VARCHAR(50)
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