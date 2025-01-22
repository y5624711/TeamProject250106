CREATE TABLE TB_INSTL_SUB
(
    install_sub_key INT PRIMARY KEY AUTO_INCREMENT,
    output_no       VARCHAR(20) NOT NULL,
    serial_no       VARCHAR(20) NOT NULL
);

ALTER TABLE TB_INSTL_SUB
    ADD serial_note VARCHAR(50) AFTER serial_no;