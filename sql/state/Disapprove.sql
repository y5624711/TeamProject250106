CREATE TABLE TB_DISPR
(
    disapprove_key         INT PRIMARY KEY AUTO_INCREMENT,
    state_request_key      INT        NOT NULL,
    state_common_code      VARCHAR(5) NOT NULL,
    disapprove_employee_no VARCHAR(9) NOT NULL,
    disapprove_date        DATETIME DEFAULT CURRENT_TIMESTAMP,
    disapprove_note        VARCHAR(50),
    FOREIGN KEY (state_common_code) REFERENCES TB_SYSCOMM (common_code)
        ON DELETE CASCADE
        ON UPDATE CASCADE
);