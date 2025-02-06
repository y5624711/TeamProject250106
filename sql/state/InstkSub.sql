
CREATE TABLE TB_INSTK_SUB (
                              input_stock_sub_key INT PRIMARY KEY AUTO_INCREMENT,
                              input_key INT,
                              serial_no VARCHAR(6) NOT NULL,
                              location_key INT,
                              FOREIGN KEY (input_key) REFERENCES TB_BUYIN(input_key) ON UPDATE CASCADE,
                              FOREIGN KEY (location_key) REFERENCES TB_LOCMST(location_key) ON UPDATE CASCADE
);

DESC TB_INSTK_SUB;


desc TB_LOCMST;



desc V_ITEM_CRNT;

ode_name`