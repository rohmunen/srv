import { pool } from "../client.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import { Validator } from "../../utils/validator.js";

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
    Validator.ValidatePassword(user.password)
    await Validator.ValidateEmail(user.email)
    await Validator.ValidateUserName(user.nickname)
    const hashPassword = await bcrypt.hash(user.password, 3)
    user.password = hashPassword
    user.id = id
    return user
  }

  static async create(user) {
    user = await this.beforeCreate(user)
    console.log(user)
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

  static async update(id, user) {
    if(user.password) {
      user = await this.beforeCreate(user)
    }
    try {
      if (user.email) {
        await pool.query(`UPDATE users SET email = '${user.email}' WHERE id = '${id}';`)
      }
      if (user.nickname) {
        await pool.query(`UPDATE users SET nickname = '${user.nickname}' WHERE id = '${id}';`)
      }
      if (user.password) {
        await pool.query(`UPDATE users SET password = '${user.password}' WHERE id = '${id}';`)
      }
      return {email: user.email, nickname: user.nickname}
    } catch (error) {
      console.log('error updating user', error)
    }
  }

  static async getByEmail(email) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE email = '${email}';`)
      return userData.rows[0]
    } catch (error) {
      console.log('error getting user by email ', error)
    }
  }

  static async getByName(name) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE nickname = '${name}';`)
      console.log(userData)
      console.log(userData.rows[0])
      return userData.rows[0]
    } catch (error) {
      console.log('error getting user by id ', error)
    }
  }

  static async getById(id) {
    try {
      const userData = await pool.query(`SELECT * FROM users WHERE id = '${id}';`)
      return userData.rows[0]
    } catch (error) {
      console.log('error getting user by id ', error)
    }
  }
 }