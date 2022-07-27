import { pool } from "../client.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

export class Token {
  userId = ''
  refreshToken = ''
  constructor(userId, refreshToken) {
    this.userId = userId
    this.refreshToken = refreshToken
  }
  
  static async create(userId, refreshToken) {
    try {
      await pool.query(`INSERT INTO tokens (token, userId) VALUES ('${userId}', '${refreshToken}')`)
      return {userId, refreshToken}
    } catch (error) {
      console.log('error create', error)
    }
  }

  static async update(userId, refreshToken) {
    try {
      await pool.query(`UPDATE tokens SET token = '${refreshToken}' WHERE userId = '${userId}'`)
      return {userId, refreshToken}
    } catch (error) {
      
    }
  }

  static async findToken(userId) {
    try {
      const result = await pool.query(`SELECT * FROM tokens WHERE userId = '${userId}'`)
      return result.rows[0]
    } catch (error) {
      console.log('error while getting token', error)
    }
  }
 }