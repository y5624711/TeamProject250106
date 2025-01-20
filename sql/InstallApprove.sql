CREATE TABLE TB_INSTL_APPR
(
    install_approve_key   INT PRIMARY KEY AUTO_INCREMENT,
    install_request_key   INT         NOT NULL,
    serial_no             VARCHAR(20) NOT NULL,
    customer_employee_no  VARCHAR(13) NOT NULL,
    customer_installer_no VARCHAR(13) NOT NULL,
    output_no             VARCHAR(13) NOT NULL,
    install_schedule_date DATE DEFAULT CURRENT_DATE,
    install_approve_date  DATE,
    install_approve_note  VARCHAR(50)
);