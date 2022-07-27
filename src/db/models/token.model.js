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
    } catch (error) {
      console.log('error create', error)
    }
  }
 }