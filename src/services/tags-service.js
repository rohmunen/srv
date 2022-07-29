import { Tag } from "../db/models/tag.model.js"
import { User } from "../db/models/user.model.js"
import { TagDto } from "../dtos/tag-dto.js"

class TagsService {
  async create (tag) {
      const tagData = Tag.create(tag) 
      return tagData
  }
  
  async getTagById (id) {
    const tagData = await Tag.getOne(id)
    const userData = await User.getById(tagData.creator)
    const tagDto = new TagDto(userData, tagData)
    console.log(tagData)
    console.log(userData)
    if (!tagData) {
      throw ApiError.UnauthorizedError()
    }
    return tagDto
  }
}

export default new TagsService()