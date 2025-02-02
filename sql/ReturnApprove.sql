USE teamPrj0106;

CREATE TABLE TB_RTN_APPR
(
    return_approve_key     INT PRIMARY KEY AUTO_INCREMENT,
    return_request_key     INT         NOT NULL REFERENCES TB_RTN_REQ (return_request_key),
    customer_configurer_no VARCHAR(13) NOT NULL REFERENCES TB_EMPMST (employee_no),
    customer_employee_no   VARCHAR(13) NOT NULL REFERENCES TB_EMPMST (employee_no),
    return_no              VARCHAR(13) NOT NULL UNIQUE,
    return_approve_date    DATETIME DEFAULT CURRENT_TIMESTAMP,
    return_date            DATE,
    return_approve_note    VARCHAR(50)
);

DROP TABLE TB_RTN_APPR;

ALTER TABLE TB_RTN_APPR
    MODIFY COLUMN return_approve_date DATETIME DEFAULT CURRENT_TIMESTAMP;

INSERT INTO TB_RTN_APPR
(return_request_key, customer_configurer_no, customer_employee_no, return_no)
VALUES (3, 'CUSEMP0000020', 'CUSEMP0000021', '0000000000003');

UPDATE TB_RTN_APPR
SET customer_employee_no='CUSEMP0000003'
    AND customer_configurer_no = 'CUSEMP0000002'
WHERE return_request_key = 1;

SELECT rr.franchise_code,
       f.franchise_name,
       ra.return_no,
       rr.serial_no,
       item_common_name,
       rr.business_employee_no,
       rr.customer_code,
       customer_name,
       ra.customer_employee_no,
       return_date,
       return_consent
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra
                   ON ra.return_request_key = rr.return_request_key
         LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
         LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
         LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
         LEFT JOIN TB_ITEMCOMM itc ON itc.item_common_code = its.item_common_code;


SELECT rr.return_request_key,
       rr.franchise_code,
       f.franchise_name,
       ra.return_no,
       rr.serial_no,
       itc.common_code_name itemCommonName,
       rr.business_employee_no,
       emb.employee_name AS businessEmployeeName,
       rr.customer_code,
       customer_name,
       customer_employee_no,
       emce.employee_name   customerEmployeeName,
       customer_configurer_no,
       emcc.employee_name   customerConfigurerName,
       return_request_date,
       return_approve_date,
       return_consent
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra
                   ON ra.return_request_key = rr.return_request_key
         LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
         LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
         LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
         LEFT JOIN TB_SYSCOMM itc ON itc.common_code = its.item_common_code
         LEFT JOIN TB_EMPMST emb ON emb.employee_no = rr.business_employee_no
         LEFT JOIN TB_EMPMST emce ON emce.employee_no = ra.customer_employee_no
         LEFT JOIN TB_EMPMST emcc ON emcc.employee_no = ra.customer_configurer_no
WHERE common_code_name LIKE CONCAT('%', '장', '%')
  AND (1 = 1 || return_consent IS NOT true || return_consent IS NOT false);

SELECT rr.return_request_key,
       rr.franchise_code,
       f.franchise_name,
       ra.return_no,
       rr.serial_no,
       itc.common_code_name  itemCommonName,
       rr.business_employee_no,
       emb.employee_name  AS businessEmployeeName,
       customer_employee_no,
       emce.employee_name AS customerEmployeeName,
       customer_configurer_no,
       emcc.employee_name AS customerConfigurerName,
       rr.customer_code,
       customer_name,
       ra.customer_employee_no,
       return_request_date,
       return_approve_date,
       return_date,
       return_consent,
       return_request_note
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra
                   ON ra.return_request_key = rr.return_request_key
         LEFT JOIN TB_FRNCHSMST f ON f.franchise_code = rr.franchise_code
         LEFT JOIN TB_CUSTMST c ON c.customer_code = rr.customer_code
         LEFT JOIN TB_ITEMSUB its ON its.serial_no = rr.serial_no
         LEFT JOIN TB_SYSCOMM itc ON itc.common_code = its.item_common_code
         LEFT JOIN TB_EMPMST emb ON emb.employee_no = rr.business_employee_no
         LEFT JOIN TB_EMPMST emce ON emce.employee_no = ra.customer_employee_no
         LEFT JOIN TB_EMPMST emcc ON emcc.employee_no = ra.customer_configurer_no
WHERE rr.return_request_key = 11;


SELECT e.employee_name AS customerConfigurerName, e.employee_no AS customerConfigurerNo
FROM TB_RTN_REQ r
         LEFT JOIN TB_EMPMST e ON r.customer_code = e.employee_workplace_code
WHERE r.return_request_key = 12;

SELECT *
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra ON rr.return_request_key = ra.return_request_key
WHERE return_approve_key IS NOT NULL
ORDER BY ra.return_request_key;

SELECT serial_no
FROM TB_INOUT_HIS his
WHERE franchise_code = 'FRN0000000002'
EXCEPT
(SELECT serial_no
 FROM TB_RTN_REQ
 WHERE return_consent IS NULL || TB_RTN_REQ.return_consent = true
     AND franchise_code = 'FRN0000000002');