import mysql from 'mysql';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'zeyr',
  password: '',
  database: 'zeyr-custom',
});

export default pool;
