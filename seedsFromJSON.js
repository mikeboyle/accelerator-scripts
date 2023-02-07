/*
This script generates two seed files based on JSON data:
- seed_students.sql (insert student data into students table)
- seed_grades.sql (insert grades data into grades table)

To run the script: `node seedsFromJSON.js`

When preparing the data, you should do these operations in order:
1. Run schema.sql to create (or recreate) the students and grades tables.
2. Run seed_students.sql to seed student data
3. After 2) has completed, separately run seed_grades.sql to seed grades data.
*/
const fs = require('fs');
const { grades } = require('./gradesDataV2.json');
const { students } = require('./studentsDataV2.json');

const STUDENTS_PROPERTY_NAMES_TO_COLUMN_NAMES = {
  city: 'city',
  company: 'company',
  email: 'email',
  firstName: 'first_name',
  lastName: 'last_name',
  pic: 'pic',
  skill: 'skill',
};

const GRADES_PROPERTY_NAMES_TO_COLUMN_NAMES = {
  studentId: 'student_id',
  score: 'score',
};

const STUDENTS_FIELDS = [
  'city',
  'company',
  'email',
  'firstName',
  'lastName',
  'pic',
  'skill',
];
const GRADES_FIELDS = ['studentId', 'score'];

const STUDENTS_COLUMNS = STUDENTS_FIELDS.map(
  (field) => STUDENTS_PROPERTY_NAMES_TO_COLUMN_NAMES[field]
);

const GRADES_COLUMNS = GRADES_FIELDS.map(
  (field) => GRADES_PROPERTY_NAMES_TO_COLUMN_NAMES[field]
);

const studentToValues = (student) => {
  const values = STUDENTS_FIELDS.map((field) => `'${student[field]}'`);
  return `(${values.join(', ')})`;
};

const gradeToValues = (grade) => {
  const values = [Number(grade.studentId), `'${grade.score}'`];
  return `(${values.join(', ')})`;
};

const studentsToValuesList = (students) => {
  const values = students.map((student) => studentToValues(student));
  return values.join(', \n\t');
};

const gradesToValuesList = (grades) => {
  const values = grades.map((grade) => gradeToValues(grade));
  return values.join(', \n\t');
};

const seedStudentsQuery = (students) => {
  return `INSERT INTO students (${STUDENTS_COLUMNS.join(', ')})
    VALUES
    ${studentsToValuesList(students)};`;
};

const seedGradesQuery = (grades) => {
  return `INSERT INTO grades (${GRADES_COLUMNS.join(', ')})
    VALUES
    ${gradesToValuesList(grades)};`;
};

const seedStudents = seedStudentsQuery(students);
const seedGrades = seedGradesQuery(grades);

fs.writeFileSync('./seed_students.sql', seedStudents);
fs.writeFileSync('./seed_grades.sql', seedGrades);
