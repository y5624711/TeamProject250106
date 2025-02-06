USE teamPrj0106;

CREATE TABLE TB_LOCMST
(
    location_key    INT         NULL AUTO_INCREMENT PRIMARY KEY,
    warehouse_code  VARCHAR(6)  NOT NULL,
    row             VARCHAR(2)  NOT NULL,
    col             VARCHAR(2)  NOT NULL,
    shelf           INT         NOT NULL,
    located         BOOLEAN DEFAULT FALSE,
    location_active BOOLEAN DEFAULT TRUE,
    location_note   VARCHAR(50) NULL,
    FOREIGN KEY (warehouse_code) REFERENCES TB_WHMST (warehouse_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);

DROP TABLE TB_INOUT_HIS;

ALTER TABLE TB_LOCMST
    ADD COLUMN location_active BOOLEAN DEFAULT TRUE;

UPDATE TB_LOCMST
SET located = true
WHERE shelf = 1;

DELETE
FROM TB_LOCMST
WHERE warehouse_code = 'WHS0000000007';

INSERT INTO TB_LOCMST (warehouse_code, row, col, shelf, located, location_note)
SELECT 'WHS0000000005' AS warehouse_code,
       r.num           AS row,
       c.num           AS col,
       s.num           AS shelf,
       FALSE           AS located,
       NULL            AS location_note
FROM (SELECT 1 AS num
      UNION ALL
      SELECT 2
      UNION ALL
      SELECT 3
      UNION ALL
      SELECT 4
      UNION ALL
      SELECT 5) s
         CROSS JOIN
     (SELECT 1 AS num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) c
         CROSS JOIN
     (SELECT 1 AS num UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4 UNION ALL SELECT 5) r;

UPDATE TB_LOCMST
SET col='05'
WHERE col = '5';