import jwt from 'jsonwebtoken'
import {Token} from '../db/models/token.model.js'

class TokensService {
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '30m' })
    const refreshToken = jwt.sign(payload, process.env.REFRESH_SECRET, { expiresIn: '30d' })
    return {
      accessToken,
      refreshToken
    }
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.REFRESH_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }

  async saveToken(userId, refreshToken) {
    const tokenData = await Token.findToken(refreshToken)
    if (tokenData) {
      const token = await Token.update(userId, refreshToken)
      return token
    }
    const token = await Token.create(userId, refreshToken)
    return token
  }

  async removeToken(refreshToken) {
    await Token.destroy({ where: { token: refreshToken } })
  }

  async findToken(refreshToken) {
    const token = await Token.findOne({ where: { token: refreshToken } })
    return token
  }
}

export default new TokensService()