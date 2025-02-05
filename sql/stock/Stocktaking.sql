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
