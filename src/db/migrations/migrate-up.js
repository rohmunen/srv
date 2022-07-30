import pg from 'pg'
import pkg from 'pg';
import config from '../config.js'
const { Pool } = pkg;
const pool = new Pool(config)

pool.query(`DROP TABLE usertag; DROP TABLE tags; DROP TABLE users;`)

pool.end()