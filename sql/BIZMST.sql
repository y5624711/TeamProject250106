use teamPrj0106;

CREATE TABLE TB_BIZMST
(
    business_key         INT PRIMARY KEY AUTO_INCREMENT,
    business_common_code VARCHAR(5)  NOT NULL UNIQUE,
    business_code        VARCHAR(13) NOT NULL,
    business_name        VARCHAR(30) NOT NULL,
    business_rep         VARCHAR(5)  NOT NULL,
    business_no          VARCHAR(13) NOT NULL,
    business_tel         VARCHAR(15) NOT NULL,
    business_fax         VARCHAR(15) NULL,
    business_address     VARCHAR(50) NOT NULL,
    FOREIGN KEY (business_common_code) REFERENCES TB_SYSCOMM (common_code)
);

CREATE TABLE TB_DEPARTMST
(
    department_key         INT PRIMARY KEY AUTO_INCREMENT,
    department_common_code VARCHAR(5)  NOT NULL,
    department_code        VARCHAR(13) NOT NULL,
    department_name        VARCHAR(10) NOT NULL,
    department_tel         VARCHAR(15) NOT NULL,
    department_fax         VARCHAR(15) NULL,
    department_active      BOOLEAN     NOT NULL DEFAULT TRUE,
    department_note        VARCHAR(50) NULL,
    FOREIGN KEY (department_common_code) references TB_BIZMST (business_common_code)
);



INSERT INTO TB_BIZMST
(business_code, business_common_code, business_name, business_rep, business_no, business_tel, business_address)
    VALUE ('BIZ0000000000',
           'BIZ',
           '(주)중앙컴퍼니',
           '민재원',
           1011010100,
           '010-1111-2222',
           '서울시 마포구 신촌로176');

INSERT INTO TB_DEPARTMST
(department_common_code, department_code, department_name, department_active, department_tel)
VALUES ('BIZ', 'BIZ0000000001', '영업부', true, '010-0101-0202'),
       ('BIZ', 'BIZ0000000002', '자재부', true, '010-0303-0404');

delete
from TB_DEPARTMST
where department_key = 8;

DESCRIBE TB_INOUT_HIS;

DROP TABLE TB_BIZMST;
DROP TABLE TB_DEPARTMST;

SELECT biz.business_common_code, biz.business_name, dep.department_name, dep.department_code
FROM TB_BIZMST biz
         RIGHT JOIN TB_DEPARTMST dep
                    ON biz.business_common_code = dep.department_common_code;

select *
from TB_DEPARTMST
WHERE department_name = '재무부'
  AND department_active = true;

SELECT COUNT(*)
FROM TB_SYSCOMM
WHERE common_code = ''
   OR common_code_name = '';

SELECT c.business_name
FROM TB_EMPMST a
         JOIN TB_DEPARTMST b ON a.employee_workplace_code = b.department_code
         JOIN TB_BIZMST c ON b.department_common_code = c.business_common_code
WHERE employee_no = 'BIZEMP0000007';

SELECT b.customer_name
FROM TB_EMPMST a
         JOIN TB_CUSTMST b ON a.employee_workplace_code = b.customer_code
WHERE a.employee_no = 'CUSEMP0000029'

