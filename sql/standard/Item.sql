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