CREATE TABLE TB_ITEMMST
(
    item_key         INT PRIMARY KEY AUTO_INCREMENT,
    item_common_code VARCHAR(5)  NOT NULL,
    customer_code    VARCHAR(13) NOT NULL,
    input_price      INT         NOT NULL,
    output_price     INT         NOT NULL,
    size             VARCHAR(20),
    unit             VARCHAR(10),
    item_active      BOOLEAN DEFAULT true,
    item_note        VARCHAR(50)
);

drop table TB_ITEMMST;