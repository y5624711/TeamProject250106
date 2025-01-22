CREATE TABLE TB_PURCH_APPR
(
    purchase_approve_key  INT AUTO_INCREMENT PRIMARY KEY,
    purchase_request_key  INT         NOT NULL,
    customer_employee_no  VARCHAR(13) NOT NULL,
    warehouse_code        VARCHAR(13) NOT NULL,
    purchase_no           VARCHAR(13) NOT NULL,
    purchase_approve_date DATE        DEFAULT CURRENT_DATE,
    purchase_approve_note VARCHAR(50) DEFAULT NULL
);

DROP TABLE TB_PURCH_APPR;