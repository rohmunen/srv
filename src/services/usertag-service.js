import tokenService from "./token-service.js"
import { Usertag } from "../db/models/usertag.model.js"

class UsertagService {
  async add(authorizationHeader, tags) {
    const {id} = tokenService.validateAccessToken(authorizationHeader)
    const result = Usertag.add(id, tags)
    return result
  }

  async get(authorizationHeader) {
    const {id} = tokenService.validateAccessToken(authorizationHeader)
    const result = await Usertag.get(id)
    return result
  }

  async delete(tagId, authorizationHeader) {
    const {id} = tokenService.validateAccessToken(authorizationHeader)
    const result = await Usertag.delete(tagId, id)
    return result
  }
}

export default new UsertagService()