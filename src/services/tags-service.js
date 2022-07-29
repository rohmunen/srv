import { Tag } from "../db/models/tag.model.js"
import { User } from "../db/models/user.model.js"
import { TagDto } from "../dtos/tag-dto.js"
import { ApiError } from '../utils/api-errors.js'

class TagsService {
  async create (tag) {
      const tagData = Tag.create(tag) 
      return tagData
  }
  
  async getTagById (id) {
    const data = await Tag.getOne(id)
    const tagDto = new TagDto(data)
    if (!data) {
      throw ApiError.BadRequest()
    }
    return tagDto
  }

  async getTags(sortByOrder, sortByName, page, pageSize = 5) {
    let tags = await Tag.get()
    if (page && pageSize) {
      const startIndex = (page - 1) & pageSize
      const endIndex = page * pageSize
      tags = tags.slice(startIndex, endIndex)
    }
    if (sortByOrder !== undefined) {
      tags = tags.sort((a,b) => b.sortOrder - a.sortOrder)
    }
    if (sortByName !== undefined) {
      tags = tags.sort((a,b) => {
        if (a.name > b.name) {
          return 1
        }
        if (a.name < b.name) {
          return -1
        }
        if (a.name == b.name) {
          return 0
        }
      })
    }
    return tags
  }
}

export default new TagsService()