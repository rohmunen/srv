import {User} from "../db/models/user.model.js"
import { UserDto } from '../dtos/user-dto.js'
import tokenService from "./token-service.js";

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
    const userDto = new userDto(user)
    const token = tokenService.generateToken({...userDto})
    return { token, expire: '1800' }
  }
}

export default new UserService()