import { ApiError } from '../utils/api-errors.js'
import tokenService from "../services/token-service.js";

export const authMiddleware = (req, res, next) => {
  try {
    const authorizationHeader = req.header('Authorization').split(' ')[1]
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError())
    }
    const userData = tokenService.validateAccessToken(authorizationHeader)
    if (!userData) {
      return next(ApiError.UnauthorizedError())
    }
    next()
  } catch (error) {
    return next(ApiError.UnauthorizedError())
  }
}

