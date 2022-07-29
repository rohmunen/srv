import usertagService from "../services/usertag-service.js"

class UsertagController {
  async add (req, res, next) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const {tags} = req.body
      const result = usertagService.add(authorizationHeader, tags)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async get (req, res, next) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const result = await usertagService.get(authorizationHeader)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }

  async delete (req, res, next) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const result = await usertagService.delete(req.params.id, authorizationHeader)
      res.json(result)
    } catch (e) {
      next(e)
    }
  }
}

export default new UsertagController()