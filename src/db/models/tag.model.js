import { pool } from "../client.js"

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
      const newTag = await pool.query(`
      INSERT INTO tags 
      (creator, name, sortOrder) 
      VALUES ('${tag.creator}', '${tag.name}', '${tag.sortOrder || 0}') RETURNING creator, name, sortOrder;`)
      await pool.query(`INSERT INTO usertag(tagId, userId) SELECT currval('tags_id_seq'), '${tag.creator}';`);
      return newTag.rows[0]
    } catch (error) {
      console.log('error creating user', error)
    }
  }

  static async getOne(id) {
    try {
      const tag = await pool.query(`SELECT * FROM tags WHERE id = ${id}`)
      return tag.rows[0]
    } catch (error) {
      console.log('error getting tag', error)
    }
  }
 }