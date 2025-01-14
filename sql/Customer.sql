CREATE TABLE TB_CUSTMST
(
    customer_key             INT PRIMARY KEY AUTO_INCREMENT,
    item_code                VARCHAR(5),
    customer_code            VARCHAR(13) NOT NULL,
    customer_name            VARCHAR(30) NOT NULL,
    customer_rep             VARCHAR(5)  NOT NULL,
    customer_no              VARCHAR(13) NOT NULL,
    customer_tel             VARCHAR(15) NOT NULL,
    customer_fax             VARCHAR(15),
    customer_address         VARCHAR(50) NOT NULL,
    customer_address_details VARCHAR(50),
    customer_post            VARCHAR(10) NOT NULL,
    customer_active          BOOLEAN DEFAULT true,
    customer_note            VARCHAR(50)
);


# DROP TABLE partner;

