USE teamPrj0106;

CREATE TABLE TB_LOCMST
(
    location_key   INT         NULL AUTO_INCREMENT PRIMARY KEY,
    warehouse_code VARCHAR(13) NOT NULL,
    row            VARCHAR(2)  NOT NULL,
    col            VARCHAR(2)  NOT NULL,
    shelf          INT         NOT NULL,
    located        BOOLEAN DEFAULT FALSE,
    location_note  VARCHAR(50) NULL
);

ALTER TABLE TB_LOCMST
    ADD COLUMN located BOOLEAN DEFAULT FALSE;

UPDATE TB_LOCMST
SET located = true
WHERE shelf = 1;

DELETE
FROM TB_LOCMST
WHERE warehouse_code = 12;