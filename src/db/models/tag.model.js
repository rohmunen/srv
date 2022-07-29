import { pool } from "../client.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';

export class Tag {
  id = ''
  creator = ''
  name = ''
  sortOrder = ''
  constructor(id, creator, name, sortOrder) {
    this.id = id
    this.creator = creator
    this.name = name
    this.sortOrder = sortOrder
  }

  static async create(tag) {
    try {
      await pool.query(`
      INSERT INTO tags 
      (creator, name, sortOrder) 
      VALUES ('${tag.creator}', '${tag.name}', '${tag.sortOrder || 0}');`)
      await pool.query(`INSERT INTO usertag(tagId, userId) SELECT currval('tags_id_seq'), '${tag.creator}';`);
    } catch (error) {
      console.log('error creating user', error)
    }
    return tag
  }
 }