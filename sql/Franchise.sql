CREATE TABLE TB_FRNCHSMST
(
    franchise_key            INT AUTO_INCREMENT PRIMARY KEY,
    franchise_code           VARCHAR(13) NOT NULL,
    franchise_name           VARCHAR(30) NOT NULL,
    franchise_rep            VARCHAR(5)  NOT NULL,
    franchise_no             VARCHAR(13) NOT NULL,
    franchise_tel            VARCHAR(15) NOT NULL,
    franchise_address        VARCHAR(50) NOT NULL,
    franchise_address_detail VARCHAR(20) NULL,
    franchise_post           VARCHAR(10) NOT NULL,
    franchise_state          VARCHAR(10) NOT NULL,
    franchise_city           VARCHAR(10) NOT NULL,
    franchise_active         BOOLEAN     NULL DEFAULT TRUE,
    franchise_note           VARCHAR(50) NULL
);

DROP TABLE TB_FRNCHSMST;

SELECT *
FROM TB_FRNCHSMST;

ALTER TABLE TB_FRNCHSMST
    DROP COLUMN business_employee_no,
    DROP COLUMN business_employee_name;