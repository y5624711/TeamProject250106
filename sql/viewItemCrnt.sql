use teamPrj0106;
CREATE TABLE V_ITEM_CRNT
(
    item_current_key INT PRIMARY KEY AUTO_INCREMENT,
    item_code        VARCHAR(5),
    warehouse_code   VARCHAR(13),
    count            INT
);


INSERT INTO V_ITEM_CRNT(item_code, warehouse_code, count)
SELECT a.item_common_code, b.warehouse_code, COUNT(*) AS count
FROM TB_ITEMSUB a
         JOIN TB_INOUT_HIS b
              ON a.serial_no = b.serial_no
WHERE b.inout_common_code = 'in'
GROUP BY a.item_common_code, b.warehouse_code;

SELECT a.item_code,
       a.warehouse_code,
       b.common_code_name,
       d.warehouse_name,
       d.warehouse_city,
       d.warehouse_address,
       d.warehouse_address_detail,
       c.customer_name,
       a.count
FROM V_ITEM_CRNT a
         JOIN TB_SYSCOMM b ON a.item_code = b.common_code
         JOIN TB_CUSTMST c ON a.item_code = c.item_code
         JOIN TB_WHMST d ON c.customer_code = d.customer_code;


SELECT a.item_common_code, b.warehouse_code, COUNT(*) AS count
FROM TB_ITEMSUB a
         JOIN TB_INOUT_HIS b
              ON a.serial_no = b.serial_no
WHERE b.inout_common_code = 'in'
GROUP BY a.item_common_code, b.warehouse_code;

SELECT a.item_code,
       b.common_code_name,
       c.warehouse_name,
       c.warehouse_city,
       c.warehouse_address,
       d.customer_name,
       a.count
FROM V_ITEM_CRNT a
         JOIN TB_SYSCOMM b ON a.item_code = b.common_code
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_CUSTMST d ON a.item_code = d.item_code;

INSERT INTO TB_INOUT_HIS(serial_no,
                         warehouse_code,
                         inout_common_code,
                         customer_employee_no,
                         business_employee_no,
                         franchise_code)
VALUES ('00000000000000000020',
        'WH4328332',
        'in',
        'CUSEMP0000020',
        'BIZEMP0000004',
        'FRN0000000002');

INSERT INTO TB_ITEMSUB(item_common_code, serial_no, current_common_code)
VALUES ('POS', '00000000000000000020', 'WH');

# INSERT INTO TB_WHMST()


DELETE
FROM TB_INOUT_HIS
WHERE inout_history_key = 5;

CREATE VIEW V_ITEM_CRNT AS
SELECT b.warehouse_name,
       b.warehouse_city,
       b.warehouse_address,
       b.warehouse_address_detail,
       d.customer_name,
       e.common_code_name,
       COUNT(*)
FROM TB_INOUT_HIS a
         JOIN TB_WHMST b ON a.warehouse_code = b.warehouse_code
         JOIN TB_ITEMSUB c ON a.serial_no = c.serial_no
         JOIN TB_CUSTMST d ON c.item_common_code = d.item_code
         JOIN TB_SYSCOMM e ON c.item_common_code = e.common_code
WHERE inout_common_code = 'in'
GROUP BY e.common_code;

SELECT *
FROM V_ITEM_CRNT;

CREATE TABLE a
(
    a INT
);

INSERT INTO a
VALUES (1),
       (2);


CREATE VIEW b AS
SELECT a * 2 v
FROM a;


SELECT *
FROM b
WHERE v = 2;

select *
FROM V_ITEM_CRNT;

DROP VIEW V_ITEM_CRNT;

