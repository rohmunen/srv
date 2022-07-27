import { pool } from "../client.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

export class User {
  id = ''
  email = ''
  nickname = ''
  password = ''
  constructor(id, email, nickname, password) {
    this.id = id
    this.email = email
    this.nickname = nickname
    this.password = password
  }

  static async beforeCreate(user) {
    const id = uuidv4();
    const hashPassword = await bcrypt.hash(user.password, 3)
    user.password = hashPassword
    user.id = id
    return user
  }

  static async create(user) {
    user = await this.beforeCreate(user)
    try {
      await pool.query(`INSERT INTO users 
      (id, email, nickname, password) 
      VALUES ('${user.id}', '${user.email}', '${user.nickname}', '${user.password}')`)
    } catch (error) {
      console.log('error create', error)
    }
  }

  static async delete(user) {
    try {
      await pool.query(`DELETE FROM users WHERE id = ${user.id};`)
    } catch (error) {
      console.log('error create', error)
    }
  }

  static async update(user) {
    try {
      await pool.query(`UPDATE users SET nickname = ${user.nickname} WHERE id = ${user.id};`)
    } catch (error) {
      console.log('error create', error)
    }
  }

  static async getById(user) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE id = '${user.id}';`)
      console.log(userData.rows[0])
      return userData.rows[0]
    } catch (error) {
      console.log('error create', error)
    }
  }
 }