CREATE TABLE TB_INSTL_APPR
(
    install_approve_key   INT PRIMARY KEY AUTO_INCREMENT,
    install_request_key   INT         NOT NULL,
    customer_employee_no  VARCHAR(13) NOT NULL,
    customer_installer_no VARCHAR(13) NOT NULL,
    output_no             VARCHAR(13) NOT NULL,
    install_schedule_date DATE,
    install_approve_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    install_approve_note  VARCHAR(50)
);

ALTER TABLE TB_INSTL_APPR
    ADD install_approve_consent BOOLEAN;