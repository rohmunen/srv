import pg from 'pg'
import pkg from 'pg';
import config from '../config.js'

const createDbIfNotExists = async () => {
  const dbName = process.env.DB_NAME

  const client = new pg.Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD
  })

  const dbs = await client.query('SELECT datname FROM pg_database;')

  if (dbs.rows.findIndex(db => db.datname === dbName.toLowerCase()) === -1) {
    console.log('creating new db')
    await client.query(`CREATE DATABASE ${dbName}`)
  }
  client.end()
}

const checkForTables = async () => {
  const client = new pg.Pool(config)
  try {
    const tables = await client.query(`
    SELECT table_name
    FROM information_schema.tables
    WHERE table_schema='public'
    AND table_type='BASE TABLE';`)
    if (tables.rows.findIndex(table => table.table_name === 'users' || table.table_name === 'tags' || table.table_name === 'usertag') === -1) {
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
        id SERIAL PRIMARY KEY,
        creator UUID,
        FOREIGN KEY (creator) REFERENCES users (id),
        name VARCHAR(40),
        sortOrder int default(0)
      );
      `)
      await client.query(`CREATE TABLE usertag (
        userId UUID,
        FOREIGN KEY (userId) REFERENCES users (id),
        tagId int,
        FOREIGN KEY (tagId) REFERENCES tags (id),
        PRIMARY KEY (userId, tagId)
      );`)
    }
  } catch (error) {
    console.log('error checking for tables ' + error)
  }
  client.end()
}

const migrateUp = async () => {
  await createDbIfNotExists()
  await checkForTables()
}

migrateUp()