import { pool } from "../client.js"
import { UsertagDto } from "../../dtos/usertag-dto.js"

export class Usertag {
  userId = ''
  tagId = ''
  constructor(userId, tagId) {
    this.userId = userId,
    this.tagId = tagId
  }

  static async add(id, tags) {
    try {
      let tagString = tags.reduce((prevEl, el) => {
        return prevEl + `('${id}', '${el}'),`
      }, '')
      tagString = tagString.substring(0, tagString.length - 1)
      const result = await pool.query(`INSERT INTO usertag(userId, tagId) VALUES${tagString} RETURNING *;`)
      return result.rows
    } catch (error) {
      console.log('error adding tags to user', error)
    }
  }
  
  static async get(id) {
    try {
      const result = await pool.query(`SELECT * FROM tags WHERE creator = '${id}'`)
      return result.rows
    } catch (error) {
      console.log('error getting user\'s tags', error)
    }
  }

  static async delete(id, userId) {
    try {
      let tags = []
      await pool.query(`DELETE FROM usertag WHERE tagId = '${id}' RETURNING tagId;`)
      const result = await pool.query(`SELECT * FROM usertag LEFT JOIN tags on tagId = tags.id WHERE userId = '${userId}'`)
      result.rows.map((el) => {
        tags.push(new UsertagDto(el))
      })
      return tags
    } catch (error) {
      console.log('error deleting tag', error)
    }
  }
 }