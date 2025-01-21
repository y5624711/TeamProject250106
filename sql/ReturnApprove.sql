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

INSERT INTO TB_RTN_APPR
(return_request_key, customer_configurer_no, customer_employee_no, return_no)
VALUES (3, 'CUSEMP0000004', 'CUSEMP0000009', '0000000000006');

UPDATE TB_RTN_REQ
SET return_consent = true
WHERE return_request_key = 1;

SELECT *
FROM TB_RTN_REQ rr
         LEFT JOIN TB_RTN_APPR ra
                   ON ra.return_request_key = rr.return_request_key;