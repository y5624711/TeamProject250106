CREATE TABLE TB_ITEMMST
(
    item_key         INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code VARCHAR(5) NOT NULL,
    customer_code    VARCHAR(6) NOT NULL,
    input_price      INT        NOT NULL,
    output_price     INT        NOT NULL,
    size             VARCHAR(20),
    unit             VARCHAR(10),
    item_active      BOOLEAN DEFAULT true,
    item_note        VARCHAR(50),
    -- 외래 키 설정
    CONSTRAINT fk_item_common FOREIGN KEY (item_common_code)
        REFERENCES TB_SYSCOMM (common_code) ON UPDATE CASCADE,

    CONSTRAINT fk_customer FOREIGN KEY (customer_code)
        REFERENCES TB_CUSTMST (customer_code) ON UPDATE CASCADE
);

-- 기존 외래 키 제약조건 삭제
ALTER TABLE TB_ITEMMST
    DROP FOREIGN KEY fk_customer;

-- 외래 키 제약조건 재설정 (ON UPDATE CASCADE 추가)
ALTER TABLE TB_ITEMMST
    ADD CONSTRAINT fk_customer FOREIGN KEY (customer_code)
        REFERENCES TB_CUSTMST (customer_code) ON UPDATE CASCADE;


drop table TB_ITEMMST;

INSERT INTO TB_ITEMMST (item_common_code, customer_code, input_price, output_price, size, unit, item_note)
VALUES ('POS', 'CUS001', 500000, 700000, '300x200x150', 'mm', '최신형 포스기'),
       ('MIC', 'CUS002', 200000, 350000, '500x300x250', 'mm', '전자레인지 1000W'),
       ('RAM', 'CUS003', 1500000, 2000000, '700x500x300', 'mm', '자동 라면 제조기'),
       ('REF', 'CUS004', 1200000, 1800000, '1800x800x700', 'mm', '대형 냉장고'),
       ('FRE', 'CUS005', 1400000, 2000000, '2000x900x800', 'mm', '업소용 냉동실'),
       ('WAR', 'CUS006', 800000, 1100000, '1200x600x500', 'mm', '온장고 (따뜻한 보관)');

