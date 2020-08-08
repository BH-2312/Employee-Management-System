DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE employee (
  id int AUTO_INCREMENT NOT NULL,
  first_name varchar(30) ,
  last_name varchar(30) ,
  role_id integer ,
  manager_id integer,
  PRIMARY KEY(id)
);

CREATE TABLE role (
  id int AUTO_INCREMENT NOT NULL,
  title varchar(30) ,
  salary decimal ,
  department_id integer ,
  PRIMARY KEY(id)
);

CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  department_name varchar(30) ,
  PRIMARY KEY(id)
);

ALTER TABLE employee
ADD FOREIGN KEY (role_id) REFERENCES role(id);

ALTER TABLE employee
ADD	FOREIGN KEY (manager_id) REFERENCES employee(id);

ALTER TABLE role
ADD	FOREIGN KEY (department_id) REFERENCES department(id);

select * from role;

select * from employee;



