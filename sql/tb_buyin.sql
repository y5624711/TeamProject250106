CREATE  TABLE TB_BUYIN (
    input_key int primary key  auto_increment,
    input_common_code VARCHAR(5) NOT NULL ,
    business_employee_no VARCHAR(13) NOT NULL ,
    input_no VARCHAR(13) NOT NULL ,
    input_consent BOOLEAN DEFAULT FALSE,
    input_note VARCHAR(50)
);