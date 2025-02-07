use teamPrj0106;

CREATE TABLE TB_SYSCOMM
(
    common_code_key    INT PRIMARY KEY AUTO_INCREMENT,
    common_code        VARCHAR(5)  NOT NULL UNIQUE,
    common_code_type   VARCHAR(10) NOT NULL,
    common_code_name   VARCHAR(20) NOT NULL,
    common_code_active BOOLEAN     NOT NULL DEFAULT TRUE,
    common_code_note   VARCHAR(50)
);

DROP TABLE TB_SYSCOMM;

INSERT INTO TB_SYSCOMM
    (common_code_type, common_code, common_code_name)
VALUES ('SYSTEM', 'BIZ', '사업장'),
       ('SYSTEM', 'CUS', '협력사'),
       ('SYSTEM', 'FRN', '가맹점'),
       ('SYSTEM', 'EMP', '인사'),
       ('SYSTEM', 'PURCH', '구매'),
       ('SYSTEM', 'INSTK', '입고'),
       ('SYSTEM', 'INSTL', '설치'),
       ('SYSTEM', 'RETRN', '회수'),
       ('ITEM', 'POS', '포스기'),
       ('ITEM', 'MIC', '전자레인지'),
       ('ITEM', 'RAM', '라염제조기'),
       ('ITEM', 'REF', '냉장고'),
       ('ITEM', 'FRE', '냉동실'),
       ('ITEM', 'WAR', '온장고');

delete
from TB_SYSCOMM
where common_code_key = 14;

DROP TABLE TB_SYSCOMM;
