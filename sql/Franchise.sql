CREATE TABLE TB_FRNCHSMST
(
    franchise_key            INT AUTO_INCREMENT PRIMARY KEY,
    business_employee_no     VARCHAR(13) NOT NULL,
    business_employee_name   VARCHAR(5)  NOT NULL,
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

-- 임의로 데이터를 삽입하는 예시
INSERT INTO TB_FRNCHSMST (business_employee_no,
                          business_employee_name,
                          franchise_code,
                          franchise_name,
                          franchise_rep,
                          franchise_no,
                          franchise_tel,
                          franchise_address,
                          franchise_address_detail,
                          franchise_post,
                          franchise_state,
                          franchise_city,
                          franchise_active,
                          franchise_note)
VALUES ('1234567890123', '홍길동', 'FC12345678901', '너굴마트', '김대표', '0123456789012', '01012345678', '서울시 강남구 테헤란로', '101호',
        '06234', '서울특별시', '강남구', TRUE, '프랜차이즈 설명'),
       ('2234567890123', '이몽룡', 'FC22345678901', '다람쥐마트', '박대표', '0223456789012', '01022345678', '서울시 서초구 서초대로', '202호',
        '06235', '서울특별시', '서초구', TRUE, NULL),
       ('3234567890123', '성춘향', 'FC32345678901', '햄스터마트', '최대표', '0323456789012', '01032345678', '부산시 해운대구 센텀로', NULL,
        '48060', '부산광역시', '해운대구', TRUE, '임시 데이터');
