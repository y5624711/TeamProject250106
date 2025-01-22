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

SELECT i.install_request_key,
       f.franchise_name,
       ic.item_common_name,
       c.customer_name,
       i.business_employee_no,
       e.employee_name           as business_employee_name,
       w.warehouse_name,
       i.install_request_date,
       i.install_request_consent as consent
FROM TB_INSTL_REQ i
         LEFT JOIN TB_FRNCHSMST f ON i.franchise_code = f.franchise_code
         LEFT JOIN TB_ITEMCOMM ic ON i.item_common_code = ic.item_common_code
         LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
         LEFT JOIN TB_EMPMST e ON i.business_employee_no = e.employee_no
         LEFT JOIN TB_WHMST w ON i.customer_code = w.customer_code
WHERE i.install_request_consent IS NULL
   OR i.install_request_consent = 0