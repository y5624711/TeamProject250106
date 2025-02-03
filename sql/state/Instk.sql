create table TB_INSTK(
     input_stock_key int primary key  auto_increment,
     serial_no VARCHAR(20) NOT NULL ,
    customer_employee_no VARCHAR(13) NOT NULL ,
    input_key int ,
    location_key int,
    input_stock_date DATE default NOW(),
    input_stock_note VARCHAR(50)
);

