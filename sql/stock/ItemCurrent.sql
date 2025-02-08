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


###최최최최최최최종
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
               WHEN a.inout_common_code IN ('INSTK', 'RETRN', 'STKP') THEN 1
               WHEN a.inout_common_code = 'OUT' THEN -1
               WHEN a.inout_common_code = 'STKM' THEN -1
               ELSE 0
           END) AS count
FROM TB_INOUT_HIS a
         JOIN TB_ITEMSUB b ON a.serial_no = b.serial_no
         JOIN TB_WHMST c ON a.warehouse_code = c.warehouse_code
         JOIN TB_SYSCOMM d ON b.item_common_code = d.common_code
         JOIN TB_CUSTMST e ON c.customer_code = e.customer_code
WHERE a.inout_common_code IN ('INSTK', 'RETRN', 'OUT', 'STKP', 'STKM')
GROUP BY a.warehouse_code, d.common_code, d.common_code_name;

DROP VIEW V_ITEM_CRNT;
CREATE VIEW V_ITEM_CRNT AS
SELECT sys.common_code,
       wh.warehouse_code,
       sys.common_code_name,
       wh.warehouse_name,
       wh.warehouse_city,
       wh.warehouse_address,
       wh.warehouse_address_detail,
       cus.customer_name,
       COUNT(sub.item_common_code) AS count
FROM TB_ITEMSUB sub
         LEFT JOIN TB_INOUT_HIS his ON sub.serial_no = his.serial_no
         LEFT JOIN TB_SYSCOMM sys ON sub.item_common_code = sys.common_code
         LEFT JOIN TB_CUSTMST cus ON sys.common_code = cus.customer_code
         LEFT JOIN TB_WHMST wh ON cus.customer_code = wh.customer_code
WHERE sub.current_common_code = 'WHS'
  AND sub.item_sub_active = 1
GROUP BY sys.common_code, sys.common_code_name, wh.warehouse_name, cus.customer_name;

CREATE VIEW V_ITEM_CRNT AS
WITH Latest_Inout AS (SELECT his.serial_no,
                             his.warehouse_code,
                             his.inout_common_code,
                             ROW_NUMBER() OVER (PARTITION BY his.serial_no ORDER BY his.inout_history_date DESC) AS rn
                      FROM TB_INOUT_HIS his
                      WHERE his.inout_common_code IN ('INSTK', 'RETRN', 'STKP') -- 원하는 inout_common_code만 필터링
)
SELECT sys.common_code,
       wh.warehouse_code,
       sys.common_code_name,
       wh.warehouse_name,
       wh.warehouse_city,
       wh.warehouse_address,
       wh.warehouse_address_detail,
       cus.customer_name,
       COUNT(sub.item_common_code) AS count
FROM TB_ITEMSUB sub
         LEFT JOIN Latest_Inout his ON sub.serial_no = his.serial_no AND his.rn = 1 -- 최신 데이터만 JOIN
         LEFT JOIN TB_SYSCOMM sys ON sub.item_common_code = sys.common_code
         LEFT JOIN TB_WHMST wh ON his.warehouse_code = wh.warehouse_code
         LEFT JOIN TB_CUSTMST cus ON wh.customer_code = cus.customer_code
WHERE sub.current_common_code = 'WHS'
  AND sub.item_sub_active = 1
GROUP BY sys.common_code, sys.common_code_name, wh.warehouse_name, cus.customer_name;

DROP VIEW V_ITEM_CRNT;