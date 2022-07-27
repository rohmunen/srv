import {User} from "../db/models/user.model.js"
import { UserDto } from '../dtos/user-dto.js'
import tokenService from "./token-service.js";

class UserService {
  async signin(email, nickname, password) {
    // добавить проверку на то что пользователь уже существует && ошибки
    const user = await User.create({email: email, nickname: nickname, password: password}) 
    const userDto = new UserDto(user)
    const tokens = tokenService.generateTokens({...userDto})
    await tokenService.saveToken(userDto.id, tokens.refreshToken)

    return { ...tokens, userDto }
  }
}

export default new UserService()