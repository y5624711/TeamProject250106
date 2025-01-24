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
       sc.common_code_name       as item_common_name,
       c.customer_name,
       i.business_employee_no,
       e.employee_name           as business_employee_name,
       w.warehouse_name,
       i.install_request_date,
       i.install_request_consent as consent
FROM TB_INSTL_REQ i
         LEFT JOIN TB_FRNCHSMST f ON i.franchise_code = f.franchise_code
         LEFT JOIN TB_SYSCOMM sc ON i.item_common_code = sc.common_code
         LEFT JOIN TB_CUSTMST c ON i.customer_code = c.customer_code
         LEFT JOIN TB_EMPMST e ON i.business_employee_no = e.employee_no
         LEFT JOIN TB_WHMST w ON i.customer_code = w.customer_code
WHERE i.install_request_consent IS NULL
   OR i.install_request_consent = 0;
SELECT ia.install_approve_key,
       f.franchise_name,
       sc.common_code_name        as item_common_name,
       ia.output_no,
       ir.business_employee_no,
       e1.employee_name           as business_employee_name,
       ia.customer_employee_no,
       e2.employee_name           as customer_employee_name,
       e3.employee_name           as customer_installer_name,
       w.warehouse_name,
       ia.install_approve_date,
       ia.install_approve_consent as consent,
       c.customer_name
FROM TB_INSTL_APPR ia
         LEFT JOIN TB_INSTL_REQ ir ON ia.install_request_key = ir.install_request_key
         LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
         LEFT JOIN TB_SYSCOMM sc ON ir.item_common_code = sc.common_code
         LEFT JOIN TB_CUSTMST c ON sc.common_code = c.item_code
         LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 신청자 조인
         LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
         LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
         LEFT JOIN TB_WHMST w ON ir.customer_code = w.customer_code;