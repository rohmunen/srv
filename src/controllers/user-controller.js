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
    } catch (error) {
      next(e)
    }
  } 
}

export default new UserController()