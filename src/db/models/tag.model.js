import { TagDto } from "../../dtos/tag-dto.js"
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
      const data = await pool.query(`SELECT * FROM tags LEFT JOIN users ON creator = users.id WHERE tags.id = ${id};`)
      return data.rows[0]
    } catch (error) {
      console.log('error getting tag', error)
    }
  }

  static async get() {
    try {
      let tags = []
      const data = await pool.query(`SELECT * FROM tags LEFT JOIN users ON creator = users.id;`)
      data.rows.map((el) => {
        tags.push(new TagDto(el))
      })
      return tags
    } catch (error) {
      console.log('error getting tags', error)
    }
  }
 }