DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;

USE employee_db;

-- Created the table "schools"
CREATE TABLE employee (
  id int AUTO_INCREMENT NOT NULL,
  first_name varchar(30) ,
  last_name varchar(30) ,
  role_id integer ,
  manager_id integer,
  PRIMARY KEY(id),
  FOREIGN KEY (role_id) REFERENCES role(id),
	FOREIGN KEY (manager_id) REFERENCES employee(id)
);
CREATE TABLE role (
  id int AUTO_INCREMENT NOT NULL,
  title varchar(30) ,
  salary decimal ,
  department_id integer ,
  PRIMARY KEY(id),
  FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE department (
  id int AUTO_INCREMENT NOT NULL,
  name varchar(30) ,
  PRIMARY KEY(id)
);