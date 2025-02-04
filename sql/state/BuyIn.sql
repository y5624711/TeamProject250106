CREATE TABLE TB_BUYIN
(
    input_key            int primary key auto_increment,
    input_common_code    VARCHAR(5) NOT NULL,
    business_employee_no VARCHAR(9) NOT NULL,
    input_no             VARCHAR(6) NOT NULL,
    input_consent        BOOLEAN,
    input_note           VARCHAR(50)
);

DESC TB_BUYIN;