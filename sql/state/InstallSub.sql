CREATE TABLE TB_INSTL_SUB
(
    install_sub_key INT PRIMARY KEY AUTO_INCREMENT,
    output_no       VARCHAR(6) NOT NULL,
    serial_no       VARCHAR(6) NOT NULL,

    CONSTRAINT fk_serial_no FOREIGN KEY (serial_no)
        REFERENCES TB_ITEMSUB (serial_no) ON UPDATE CASCADE
);

ALTER TABLE TB_INSTL_SUB
    ADD serial_note VARCHAR(50) AFTER serial_no;

DROP TABLE TB_INSTL_SUB;