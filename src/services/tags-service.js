import { Tag } from "../db/models/tag.model.js"

class TagsService {
  async create (tag) {
      const tagData = Tag.create(tag) 
      return tagData
  }
}

export default new TagsService()