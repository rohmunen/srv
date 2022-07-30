import {Tag} from '../db/models/tag.model.js'
import {User} from '../db/models/user.model.js'
import {ApiError} from './api-errors.js' 
import { REGEXP } from './constants.js'

export class Validator {
  static async ValidateEmail(email) {
    const user = await User.getByEmail(email)
    if (user) {
      throw ApiError.BadRequest('пользователь с таким email уже существует')
    }
    if(!String(email)
    .toLowerCase()
    .match(
      REGEXP.EMAIL
    )) {
      throw ApiError.BadRequest('некорректный email')
    }
  }
  static ValidatePassword(password) {
    if(!REGEXP.HASLOWER.test(password) || !REGEXP.HASUPPER.test(password) || !REGEXP.HASNUMBER.test(password) || password.length <= 8) {
      throw ApiError.BadRequest('некорректный пароль')
    }
  }
  static async ValidateUserName(name) {
    const user = await User.getByName(name)
    if (user) {
      throw ApiError.BadRequest('пользователь с таким ником уже существует')
    }
  }
  static async ValidateTagName(tag) {
    const dbTag = await Tag.getByName(tag)
    if (dbTag) {
      throw ApiError.BadRequest('tag уже существует')
    }
  }
}