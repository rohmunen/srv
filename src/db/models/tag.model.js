import { TagDto } from "../../dtos/tag-dto.js"
import { pool } from "../client.js"
import { Validator } from "../../utils/validator.js";


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

  static async beforeCreate(tag) {
    Validator.ValidateTagName(tag.name)
  }

  static async create(tag) {
    await this.beforeCreate(tag)
    try {
      const newTag = await pool.query(`
      INSERT INTO tags 
      (creator, name, sortOrder) 
      VALUES ('${tag.creator}', '${tag.name}', '${tag.sortOrder || 0}') RETURNING creator, name, sortOrder;`)
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

  static async getByName(name) {
    try {
      const data = await pool.query(`SELECT * FROM tags WHERE name = '${name}'`)
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

  static async update(id, {name, sortOrder}) {
    await this.beforeCreate({name})
    try {
      if (name) {
        await pool.query(`UPDATE tags SET name = '${name}' WHERE id = ${id};`)
      }
      if (sortOrder) {
        await pool.query(`UPDATE tags SET sortOrder = '${sortOrder}' WHERE id = ${id};`)
      }
      return {id:id}
    } catch (error) {
      console.log('error updating tag', error)
    }
  }

  static async delete(id) {
    try {
      await pool.query(`DELETE FROM usertag WHERE tagId = ${id} RETURNING tagId;`)
      const result = await pool.query(`DELETE FROM tags WHERE id = ${id} RETURNING id;`)
      return result.rows[0]
    } catch (error) {
      console.log('error deleting tag', error)
    }
  }
 }