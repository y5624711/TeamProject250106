CREATE TABLE TB_INSTL_CONF
(
    install_configuration_key INT PRIMARY KEY AUTO_INCREMENT,
    output_no                 VARCHAR(13) NOT NULL,
    install_configuration     BOOLEAN
);