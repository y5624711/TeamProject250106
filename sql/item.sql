CREATE TABLE item
(
    item_id       INT PRIMARY KEY AUTO_INCREMENT,
    item_code     VARCHAR(5)  NOT NULL,
    item_name     VARCHAR(20) NOT NULL,
    common_code   VARCHAR(5)  NOT NULL,
    partner_id    INT         NOT NULL,
    manager_id    INT         NOT NULL,
    item_type     VARCHAR(20) NOT NULL,
    size          VARCHAR(20) NOT NULL,
    unit          VARCHAR(10) NOT NULL,
    in_price      INT         NOT NULL,
    out_price     INT         NOT NULL,
    tax           INT         NOT NULL,
    minimum_stock INT         NOT NULL,
    active        BOOLEAN     NOT NULL DEFAULT true,
    note          VARCHAR(50)
);
