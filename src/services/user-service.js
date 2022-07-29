import {User} from "../db/models/user.model.js"
import { UserDto } from '../dtos/user-dto.js'
import { ApiError } from "../utils/api-errors.js"
import tokenService from "./token-service.js"
import bcrypt from "bcrypt"

class UserService {
  async signin(email, nickname, password) {
    // добавить проверку на то что пользователь уже существует && ошибки
    const user = await User.create({email: email, nickname: nickname, password: password}) 
    const userDto = new UserDto(user)
    const token = tokenService.generateToken({...userDto})

    return { token, expire: '1800' }
  }

  async login(email, password) {
    const user = await User.getByEmail(email)
    const hashEqual = await bcrypt.compare(password, user.password)
    if (!hashEqual) {
      //ошибка
    }
    const userDto = new UserDto(user)
    const token = tokenService.generateToken({...userDto})
    return { token, expire: '1800' }
  }

  refresh(authorizationHeader) {
    const userData = tokenService.validateAccessToken(authorizationHeader)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }
    const userDto = new UserDto(userData)
    const token = tokenService.generateToken({...userDto})
    return {token, expire: '1800'}
  }

  getUser(authorizationHeader) {
    const userData = tokenService.validateAccessToken(authorizationHeader)
    if (!userData) {
      throw ApiError.UnauthorizedError()
    }
    const user = User.getByEmail(userData.email)
    return user
  }
}

export default new UserService()