USE teamPrj0106;

CREATE TABLE TB_INOUT_HIS
(
    inout_history_key    INT         NULL AUTO_INCREMENT PRIMARY KEY,
    serial_no            VARCHAR(20) NOT NULL,
    warehouse_code       VARCHAR(13) NOT NULL,
    inout_common_code    VARCHAR(5)  NOT NULL,
    customer_employee_no VARCHAR(13) NOT NULL,
    business_employee_no VARCHAR(13) NOT NULL,
    franchise_code       VARCHAR(13) NULL,
    location_key         INT         NULL,
    inout_history_date   DATE        NULL DEFAULT NOW(),
    count_current        INT         NULL,
    inout_history_note   VARCHAR(50) NULL
);

DROP TABLE TB_INOUT_HIS;

INSERT INTO TB_INOUT_HIS (serial_no, warehouse_code, inout_common_code, customer_employee_no, business_employee_no,
                          franchise_code, count_current, inout_history_note)
VALUES ('00000000000000000009', 'WH4328332', '', 'CUSEMP0000020', 'BIZEMP0000004',
        'FRN0000000002', '1', '이상 없음');