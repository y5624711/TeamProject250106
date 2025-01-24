USE teamPrj0106;

CREATE TABLE TB_INOUT_HIS
(
    inout_history_key    INT         NULL AUTO_INCREMENT PRIMARY KEY,
    serial_no            VARCHAR(20) NOT NULL,
    warehouse_code       VARCHAR(13) NOT NULL,
    inout_common_code    VARCHAR(5)  NOT NULL,
    customer_employee_no VARCHAR(13) NOT NULL,
    business_employee_no VARCHAR(13) NOT NULL,
    franchise_code       VARCHAR(13) NULL,
    location_key         INT         NULL,
    inout_history_date   DATETIME    NULL DEFAULT NOW(),
    inout_history_note   VARCHAR(50) NULL
);

INSERT INTO TB_INOUT_HIS (serial_no, warehouse_code, inout_common_code, customer_employee_no, business_employee_no,
                          franchise_code, count_current, inout_history_note)
VALUES ('00000000000000000009', 'WH4328332', '', 'CUSEMP0000020', 'BIZEMP0000004',
        'FRN0000000002', '1', '이상 없음');

SELECT h.inout_history_key,
       h.serial_no,
       h.warehouse_code,
       h.inout_common_code,
       h.customer_employee_no,
       h.business_employee_no,
       h.franchise_code,
       h.location_key,
       h.inout_history_date,
       h.inout_history_note,
       w.warehouse_name,
       itsb.item_common_code,
       itcm.item_common_name,
       fr.franchise_name,
       cusemp.employee_name customerEmployeeName,
       bizemp.employee_name businessEmployeeName
FROM TB_INOUT_HIS h
         LEFT JOIN TB_WHMST w ON h.warehouse_code = w.warehouse_code
         LEFT JOIN TB_ITEMSUB itsb ON h.serial_no = itsb.serial_no
         LEFT JOIN TB_ITEMCOMM itcm ON itsb.item_common_code = itcm.item_common_code
         LEFT JOIN TB_FRNCHSMST fr ON h.franchise_code = fr.franchise_code
         LEFT JOIN TB_EMPMST cusemp ON h.customer_employee_no = cusemp.employee_no
         LEFT JOIN TB_EMPMST bizemp ON h.business_employee_no = bizemp.employee_no
WHERE h.inout_history_key = 1;

SELECT *
FROM TB_EMPMST
WHERE employee_no = 'BIZEMP0000004';

ALTER TABLE TB_INOUT_HIS
    ADD inout_no VARCHAR(13);