USE teamPrj0106;

CREATE TABLE department
(
    department_id INT PRIMARY KEY NOT NULL,
    common_code   VARCHAR(5)      NOT NULL,
    name          VARCHAR(10)     NOT NULL
);

INSERT INTO department (department_id, common_code, name)
VALUES (2, 'B', 'ddeee');
