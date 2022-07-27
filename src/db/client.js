import pg from 'pg'
import pkg from 'pg';
import config from './config.js'
const { Pool } = pkg;
const pool = new Pool(config)

const createDbIfNotExists = async () => {
  const dbName = process.env.DB_NAME

  const client = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  try {
    await client.connect()
  } catch (e) {
    console.log('error connecting to db ' + e)
  }

  const dbs = await client.query('SELECT datname FROM pg_database;')

  if (dbs.rows.findIndex(db => db.datname === dbName.toLowerCase()) === -1) {
    console.log('creating new db')
    await client.query(`CREATE DATABASE ${dbName}`)
  }

  await client.end()
}

const checkForTables = async () => {
  console.log('qweqweqwe')
  const client = new pg.Pool(config)
  try {
    const tables = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';`)
    console.log('rows', tables.rows)
    if (tables.rows.findIndex(table => table.table_name === 'users' || table.table_name === 'tags' || table.table_name === 'tokens') === -1) {
      console.log('creating new tables')
      await client.query(`
      CREATE TABLE users (
        id UUID PRIMARY KEY,
        email VARCHAR(100),
        password VARCHAR(100),
        nickname VARCHAR(30)
      );
      `)
      await client.query(`
      CREATE TABLE tags (
        id int,
        creator UUID,
        FOREIGN KEY (creator) REFERENCES users (id),
        name VARCHAR(40),
        sortOrder int default(0)
      );
      `)
      await client.query(`CREATE TABLE tokens (
        token varchar(512) PRIMARY KEY,
        userId UUID,
        FOREIGN KEY (userId) REFERENCES users (id)
      );`)
    }
  } catch (error) {
    console.log('error checking for tables ' + error)
  }
  client.end()
}

const connectDB = async () => {
  try {
    await pool.connect()
  } catch (error) {
    console.log('error connecting to db ' + error)
  }
  console.log('connected to db')
}

export {pool, checkForTables, createDbIfNotExists, connectDB}