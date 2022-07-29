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
      console.log('error creating user', error)
    }
    return user
  }

  static async delete(user) {
    try {
      await pool.query(`DELETE FROM users WHERE id = ${user.id};`)
    } catch (error) {
      console.log('error deleting user', error)
    }
  }

  static async update(user) {
    try {
      await pool.query(`UPDATE users SET nickname = ${user.nickname} WHERE id = ${user.id};`)
    } catch (error) {
      console.log('error updating user', error)
    }
  }

  static async getByEmail(email) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE email = '${email}';`)
      console.log(userData.rows[0])
      return userData.rows[0]
    } catch (error) {
      console.log('error getting user by email ', error)
    }
  }
 }