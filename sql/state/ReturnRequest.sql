USE teamPrj0106;

CREATE TABLE TB_RTN_REQ
(
    return_request_key   INT PRIMARY KEY AUTO_INCREMENT,
    serial_no            VARCHAR(6) NOT NULL,
    franchise_code       VARCHAR(6) NOT NULL,
    business_employee_no VARCHAR(9) NOT NULL,
    customer_code        VARCHAR(6) NOT NULL,
    return_request_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_consent       BOOLEAN,
    return_request_note  VARCHAR(50),
    FOREIGN KEY (serial_no) REFERENCES TB_ITEMSUB (serial_no)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (franchise_code) REFERENCES TB_FRNCHSMST (franchise_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (business_employee_no) REFERENCES TB_EMPMST (employee_no)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (customer_code) REFERENCES TB_CUSTMST (customer_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE TB_RTN_REQ;

ALTER TABLE TB_RTN_REQ
    MODIFY COLUMN return_request_date DATETIME DEFAULT CURRENT_TIMESTAMP;

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

SELECT serial_no
FROM TB_INOUT_HIS
WHERE franchise_code = 'FRN0000000003'
EXCEPT
(SELECT serial_no
 FROM TB_RTN_REQ
 WHERE return_consent IS NULL || TB_RTN_REQ.return_consent = true
     AND franchise_code = 'FRN0000000003');


SELECT ioh.serial_no, common_code_name
FROM TB_ITEMSUB its
         LEFT JOIN TB_INOUT_HIS ioh
                   ON ioh.serial_no = its.serial_no
         LEFT JOIN TB_SYSCOMM sc
                   ON its.item_common_code = sc.common_code
WHERE current_common_code = 'FRN'
  AND franchise_code = 'FRN001'
EXCEPT
(SELECT rr.serial_no, common_code_name
 FROM TB_RTN_REQ rr
          LEFT JOIN TB_ITEMSUB its
                    ON rr.serial_no = its.serial_no
          LEFT JOIN TB_SYSCOMM sc
                    ON its.item_common_code = sc.common_code
 WHERE return_consent IS NULL || rr.return_consent = true
     AND franchise_code = 'FRN001');