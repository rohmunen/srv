import {Tag} from '../db/models/tag.model.js'
import {User} from '../db/models/user.model.js'
import {ApiError} from './api-errors.js' 
import { REGEXP } from './constants.js'

export class Validator {
  static ValidateEmail(email) {
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
  static ValidateUserName(name) {
    const user = User.getByName(name)
    if (user) {
      throw ApiError.BadRequest('пользователь с таким ником уже существует')
    }
  }
  static ValidateTagName(tag) {
    const dbTag = Tag.getByName(tag)
    if (dbTag) {
      throw ApiError.BadRequest('tag уже существует')
    }
  }
}