USE teamPrj0106;

CREATE TABLE TB_ITEMSUB
(
    item_sub_key     INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code VARCHAR(5)  NOT NULL,
    serial_no        VARCHAR(20) NOT NULL UNIQUE,
    item_sub_active  BOOLEAN DEFAULT TRUE,
    item_sub_note    VARCHAR(50)
);

INSERT INTO TB_ITEMSUB
    (item_common_code, serial_no)
VALUES ('REF', '00000000000000000004');
