require('dotenv').config();
const execCommand = require('./execCommand');
const pathToFileInDir = require('./pathToFileInDir');

const getPathFunc = pathToFileInDir('.');

const { DB_URL } = process.env;

execCommand('psql', ['-d', DB_URL, '-f', getPathFunc('schema.sql')])
  .then(() =>
    execCommand('psql', ['-d', DB_URL, '-f', getPathFunc('seed_students.sql')])
  )
  .then(() =>
    execCommand('psql', ['-d', DB_URL, '-f', getPathFunc('seed_grades.sql')])
  )
  .catch((code) => console.error('Exited with error code', code));
