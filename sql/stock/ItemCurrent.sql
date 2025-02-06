DROP VIEW V_ITEM_CRNT;


SELECT *
FROM V_ITEM_CRNT;

CREATE VIEW V_ITEM_CRNT AS
SELECT d.common_code,
       a.warehouse_code,
       d.common_code_name,
       c.warehouse_name,
       c.warehouse_city,
       c.warehouse_address,
       c.warehouse_address_detail,
       e.customer_name,
       a.inout_history_date,
       count(*) AS count
FROM TB_INOUT_HIS a
         JOIN TB_ITEMSUB b ON a.serial_no = b.serial_no
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_SYSCOMM d ON b.item_common_code = d.common_code
         JOIN TB_CUSTMST e ON c.customer_code = e.customer_code
WHERE a.inout_common_code = 'INSTK'
   OR a.inout_common_code = 'RETRN'
GROUP BY a.warehouse_code, d.common_code;

CREATE VIEW V_ITEM_CRNT AS
SELECT d.common_code,
       a.warehouse_code,
       d.common_code_name,
       c.warehouse_name,
       c.warehouse_city,
       c.warehouse_address,
       c.warehouse_address_detail,
       e.customer_name,
       a.inout_history_date,
       COUNT(DISTINCT b.serial_no) AS count -- 중복된 serial_no 제거 후 카운트
FROM TB_INOUT_HIS a
         JOIN TB_ITEMSUB b ON a.serial_no = b.serial_no
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_SYSCOMM d ON b.item_common_code = d.common_code
         JOIN TB_CUSTMST e ON c.customer_code = e.customer_code
WHERE a.inout_common_code IN ('INSTK', 'RETRN') -- 조건 간소화
GROUP BY a.warehouse_code, d.common_code, d.common_code_name, c.warehouse_name,
         c.warehouse_city, c.warehouse_address, c.warehouse_address_detail,
         e.customer_name, a.inout_history_date;


# 최종
CREATE VIEW V_ITEM_CRNT AS
SELECT d.common_code,
       a.warehouse_code,
       d.common_code_name,
       c.warehouse_name,
       c.warehouse_city,
       c.warehouse_address,
       c.warehouse_address_detail,
       e.customer_name,
       a.inout_history_date,
       -- INSTK, RETRN은 +1, OUT은 -1 처리하여 합산
       SUM(CASE
               WHEN a.inout_common_code IN ('INSTK', 'RETRN') THEN 1
               WHEN a.inout_common_code = 'OUT' THEN -1
               ELSE 0
           END) AS count
FROM TB_INOUT_HIS a
         JOIN TB_ITEMSUB b ON a.serial_no = b.serial_no
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_SYSCOMM d ON b.item_common_code = d.common_code
         JOIN TB_CUSTMST e ON c.customer_code = e.customer_code
WHERE a.inout_common_code IN ('INSTK', 'RETRN') -- OUT도 포함
GROUP BY a.warehouse_code, d.common_code, d.common_code_name;

DROP VIEW V_ITEM_CRNT;

###최최최최종
CREATE VIEW V_ITEM_CRNT AS
SELECT d.common_code,
       a.warehouse_code,
       d.common_code_name,
       c.warehouse_name,
       c.warehouse_city,
       c.warehouse_address,
       c.warehouse_address_detail,
       e.customer_name,
       a.inout_history_date,
       -- INSTK, RETRN은 +1, OUT은 -1 처리하여 합산
       SUM(CASE
               WHEN a.inout_common_code IN ('INSTK', 'RETRN') THEN 1
               WHEN a.inout_common_code = 'OUT' THEN -1
               ELSE 0
           END) AS count
FROM TB_INOUT_HIS a
         JOIN TB_ITEMSUB b ON a.serial_no = b.serial_no
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_SYSCOMM d ON b.item_common_code = d.common_code
         JOIN TB_CUSTMST e ON c.customer_code = e.customer_code
WHERE a.inout_common_code IN ('INSTK', 'RETRN', 'OUT') -- OUT도 포함
GROUP BY a.warehouse_code, d.common_code, d.common_code_name;
