CREATE TABLE TB_PURCH_REQ
(
    purchase_request_key  INT AUTO_INCREMENT PRIMARY KEY,
    employee_no           VARCHAR(9) NOT NULL,
    item_common_code      VARCHAR(5) NOT NULL,
    customer_code         VARCHAR(6) NOT NULL,
    amount                INT        NOT NULL,
    purchase_request_date TIMESTAMP   DEFAULT CURRENT_TIMESTAMP,
    purchase_consent      BOOLEAN     DEFAULT NULL,
    purchase_request_note VARCHAR(50) DEFAULT NULL,
    CONSTRAINT fk_employee_no FOREIGN KEY (employee_no) REFERENCES TB_EMPMST (employee_no) ON UPDATE CASCADE,
    CONSTRAINT fk_item_common_code FOREIGN KEY (item_common_code) REFERENCES TB_SYSCOMM (common_code)
        ON UPDATE CASCADE,
    CONSTRAINT fk_customer_code FOREIGN KEY (customer_code) REFERENCES TB_CUSTMST (customer_code) ON UPDATE CASCADE
);

DROP TABLE TB_PURCH_REQ;