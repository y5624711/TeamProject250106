CREATE TABLE TB_ITEMCOMM
(
    item_common_code_key    INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code        VARCHAR(5)  NOT NULL,
    item_common_name        VARCHAR(20) NOT NULL,
    item_common_code_active BOOLEAN DEFAULT true,
    item_common_code_note   VARCHAR(50) NULL
);

# 초기 품목 구분 데이터
INSERT INTO TB_ITEMCOMM (item_common_code, item_common_name)
VALUES ('POS', '포스기'),
       ('MIC', '전자레인지'),
       ('RAM', '라면제조기'),
       ('REF', '냉장고'),
       ('FRE', '냉동실'),
       ('WAR', '온장고'),
       ('SHE', '선반'),
       ('PAY', '결제 단말기'),
       ('PRI', '프린터기'),
       ('CTV', 'CCTV'),
       ('COF', '커피머신'),
       ('FRI', '튀김기');
