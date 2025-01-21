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

SELECT rr.return_request_key,
       rr.franchise_code,
       f.franchise_name,
       ra.return_no,
       rr.serial_no,
       item_common_name,
       rr.business_employee_no,
       emb.employee_name  AS businessEmployeeName,
       customer_employee_no,
       emce.employee_name AS customerEmployeeName,
       customer_configurer_no,
       emcc.employee_name AS customerConfigurerName,
       rr.customer_code,
       customer_name,
       ra.customer_employee_no,
       return_date,
       return_consent,
       return_request_note
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra
                   ON ra.return_request_key = rr.return_request_key
         LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
         LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
         LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
         LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code
         LEFT JOIN TB_EMPMST emb ON emb.employee_no = rr.business_employee_no
         LEFT JOIN TB_EMPMST emce ON emce.employee_no = ra.customer_employee_no
         LEFT JOIN TB_EMPMST emcc ON emcc.employee_no = ra.customer_configurer_no
WHERE rr.return_request_key = 1;
