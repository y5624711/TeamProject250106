CREATE TABLE TB_INSTL_REQ
(
    install_request_key     INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code        VARCHAR(5)  NOT NULL,
    franchise_code          VARCHAR(13) NOT NULL,
    business_employee_no    VARCHAR(13) NOT NULL,
    customer_code           VARCHAR(13) NOT NULL,
    install_request_amount  INT         NOT NULL,
    install_request_date    DATETIME DEFAULT CURRENT_TIMESTAMP,
    install_request_consent BOOLEAN,
    install_request_note    VARCHAR(50)
);