import jwt from 'jsonwebtoken'

class TokensService {
  generateToken(payload) {
    const accessToken = jwt.sign(payload, process.env.ACCESS_SECRET, { expiresIn: '30m' })
    return accessToken
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.ACCESS_SECRET)
      return userData
    } catch (error) {
      return null
    }
  }
}

export default new TokensService()