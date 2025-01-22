CREATE TABLE TB_PURCH_REQ
(
    purchase_request_key  INT AUTO_INCREMENT PRIMARY KEY,
    employee_no           VARCHAR(13) NOT NULL,
    item_common_code      VARCHAR(5)  NOT NULL,
    customer_code         VARCHAR(13) NOT NULL,
    amount                INT         NOT NULL,
    purchase_request_date DATE        DEFAULT CURRENT_DATE,
    purchase_consent      BOOLEAN     DEFAULT NULL,
    purchase_request_note VARCHAR(50) DEFAULT NULL
);

DROP TABLE TB_PURCH_REQ;