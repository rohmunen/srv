import userService from '../services/user-service.js';

class UserController {
  async signin(req, res, next) {
    try {
      const { email, nickname, password } = req.body
      const userData = await userService.signin(email, nickname, password)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.login(email, password)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  } 

  async refresh(req, res, next) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const userData = userService.refresh(authorizationHeader)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }

  async getSelf(req, res, next) {
    try {
      const authorizationHeader = req.header('Authorization').split(' ')[1]
      const userData = userService.getUser(authorizationHeader)
      return res.json(userData)
    } catch (e) {
      next(e)
    }
  }
}

export default new UserController()