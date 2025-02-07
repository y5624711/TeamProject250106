USE teamPrj0106;

CREATE TABLE TB_STKTK
(
    stocktaking_key      INT        NULL AUTO_INCREMENT PRIMARY KEY,
    item_code            VARCHAR(5) NOT NULL,
    warehouse_code       VARCHAR(6) NOT NULL,
    customer_employee_no VARCHAR(9) NOT NULL,
    count_current        INT        NULL,
    count_configuration  INT        NULL,
    count_difference     INT AS (count_configuration - count_current) STORED,
    stocktaking_type     BOOLEAN    NOT NULL,
    stocktaking_date     DATETIME DEFAULT NOW(),
    FOREIGN KEY (item_code) REFERENCES TB_SYSCOMM (common_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (warehouse_code) REFERENCES TB_WHMST (warehouse_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (customer_employee_no) REFERENCES TB_EMPMST (employee_no)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

ALTER TABLE TB_STKTK
    ADD COLUMN stocktaking_note VARCHAR(50) NULL;

DESC TB_STKTK;


ALTER TABLE TB_STKTK
    ADD COLUMN count_difference INT AS (count_configuration - count_current) STORED;

INSERT INTO TB_STKTK (item_code, warehouse_code, customer_employee_no, count_current, count_configuration)
VALUES ('POS', 'WH4328332', 'CUSEMP0000024', '100', '100');

DELETE
FROM TB_STKTK
WHERE stocktaking_key = 3;

SELECT l.location_key, ist.serial_no
FROM TB_LOCMST l
         LEFT JOIN TB_WHMST w ON l.warehouse_code = w.warehouse_code
         LEFT JOIN TB_CUSTMST cus ON w.customer_code = cus.customer_code
         LEFT JOIN TB_ITEMSUB ist ON cus.item_code = ist.item_common_code
WHERE w.warehouse_code = 'WHS001'
  AND l.located IS TRUE
  AND l.location_active IS TRUE;

SELECT l.location_key
FROM TB_LOCMST l
         LEFT JOIN TB_WHMST w ON l.warehouse_code = w.warehouse_code
WHERE w.warehouse_code = 'WHS003'
  AND l.row = '1'
  AND l.col = '4'
  AND l.shelf = '1'
  AND l.location_active IS TRUE;
