


create table TB_INSTK(
                         input_stock_key int primary key  auto_increment,
                         input_key int REFERENCES TB_BUYIN(input_key),
                         customer_employee_no VARCHAR(13) NOT NULL REFERENCES TB_EMPMST(employee_no) ,
                         input_stock_date DATE default NOW(),
                         input_stock_note VARCHAR(50)
);

desc TB_INSTK;
DESC TB_INSTK_SUB;


select *
from TB_EMPMST
WHERE employee_no='BIZEMP0000001';


  select *
from TB_BUYIN;

                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         AND E.employee_workplace_code = C.customer_code WHERE 1=1 AND employee_active = true ORDER BY employee_workplace_code desc LIMIT ?, 10;