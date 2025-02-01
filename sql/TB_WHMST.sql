USE teamPrj0106;

CREATE TABLE TB_WHMST
(
    warehouse_key            INT PRIMARY KEY NULL AUTO_INCREMENT,
    customer_code            VARCHAR(13)     NOT NULL,
    customer_employee_no     VARCHAR(13)     NOT NULL,
    warehouse_name           VARCHAR(30)     NOT NULL,
    warehouse_code           VARCHAR(13)     NOT NULL UNIQUE,
    warehouse_tel            VARCHAR(13)     NOT NULL,
    warehouse_address        VARCHAR(50)     NOT NULL,
    warehouse_address_detail VARCHAR(20)     NULL,
    warehouse_post           VARCHAR(10)     NOT NULL,
    warehouse_state          VARCHAR(10)     NOT NULL,
    warehouse_city           VARCHAR(10)     NOT NULL,
    warehouse_active         BOOLEAN         NULL,
    warehouse_note           VARCHAR(50)     NULL,

    FOREIGN KEY (customer_code) REFERENCES TB_CUSTMST (customer_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE,
    FOREIGN KEY (customer_employee_no) REFERENCES TB_EMPMST (employee_no)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

INSERT INTO TB_WHMST (customer_code, customer_employee_no, warehouse_name, warehouse_code, warehouse_tel,
                      warehouse_address, warehouse_address_detail, warehouse_post, warehouse_state, warehouse_city,
                      warehouse_active, warehouse_note)
VALUES ('WH5438332', 'COE3311823', '경기남부A', 'GSA001', '01001807060',
        '경기도 수원시', '수원역 앞 분식집 지하 1층', '3333', '경기도', '수원시',
        true, '아웃터파크');

SELECT *
FROM TB_WHMST
WHERE warehouse_address = 13
  AND warehouse_address_detail = 13;

UPDATE TB_WHMST
SET warehouse_active= false
WHERE warehouse_name = '제주A';

DELETE
FROM TB_WHMST
WHERE warehouse_name = '제주A';

SELECT *
FROM TB_WHMST;

SELECT warehouse_key, warehouse_name, warehouse_state, warehouse_city, warehouse_active
FROM TB_WHMST;

SELECT *
FROM TB_WHMST
WHERE warehouse_key = 1;