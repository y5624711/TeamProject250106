USE teamPrj0106;

CREATE TABLE TB_RTN_APPR
(
    return_approve_key     INT PRIMARY KEY AUTO_INCREMENT,
    return_request_key     INT         NOT NULL,
    customer_configurer_no VARCHAR(13) NOT NULL,
    customer_employee_no   VARCHAR(13) NOT NULL,
    return_no              VARCHAR(13) NOT NULL,
    return_date            DATE DEFAULT CURRENT_DATE,
    return_approve_note    VARCHAR(50)
);