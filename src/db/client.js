import pg from 'pg'
import pkg from 'pg';
import config from './config.js'
const { Pool } = pkg;
const pool = new Pool(config)

const connectDB = async () => {
  try {
    await pool.connect()
  } catch (error) {
    console.log('error connecting to db ' + error)
  }
  console.log('connected to db')
}

export {pool, connectDB}