import tagsService from '../services/tags-service.js';
import tokenService from '../services/token-service.js';
import userService from '../services/user-service.js';

class TagsController {
  async create(req, res, next) {
    try {
      const { name, sortOrder } = req.body
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const { id } = tokenService.validateAccessToken(authorizationHeader)
      const result = await tagsService.create({creator: id, name, sortOrder})
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async getTagById(req, res, next) {
    const id = req.params.id
    try {
      const tagData = await tagsService.getTagById(id)
      return res.json(tagData)
    } catch (e) {
      
    }
  }

}

export default new TagsController()