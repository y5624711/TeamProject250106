CREATE TABLE TB_INSTL_APPR
(
    install_approve_key   INT PRIMARY KEY AUTO_INCREMENT,
    install_request_key   INT        NOT NULL,
    customer_employee_no  VARCHAR(9) NOT NULL,
    customer_installer_no VARCHAR(9) NOT NULL,
    output_no             VARCHAR(6) NOT NULL UNIQUE,
    install_schedule_date DATE,
    install_approve_date  DATETIME DEFAULT CURRENT_TIMESTAMP,
    install_approve_note  VARCHAR(50),

    CONSTRAINT fk_install_request_key FOREIGN KEY (install_request_key)
        REFERENCES TB_INSTL_REQ (install_request_key) ON UPDATE CASCADE,
    CONSTRAINT fk_install_approve_employee FOREIGN KEY (customer_employee_no)
        REFERENCES TB_EMPMST (employee_no) ON UPDATE CASCADE,
    CONSTRAINT fk_install_approve_installer FOREIGN KEY (customer_installer_no)
        REFERENCES TB_EMPMST (employee_no) ON UPDATE CASCADE
);

ALTER TABLE TB_INSTL_APPR
    ADD install_approve_consent BOOLEAN;

SELECT DISTINCT ir.install_request_key            as installRequestKey,
                ia.install_approve_key,
                f.franchise_name                  as franchiseName,
                sc.common_code_name               as itemCommonName,
                c.customer_name                   as customerName,
                w.warehouse_name                  as warehouseName,
                ia.output_no                      as outputNo,
                ir.business_employee_no,
                ia.customer_employee_no,
                e1.employee_name                  as businessEmployeeName,
                e2.employee_name                  as customerEmployeeName,
                e3.employee_name                  as customerInstallerName,
                ia.install_approve_date           as installApproveDate,
                ir.install_request_date           as installRequestDate,
                ir.install_request_consent        as requestConsent,
                ia.install_approve_consent        as approveConsent,
                COALESCE(GREATEST(ir.install_request_date, ia.install_approve_date),
                         ir.install_request_date,
                         ia.install_approve_date) AS installDate
FROM TB_INSTL_REQ ir
         LEFT JOIN TB_INSTL_APPR ia ON ir.install_request_key = ia.install_request_key
         LEFT JOIN TB_FRNCHSMST f ON ir.franchise_code = f.franchise_code
         LEFT JOIN TB_SYSCOMM sc ON ir.item_common_code = sc.common_code
         LEFT JOIN TB_EMPMST e1 ON ir.business_employee_no = e1.employee_no -- 요청자 조인
         LEFT JOIN TB_EMPMST e2 ON ia.customer_employee_no = e2.employee_no -- 승인자 조인
         LEFT JOIN TB_EMPMST e3 ON ia.customer_installer_no = e3.employee_no -- 설치자 조인
         LEFT JOIN TB_CUSTMST c ON sc.common_code = c.item_code
         LEFT JOIN TB_WHMST w ON ir.customer_code = w.customer_code
ORDER BY installDate asc;

DROP TABLE TB_INSTL_APPR;

