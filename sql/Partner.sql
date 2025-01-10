CREATE TABLE partner
(
    partner_id     INT         NOT NULL AUTO_INCREMENT,
    common_code    VARCHAR(5) DEFAULT 'P',
    product_code   VARCHAR(20),
    manager_id     INT         NOT NULL,
    partner_name   VARCHAR(20) NOT NULL,
    post           VARCHAR(10) NOT NULL,
    address        VARCHAR(50) NOT NULL,
    details        VARCHAR(50) NOT NULL,
    city1          VARCHAR(20) NOT NULL,
    city2          VARCHAR(20) NOT NULL,
    representative VARCHAR(10) NOT NULL,
    tel            VARCHAR(20) NOT NULL,
    fax            VARCHAR(20),
    start_date     DATE       DEFAULT NOW(),
    end_date       DATE,
    active         BOOLEAN    DEFAULT true,
    note           VARCHAR(50),
    PRIMARY KEY (partner_id, common_code)
);


DROP TABLE partner;


CREATE TABLE `창고`
(
    `창고 번호`    INT         NOT NULL,
    `상위 구분`    VARCHAR(5)  NOT NULL,
    `담당 업체 코드` INT         NOT NULL,
    `관리자 코드`   INT         NOT NULL,
    `창고명`      VARCHAR(20) NOT NULL,
    `우편번호`     VARCHAR(10) NOT NULL,
    `주소`       VARCHAR(50) NOT NULL,
    `상세주소`     VARCHAR(50) NOT NULL,
    `전화번호`     VARCHAR(20) NOT NULL,
    `사용여부`     BOOLEAN     NOT NULL DEFAULT true,
    `비고`       VARCHAR(50) NULL
);

CREATE TABLE `협력업체`
(
    `업체 번호`  INT         NOT NULL,
    `상위 구분`  VARCHAR(5)  NOT NULL,
    `품목 코드`  VARCHAR(20) NULL,
    `담당자 번호` INT         NOT NULL,
    `업체명`    VARCHAR(20) NOT NULL,
    `우편번호`   VARCHAR(10) NOT NULL,
    `주소`     VARCHAR(50) NOT NULL,
    `상세주소`   VARCHAR(50) NOT NULL,
    `광역시도`   VARCHAR(20) NOT NULL,
    `시 군`    VARCHAR(20) NOT NULL,
    `대표자`    VARCHAR(10) NOT NULL,
    `대표전화`   VARCHAR(20) NOT NULL,
    `팩스`     VARCHAR(20) NULL,
    `사용여부`   BOOLEAN     NOT NULL DEFAULT true,
    `비고`     VARCHAR(50) NULL
);
