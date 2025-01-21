USE teamPrj0106;

CREATE TABLE TB_LOCMST
(
    location_key     INT         NULL AUTO_INCREMENT PRIMARY KEY,
    warehouse_code   VARCHAR(13) NOT NULL,
    row              VARCHAR(2)  NOT NULL,
    col              VARCHAR(2)  NOT NULL,
    shelf            INT         NOT NULL,
    item_common_code VARCHAR(5)  NOT NULL,
    location_note    VARCHAR(50) NULL
);

