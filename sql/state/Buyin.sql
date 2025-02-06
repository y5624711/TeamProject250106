CREATE TABLE TB_BUYIN (
                          input_key INT PRIMARY KEY AUTO_INCREMENT,
                          input_common_code VARCHAR(5) NOT NULL REFERENCES TB_SYSCOMM(common_code) ON UPDATE CASCADE,
                          business_employee_no VARCHAR(13) NOT NULL REFERENCES TB_EMPMST(employee_no),
                          input_no VARCHAR(13),
                          input_consent BOOLEAN DEFAULT FALSE,
                          input_note VARCHAR(50)
);


ALTER TABLE TB_BUYIN
    MODIFY COLUMN input_consent  BOOLEAN DEFAULT NULL;