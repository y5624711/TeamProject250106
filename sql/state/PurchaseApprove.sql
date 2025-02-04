CREATE TABLE TB_PURCH_APPR
(
    purchase_approve_key  INT AUTO_INCREMENT PRIMARY KEY,
    purchase_request_key  INT        NOT NULL,
    customer_employee_no  VARCHAR(9) NOT NULL,
    warehouse_code        VARCHAR(6) NOT NULL,
    purchase_no           VARCHAR(6) NOT NULL UNIQUE,
    purchase_approve_date TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    purchase_approve_note VARCHAR(50) DEFAULT NULL,
    CONSTRAINT fk_purchase_request_key FOREIGN KEY (purchase_request_key) REFERENCES TB_PURCH_REQ (purchase_request_key) ON UPDATE CASCADE,
    CONSTRAINT fk_customer_employee_no FOREIGN KEY (customer_employee_no) REFERENCES TB_EMPMST (employee_no) ON UPDATE CASCADE,
    CONSTRAINT fk_warehouse_code FOREIGN KEY (warehouse_code) REFERENCES TB_WHMST (warehouse_code) ON UPDATE CASCADE
);

DROP TABLE TB_PURCH_APPR;