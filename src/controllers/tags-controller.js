import tagsService from '../services/tags-service.js';
import tokenService from '../services/token-service.js';


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
      next(e)
    }
  }

  async getTags(req, res, next) {
    const { page, pageSize, sortByOrder, sortByName } = req.query
    try {
      const tags = await tagsService.getTags(sortByOrder, sortByName, page, pageSize)
      return res.json(tags)
    } catch (e) {
      next(e)
    }
  }

  async delete(req, res, next) {
    const authorizationHeader = req.header('Authorization').split(' ')[1]
    const tagId = req.params.id
    const { userId } = tokenService.validateAccessToken(authorizationHeader)
    try {
      const result = await tagsService.delete(tagId, userId)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async update(req, res, next) {
    const authorizationHeader = req.header('Authorization').split(' ')[1]
    const tagId = req.params.id
    const { userId } = tokenService.validateAccessToken(authorizationHeader)
    const tag = req.body
    try {
      const result = await tagsService.update(tagId, userId, tag)
      return res.json(result)
    } catch (e) {
      next(e)
    }
  }
}

export default new TagsController()