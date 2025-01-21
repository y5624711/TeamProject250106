USE teamPrj0106;

CREATE TABLE TB_INOUT_HIS
(
    inout_history_key    INT         NULL AUTO_INCREMENT PRIMARY KEY,
    serial_no            VARCHAR(20) NOT NULL,
    warehouse_code       VARCHAR(13) NOT NULL,
    inout_common_code    VARCHAR(5)  NOT NULL,
    customer_employee_no VARCHAR(13) NOT NULL,
    business_employee_no VARCHAR(13) NOT NULL,
    franchise_code       VARCHAR(13) NOT NULL,
    location_key         INT         NOT NULL,
    inout_history_date   DATE        NULL DEFAULT NOW(),
    count_current        INT         NULL,
    inout_history_note   VARCHAR(50) NULL
)