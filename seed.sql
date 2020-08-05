USE employee_db;

-- Inserted a set of records into the table
INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Jerry", 70, "wiseguy");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("George", 20, "bad egg");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Elaine", 50, "hostile");

INSERT INTO actors (name, coolness_points, attitude)
VALUES ("Kramer", 100, "larrikin");

select * from actors;