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
    stocktaking_date     DATE        NULL DEFAULT NOW()
);

INSERT INTO TB_STKTK (item_code, warehouse_code, location_key, customer_employee_no, count_current, count_configuration)
VALUES ('POS', 'WH4328332', '2', 'CUSEMP0000024', '100', '100');