DROP TABLE IF EXISTS grades;
DROP TABLE IF EXISTS students;

CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    first_name varchar(255),
    last_name varchar(255),
    company varchar(255),
    skill varchar(255),
    pic text,
    city varchar(255),
    email varchar(255)
);

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id integer REFERENCES students(id) ON DELETE CASCADE,
    score integer DEFAULT 0
);

CREATE INDEX grades_student_id ON grades(student_id);