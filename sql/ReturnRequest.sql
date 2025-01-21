USE teamPrj0106;

CREATE TABLE TB_RTN_REQ
(
    return_request_key   INT PRIMARY KEY AUTO_INCREMENT,
    serial_no            VARCHAR(20) NOT NULL,
    franchise_code       VARCHAR(13) NOT NULL,
    business_employee_no VARCHAR(13) NOT NULL,
    customer_code        VARCHAR(13) NOT NULL,
    return_request_date  DATE DEFAULT CURRENT_DATE,
    return_consent       BOOLEAN,
    return_request_note  VARCHAR(50)
);

DROP TABLE TB_RTN_REQ;

INSERT INTO TB_RTN_REQ
(serial_no, franchise_code, business_employee_no, customer_code, return_consent)
VALUES ('00000000000000000004', 'FRN0000000001', 'BIZEMP0000002', 'CUS0000000003', true);

SELECT rr.franchise_code, rr.serial_no, rr.business_employee_no, rr.customer_code, return_consent, employee_name
FROM TB_RTN_REQ rr
         LEFT JOIN TB_EMPMST em ON em.employee_no = rr.business_employee_no;
