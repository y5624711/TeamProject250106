use teamPrj0106;


CREATE TABLE TB_EMPMST (
                         employee_key INT AUTO_INCREMENT PRIMARY KEY,
                         employee_common_code VARCHAR(5) NOT NULL,
                        employee_workplace_code VARCHAR(13) NOT NULL ,
                         employee_no VARCHAR(13) NOT NULL,
                        employee_password VARCHAR(20) default 1234,
                        employee_name VARCHAR(5) NOT NULL ,
                        employee_tel VARCHAR(15) NOT NULL ,
                        employee_active BOOLEAN default true,
                        employee_note VARCHAR(50)
);

desc TB_EMPMST;
drop  table  employee;

select * from TB_EMPMST;

INSERT INTO TB_EMPMST (employee_workplace_code, employee_password, employee_name, employee_no, employee_active,employee_common_code,employee_tel)
SELECT employee_workplace_code, employee_password, employee_name, employee_no, employee_active ,employee_common_code,employee_tel
FROM TB_EMPMST;
DROP TABLE TB_EMPMST;


desc TB_CUSTMST;

select * from TB_EMPMST
WHERE employee_no LIKE CONCAT('%', 'EMP', '%');

SELECT * FROM TB_EMPMST WHERE 1=1 AND employee_active = true AND employee_no LIKE CONCAT('%', 'EMP', '%') ORDER BY employee_name ASC LIMIT 0, 10;
select employee_no from TB_EMPMST
order by employee_no desc;
# LIMIT  1;

select *
from TB_EMPMST;
where employee_no LIKE 'PAR%';

SELECT MAX(CAST(SUBSTRING(employee_no, 4) AS UNSIGNED)) AS maxNumber
FROM TB_EMPMST
WHERE  employee_no LIKE 'PAR%' AND employee_no REGEXP '^[A-Za-z]+[0-9]+$';


select customer_code,customer_name
from TB_CUSTMST;
