CREATE TABLE itemCommonCode
(
    item_code      VARCHAR(10) PRIMARY KEY,
    common_code    VARCHAR(5) DEFAULT 'I',
    item_code_name VARCHAR(20) NOT NULL,
    active         BOOLEAN    DEFAULT true,
    note           VARCHAR(50)
);

# 초기 품목 구분 데이터
INSERT INTO itemCommonCode (item_code, item_code_name)
VALUES ('pos', '포스기'),
       ('mic', '전자레인지'),
       ('ram', '라면제조기'),
       ('ref', '냉장고'),
       ('fre', '냉동실'),
       ('war', '온장고'),
       ('she', '선반'),
       ('pay', '결제 단말기'),
       ('pri', '프린터기'),
       ('ctv', 'CCTV'),
       ('cof', '커피머신'),
       ('fri', '튀김기');
